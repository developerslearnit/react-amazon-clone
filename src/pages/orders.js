import { getSession, useSession } from 'next-auth/client'
import React from 'react'
import Header from '../components/Header'
import moment from 'moment';
import db from '../../firebase';
import Order from '../components/Order';

const Orders = ({ orders }) => {
    const [session] = useSession();
    // console.log(`orders`, orders)
    return (
        <div>
            <Header />
            <main className='max-w-screen-lg mx-auto p-10'>
                <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>Orders</h1>

                {
                    session ? <div>
                        <h2>{orders?.length} Orders</h2>
                    </div> : <div>
                        <h2>Please sign in to view your orders</h2>
                    </div>
                }

                <div className='mt-5 space-y-4'>

                    {
                        orders?.map(({
                            id, amount, amountShipping, items, timestamp, images }
                        ) => (
                            <Order
                                key={id}
                                id={id} amount={amount}
                                amountShipping={amountShipping}
                                items={items} timestamp={timestamp}
                                images={images} />
                        ))
                    }
                </div>
            </main>
        </div>
    )
}

export default Orders

export async function getServerSideProps(context) {
    const stripe = require('stripe')('sk_test_RlbgmTYYETA85U4o4a2qRILa');
    const session = await getSession(context);
    if (!session) {
        return {
            props: {
            }
        }
    }

    //Firestore orders
    const firbaseOrders = await db.firestore().collection('users').doc(session.user.email)
        .collection('orders').orderBy('timestamp', 'desc').get();

    //console.log(`stripe.checkout.session`, stripe.orders.listLineItems)
    //Stripe orders

    const stripeOrders = await Promise.all(
        firbaseOrders.docs.map(async (order) => ({

            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            items: (
                await stripe.checkout.sessions.listLineItems(order.id, {
                    limit: 100
                })
            ).data
        }))
    );

    return {
        props: {
            orders: stripeOrders,
            session
        }
    }
}

