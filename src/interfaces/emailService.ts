export interface PasswordResetRequestPayload {
  data: {
    to: string;
    fName: string;
    lName: string;
    actionLink: string;
    btnText: string;
    body: string;
  };
  templateName: string;
}


export interface EmailPayload {
    to: string;
    subject: string,
    body: string
}