import sendgrid from '@sendgrid/mail'
import { welcomeMail } from '../mail/welcomeMail'
sendgrid.setApiKey(process.env.SENDGRID_API_KEY) // setting the API key

interface sendingData { // can be extended later
    to?: string
    subject?: string
}

export class MailService {
    constructor() { }

    public sendMail = async (mailTemplate: string, data: sendingData) => {
        try {
            await sendgrid.send(
                {
                    to: data.to,
                    from: process.env.SENDGRID_TO,
                    subject: data.subject,
                    html: mailTemplate
                }
            )
        } catch (err) {
            throw err
        }
    }

    public sendWelcomeMail = async (to: string, firstName: string, lastName: string, verificationUrl: string) => {
        const content = welcomeMail(verificationUrl, firstName, lastName) // get the mail template
        const subject = 'Hoşgeldin!'
        await this.sendMail(content, { to, subject })
    }

}