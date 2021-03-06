import { buffer } from 'micro';
import * as admin from 'firebase-admin';

let serviceAccount = require('../../../permissions.json');
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
}) : admin.app();

//Establish connection to stripe

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fullfillOrder = async (session) => {
    return app.firestore().collection('users')
        .doc(session.metadata.email).collection('orders')
        .doc(session.id).set({
            amount: session.amount_total / 100,
            amount_shipping: session.total_details.amount_shipping / 100,
            images: JSON.parse(session.metadata.images),
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
            console.log('Order placed successfully id ' + session.id);

        });
}


export default async (req, res) => {

    if (req.method === 'POST') {

        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers['stripe-signature'];

        let event;

        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        } catch (error) {
            console.log('error', error);
            return res.status(400).send(`Webhook Error: ${error.message}`);
        }

        //Handle checkout session

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;

            //Fufill the other
            return fullfillOrder(session).then(() => {
                return res.status(200).send('success');
            }).catch((err) => {
                console.log('error', err);
                return res.status(400).send(`Webhook Error: ${err.message}`);
            });
        }


    }

};

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};