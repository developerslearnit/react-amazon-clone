import React from 'react'
import Header from '../components/Header'
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/basketSlice';
import CheckoutProduct from '../components/CheckoutProduct';

function Checkout() {
    const items = useSelector(selectItems);
    console.log(`items`, items)
    return (
        <div className='bg-gray-100'>
            <Header />
            <main className='lg:flex max-w-screen-2xl mx-auto'>
                {/* main content */}
                <div className='flex-grow m-5 shadow-sm'>
                    <Image
                        src='https://links.papareact.com/ikj'
                        height={250}
                        width={1024}
                        objectFit='contain'
                    />
                    <div className='flex flex-col p-5 space-y-10 bg-white'>
                        <h1 className='text-3xl border-b pb-4'>
                            {items.lenght === 0 ? 'Your Shopping Basket' : 'Shopping Basket'}
                        </h1>

                        {items && items.map((item, i) => (
                            <CheckoutProduct
                                key={i}
                                id={item.id}
                                title={item.title}
                                description={item.description}
                                image={item.image}
                                price={item.price}
                                hasPrime={item.hasPrime}
                                rating={item.rating}
                            />
                        ))}
                    </div>


                </div>

                {/* right sidebar */}
                <div>

                </div>
            </main>
        </div>
    )
}

export default Checkout

