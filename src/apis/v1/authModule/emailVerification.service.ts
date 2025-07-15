import { User } from '@src/interfaces/user';
import { findUserRepo, updateUserRepo } from '../../repositories/auth.repository';
import { BadRequestError } from '@src/common/errors';
import JWT from '@src/utilities/JWT.utility';
import EmailService from '@src/integrations/email-service';

const emailService = new EmailService();

export const sendEmailVerificationSrv = async (userId: string) => {
  const user = await findUserRepo({ id: userId });
  if (!user) {
    throw new BadRequestError('User not found');
  }

  if (user.is_email_verified) {
    throw new BadRequestError('Email is already verified');
  }

  // Generate verification token
  const verificationToken = JWT.encode({ 
    id: user.id, 
    email: user.email
  });

  // Send verification email using password reset template for now
  const emailData = {
    data: {
      to: user.email,
      fName: user.first_name,
      lName: user.last_name,
      actionLink: `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`,
      btnText: 'Verify Email',
      body: 'Please click the button below to verify your email address and activate your account.'
    },
    templateName: 'password-reset' // Using existing template for now
  };

  await emailService.PasswordReset.requestPasswordReset(emailData);

  return { message: 'Verification email sent successfully' };
};

export const verifyEmailSrv = async (token: string) => {
  try {
    const decoded = JWT.decode(token);
    
    if (decoded.type !== 'email_verification') {
      throw new BadRequestError('Invalid verification token');
    }

    const user = await findUserRepo({ id: decoded.id });
    if (!user) {
      throw new BadRequestError('User not found');
    }

    if (user.is_email_verified) {
      throw new BadRequestError('Email is already verified');
    }

    // Update user as verified
    await updateUserRepo({ id: user.id }, { is_email_verified: true });

    return { message: 'Email verified successfully' };
  } catch (error) {
    throw new BadRequestError('Invalid or expired verification token');
  }
};

export const resendVerificationEmailSrv = async (email: string) => {
  const user = await findUserRepo({ email });
  if (!user) {
    throw new BadRequestError('User not found');
  }

  if (user.is_email_verified) {
    throw new BadRequestError('Email is already verified');
  }

  return await sendEmailVerificationSrv(user.id);
}; 