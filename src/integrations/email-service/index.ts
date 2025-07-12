import EmailNotification from './emailNotification';
import RequestPasswordReset from './requestPasswordReset';
import NodemailerService from './nodemailer';

export default class EmailService {
  public PasswordReset: RequestPasswordReset;
  public EmailNotification: EmailNotification;
  public Nodemailer: NodemailerService;

  public constructor() {
    this.PasswordReset = new RequestPasswordReset();
    this.EmailNotification = new EmailNotification();
    this.Nodemailer = new NodemailerService();
  }
}
