import React from 'react';
import {AppointmentForm} from '../src/AppointmentForm';
import { render, fireEvent } from '@testing-library/react';

describe('AppointmentForm', () => {

    const form = id => document.querySelector(`form[id="${id}"]`);
    const field = name => form('appointment').elements[name];

    it('renders a form', () => {
        render(<AppointmentForm/>);
        expect(form('appointment')).not.toBeNull();
    })

    describe('service field', () => {

        const findOption = (dropdownNode, value) => {
            const options = Array.from(dropdownNode.childNodes);
            return options.find(option => option.value === value);
        }

        it('renders as a select box', () => {
            render(<AppointmentForm/>);
            expect(field('service')).not.toBeNull();
            expect(field('service').tagName).toEqual('SELECT');
        })

        it('initially has a blank value choosen', () => {
            render(<AppointmentForm/>);
            const firstOption = field('service').childNodes[0];
            expect(firstOption.value).toEqual('');
            expect(firstOption.selected).toBeTruthy();
        })

        it('lists all salon services', () => {
            const selectableServices = [
                'Cut',
                'Blow-dry'];
            render(<AppointmentForm selectableServices={selectableServices}/>);
            const optionNodes = Array.from(field('service').childNodes);
            const renderedServices = optionNodes.map(node => node.value);
            expect(renderedServices).toEqual(expect.arrayContaining(selectableServices));
        })

        it('preselects the existing value', () => {
            const services = ['Cut', 'Blow-dry'];
            render(<AppointmentForm service='Cut' selectableServices={services}/>);
            const optionNode = findOption(field('service'), 'Cut');
            expect(optionNode.selected).toBeTruthy();
        })

        it('renders a Label', () => {
            render(<AppointmentForm/>);
            expect(document.querySelector('label[for="service"]')).not.toBeNull();
        })

        it('assigns an id to the select box', () => {
            render(<AppointmentForm/>);
            expect(field('service').id).toEqual('service');
        })

        it('saves existing value when submitted', () => {
            expect.hasAssertions();
            render(
                <AppointmentForm
                    selectableServices={['Cut', 'Blow-dry']}
                    service='Cut'
                    onSubmit={ props => expect(props.appointment.service).toEqual('Cut')}
                />
            );
            fireEvent.submit(form('appointment'));
        })

        it('saves new value when submitted', () => {
            expect.hasAssertions();
            render(
                <AppointmentForm
                    selectableServices={['Cut', 'Blow-dry']}
                    service='Cut'
                    onSubmit={ ( {appointment: {service}}) => expect(service).toEqual('Blow-dry')}
                />
            );

            fireEvent.change(field('service'), { target: { value: 'Blow-dry' } });
            fireEvent.submit(form('appointment'));
        })

    })
})