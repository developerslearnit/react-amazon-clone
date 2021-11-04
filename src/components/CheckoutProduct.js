import React from 'react'
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';

function CheckoutProduct({ id, title, price, description, category, image, hasPrime, rating }) {
    return (
        <div className='grid grid-cols-5'>
            <Image
                src={image}
                width={200}
                height={200}
                objectFit='contain'

            />
            <div className='col-span-3 mx-5'>
                <p>{title}</p>
                <div>
                    <div className='flex'>
                        {Array(rating).fill().map((_, i) => (
                            <StarIcon className='h-5 text-yellow-500' />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutProduct
