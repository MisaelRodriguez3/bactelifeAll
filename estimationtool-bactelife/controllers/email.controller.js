import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { CLIENTD_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } from '../config.js'
import  path  from 'path'
import { fileURLToPath } from 'url';




export const sendEmail = async (req, res) => {
    const { name, phone, email, preferred_language, message } = req.body;
  
    const __filename = fileURLToPath(import.meta.url);
    const _dirname = path.dirname(__filename);
    const imagePath = path.join(_dirname, '../public', 'logo-Back.png');
    
    const contentHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif; 
                margin: 0;
                padding: 0;
                color: #000; 
            }
            
            .container {
                max-width: 600px; 
                margin: 0 auto;
            }

            .header {
                background-color: #22333b; 
                text-align: center;
                padding: 20px 0;
                position: relative;
            }

            .logo {
                width: 200px;
                height: 60px;
                filter: grayscale(100%); 
            }

            .content {
                padding: 20px;
                text-align: left; 
                background-color: #f2f2f2; 
                font-weight: bold;
                position: relative;
                background-image: url('cid:water'); 
                background-size: cover; 
                background-position: center; 
            }

            .list-item {
                margin-bottom: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container"> <!-- Div contenedor -->
            <div class="header">
                <img src="cid:logo" class="logo"> <!-- Logo blanco y negro -->
            </div>

            <div class="content">
                <h1>Request for Contact</h1>
                <p>Hello admin, a new contact form has been submitted. Here are the data:</p>
                <div class="list-item"><strong>Username:</strong> ${name}</div>
                <div class="list-item"><strong>PhoneNumber:</strong> ${phone}</div>
                <div class="list-item"><strong>User Email:</strong> ${email}</div>
                <div class="list-item"><strong>Preferred Language:</strong> ${preferred_language}</div>
                <p>${message}</p>
                <p>You are expected to contact the client as soon as possible. Thanks for your time.</p>
            </div>
        </div>
    </body>
    </html>
`;




try {
    const oAuth2Client = new google.auth.OAuth2(CLIENTD_ID, CLIENT_SECRET, REDIRECT_URI);
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: "estimationtoool.bactelife@gmail.com",
                    clientId: CLIENTD_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: accessToken.token,
                },

            });
            const mailOptions = {
                from: 'Bactelife webApp <estimationtoool.bactelife@gmail.com>',
                to: "pruebaspepes7@gmail.com",
                subject: "web app form message",
                html: contentHTML,
                attachments: [
                    {
                    filename: 'logo_Back.png',
                    path: imagePath, // Ruta del archivo adjunto
                    cid: 'logo'
                    },
                  
                ],
            };
            const result = await transporter.sendMail(mailOptions);
            res.status(200).send("enviado");
        } catch (error) {
            console.log("Error al enviar el correo:", error);
            res.status(500).send("Error al enviar el correo");
        }
    };