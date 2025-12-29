import React from 'react';
import {Appointment, AppointmentsDayView} from '../src/AppointmentsDayView';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';

describe('Appointment', () => {

    let customer;

    it ('renders a table', () => {
        const { container } = render(<Appointment customer={customer}/>);
        expect(container.querySelector('#appointmentView > table')).not.toBeNull();
    });

    it('renders the customer first name', () => {
        customer = { firstName: 'Ashley' }
        render(<Appointment customer={customer}/>);
        expect(document.body.textContent).toMatch('Ashley');

    });

    it('renders another customer first name',() => {
        customer = { firstName: 'Jordan' }
        render(<Appointment customer={customer}/>)
        expect(document.body.textContent).toMatch('Jordan');
    });

    it('renders the customer last name', () => {
        customer = { lastName: 'Smith' }
        render(<Appointment customer={customer}/>);
        expect(document.body.textContent).toMatch('Smith');
    } )

    it('renders the customer phone number', () => {
        customer = {phoneNumber: '555-555-5555'};
        render(<Appointment customer={customer}/>);
        expect(document.body.textContent).toMatch('555-555-5555');
    })

    it('renders the stylist', () => {
        const stylist = 'John';
        render(<Appointment stylist={stylist}/>);
        expect(document.body.textContent).toMatch(stylist);
    })

    it('renders the service', () => {
        const service = 'Cut';
        render(<Appointment service={service}/>);
        expect(document.body.textContent).toMatch(service);
    })

    it('renders the notes field', () => {
        const notes = 'Please call customer to confirm';
        render(<Appointment notes={notes}/>);
        expect(document.body.textContent).toMatch(notes);
    })

    it('renders the appointment time', () => {
        const startsAt = new Date();
        startsAt.setHours(12, 0);
        render(<Appointment startsAt={startsAt}/>);
        expect(document.body.textContent).toMatch('12:00');
    })
});

describe('AppointmentsDayView', () => {

    const today = new Date();
    const appointments = [
        {
            startsAt: today.setHours(12,0),
            customer: {
                firstName: 'Ashley'
            }
        },
        {
            startsAt: today.setHours(13,0),
            customer: { firstName: 'Jordan' }
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