import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

console.log("Resend API", process.env.RESEND_API_KEY)

if(!process.env.RESEND_API_KEY){
    console.log("Provide RESEND_API in side the .env file")
}

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async({sendTo, subject, html })=>{
    try {
        const { data, error } = await resend.emails.send({
           from: 'QuickCart <onboarding@resend.dev>',
           to: sendTo,
           subject: subject,
           html: html,
        });

        if (error) {
            return console.error({ error });
        }

        return data
    } catch (error) {
        console.log(error)
    }
}

export default sendEmail;