import React, { useState } from 'react';

export const CustomerForm = ({firstName, lastName, phoneNumber, onSubmit}) => {
    const [customer, setCustomer] = useState({ firstName, lastName, phoneNumber });

    const handleChange = ( {target}) => {
        setCustomer( customer => ({...customer, [target.name]: target.value}));
    }

    return (
        <form id='customer' onSubmit={() => onSubmit(customer)}>
            <label htmlFor='firstName'>First name</label>
            <input
                id='firstName'
                type='text'
                name='firstName'
                placeholder='First name'
                value={firstName}
                onChange={handleChange}
            />

            <label htmlFor='lastName'>Last name</label>
            <input
                id='lastName'
                type='text'
                name='lastName'
                placeholder='Last name'
                value={lastName}
                onChange={handleChange}
            />

            <label htmlFor='phoneNumber'>Phone Number</label>
            <input
                id='phoneNumber'
                type='text'
                name='phoneNumber'
                value={phoneNumber}
                onChange={handleChange}
            />
        </form>
    )
}