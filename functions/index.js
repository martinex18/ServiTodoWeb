const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");

const twilio = require('twilio');
const { accountSid, authToken, fromPhoneNumber } = require('./config/twilioConfig');

setGlobalOptions({maxInstances: 10});

const client = twilio(accountSid, authToken);

exports.sendWhatsApp = onRequest(async (req, res) => {
    try{
        const message = await client.messages.create({
            from: fromPhoneNumber,
            to: "whatsapp:+573122664124",
            body: "Hola Gabriel, mensaje enviado desde ServiTodo",
        });

        res.status(200).json({
            success: true,
            sid: message.sid,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})

