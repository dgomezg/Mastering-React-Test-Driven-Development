import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import Appointment from '../src/Appointment';

const flushMicrotasks = () => Promise.resolve();

describe('Appointment', () => {

    let root;
    let customer;

    beforeEach(() => {
        const container = document.createElement('div');
        document.body.appendChild(container);
        root = createRoot(container);
    });


    let render = async component => {
        await act(async () => {
            root.render(component);
            await flushMicrotasks();
        });
    };

    it('renders the customer first name', async () => {
        customer = { firstname: 'Ashley' }
        await render(<Appointment customer={customer}/>);
        expect(document.body.textContent).toMatch('Ashley');

    });

    it('renders another customer first name', async () => {
        customer = { firstname: 'Jordan' }
        await render(<Appointment customer={customer}/>)
        expect(document.body.textContent).toMatch('Jordan');
    });
});