import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import Appointment from '../src/Appointment';

const flushMicrotasks = () => Promise.resolve();

describe('Appointment', () => {
    it('renders the customer first name', async () => {
        const customer = { firstname: 'Ashley' }
        const container = document.createElement('div');
        const root = createRoot(container);

        await act(async () => {
            root.render(<Appointment customer={customer}/>);
            await flushMicrotasks();
        });

        expect(container.textContent).toMatch('Ashley');

    });

    it('renders another customer first name', async () => {
        const customer = { firstname: 'Jordan' }
        const container = document.createElement('div');
        document.body.appendChild(container);

        const root = createRoot(container);

        await act(async () => {
            root.render(<Appointment customer={customer}/>);
            await flushMicrotasks();
        });

        expect(document.body.textContent).toMatch('Jordan');

    });
});