import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import {Appointment, AppointmentsDayView} from '../src/Appointment';

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

describe('AppointmentsDayView', () => {

    let root;
    let container;
    const today = new Date();
    const appointments = [
        {
            startsAt: today.setHours(12,0),
            customer: { firstname: 'Ashley' }
        },
        {
            startsAt: today.setHours(13,0),
            customer: { firstname: 'Jordan' }
        }
    ];

    const render = async component => {
        await act(async () => {
            root.render(component);
            await flushMicrotasks();
        });
    };

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        root = createRoot(container);
    });

    it('renders a div with the right id', async () => {
        await render(<AppointmentsDayView appointments={[]}/>);
        expect(container.querySelector('div#appointmentsDayView')).not.toBeNull();
    })

    it('initially shows a message saying threre are no appointments today', async() => {
        await render(<AppointmentsDayView appointments={[]}/>);
        expect(container.textContent).toMatch('There are no appointments scheduled for today');
    })

    it('renders multiple appointments in an ol element', async () => {
        await render(<AppointmentsDayView appointments={appointments}/>);
        expect(
            container.querySelector('ol').children
        ).toHaveLength(2);
    })

    it('renders each appointment in a li element', async () => {
        await render(<AppointmentsDayView appointments={appointments}/>);
        expect(
            container.querySelectorAll('li')
        ).toHaveLength(2);
        expect(
            container.querySelectorAll('li')[0].textContent
        ).toEqual('12:00');
        expect(
            container.querySelectorAll('li')[1].textContent
        ).toEqual('13:00');
    })

    it('selects the first appointment by default', async() => {
        await render(<AppointmentsDayView appointments={appointments}/>);
        expect(
            container.textContent
        ).toMatch('Ashley');
    })
});