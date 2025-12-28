import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import {Appointment, AppointmentsDayView} from '../src/AppointmentsDayView';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';


const flushMicrotasks = () => Promise.resolve();

describe('Appointment', () => {

    let customer;

    it('renders the customer first name', async () => {
        customer = { firstname: 'Ashley' }
        render(<Appointment customer={customer}/>);
        expect(document.body.textContent).toMatch('Ashley');

    });

    it('renders another customer first name', async () => {
        customer = { firstname: 'Jordan' }
         render(<Appointment customer={customer}/>)
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


    it('renders a div with the right id', async () => {
        const {container} = render(<AppointmentsDayView appointments={[]}/>);
        expect(container.querySelector('div#appointmentsDayView')).not.toBeNull();
    })

    it('initially shows a message saying threre are no appointments today', async() => {
        const {container} = render(<AppointmentsDayView appointments={[]}/>);
        expect(container.textContent).toMatch('There are no appointments scheduled for today');
    })

    it('renders multiple appointments in an ol element', async () => {
        const {container} = render(<AppointmentsDayView appointments={appointments}/>);
        expect(
            container.querySelector('ol').children
        ).toHaveLength(2);
    })

    it('renders each appointment in a li element', async () => {
        const {container} = render(<AppointmentsDayView appointments={appointments}/>);
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
        const {container} = render(<AppointmentsDayView appointments={appointments}/>);
        expect(
            container.textContent
        ).toMatch('Ashley');
    })

    it('has a button element in each li', async () => {
        const {container} = render(<AppointmentsDayView appointments={appointments}/>);
        expect(
            container.querySelectorAll('li > button')
        ).toHaveLength(2);
        expect(
            container.querySelectorAll('li > button')[0].type
        ).toEqual('button');
    })

    it('renders another appointment when selected', async () => {
        const {container} = render(<AppointmentsDayView appointments={appointments}/>);
        const user = userEvent.setup();

        const button = container.querySelectorAll('li > button')[1];
        await user.click(button);

        expect(
            container.textContent
        ).toMatch('Jordan');
    })
});