import sendgrid from '@sendgrid/mail'
import { welcomeMail } from '../mail/welcomeMail'
import nodemailer from 'nodemailer'
sendgrid.setApiKey(process.env.SENDGRID_API_KEY) // setting the API key

interface sendingData { // can be extended later
    to?: string
    subject?: string
}

export class MailService {
    constructor() { }

    public sendMail = async (mailTemplate: string, data: sendingData) => {
        try {
            const transporter = nodemailer.createTransport(
                {
                    host: 'smtp.sendgrid.net', // server host for SMTP relay of SendGrid
                    port: 587, // recommended port
                    auth: {
                        user: 'apikey',
                        pass: process.env.SENDGRID_API_KEY
                    }
                }
            )
            const info = await transporter.sendMail(
                {
                    from: process.env.SENDGRID_TO,
                    to: data.to,
                    subject: data.subject,
                    html: mailTemplate
                }
            )
            // await sendgrid.send(
            //     {
            //         to: data.to,
            //         from: process.env.SENDGRID_TO,
            //         subject: data.subject,
            //         html: mailTemplate
            //     }
            // )
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