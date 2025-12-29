import React from 'react';

export const CustomerForm = ({firstName}) => (
    <form id='customer'>
        <label htmlFor='firstName'>First name</label>
        <input id='firstName' type='text' name='firstName' placeholder='First name' value={firstName} readOnly/>
    </form>
)