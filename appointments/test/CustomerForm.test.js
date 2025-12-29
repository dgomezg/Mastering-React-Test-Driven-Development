import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CustomerForm } from '../src/CustomerForm';


describe('CustomerForm', () => {

    const form = id => document.querySelector(`form[id="${id}"]`);

    const expectToBeInputFieldOfTypeText = (formElement, placeHolder ) => {
        expect(formElement).not.toBeNull();
        expect(formElement.tagName).toEqual('INPUT');
        expect(formElement.type).toEqual('text');
        placeHolder && expect(formElement.placeholder).toEqual(placeHolder);
    }

    const field = name => form('customer').elements[name];
    const firstNameField = () => field('firstName');
    const labelFor = formElement => document.querySelector(`label[for="${formElement}"]`);

    it('renders a form element', () => {
        render(<CustomerForm/>);
        expect(form('customer')).not.toBeNull();
    })

    describe ('first name field', () => {

        it('renders as a text box', () => {
            render(<CustomerForm/>);

            expectToBeInputFieldOfTypeText(firstNameField(), 'First name' );
        })

        it('includes the existing value', () => {
            render(<CustomerForm firstName='Ashley'/>);
            expect(firstNameField().value).toEqual('Ashley');
        })

        it('renders a label', () => {
            render(<CustomerForm/>);
            expect(labelFor('firstName')).not.toBeNull();
            expect(labelFor('firstName').textContent).toEqual('First name');
        })

        it('assigns an id that matches the label id', () => {
            render(<CustomerForm/>);
            expect(firstNameField().id).toEqual('firstName');
        })

        it('saves existing value when submitted',  () => {
            expect.hasAssertions();

            render(
                <CustomerForm
                    firstName='Ashley'
                    onSubmit={ ( { firstName } ) => expect(firstName).toEqual('Ashley')}
                />
            )

            fireEvent.submit(form('customer'));
        })

        it('saves new value when submitted', () => {
            expect.hasAssertions();

            render(
                <CustomerForm
                    firstName='Ashley'
                    onSubmit={ ( { firstName } ) => expect(firstName).toEqual('Jamie') }
                />
            );

            fireEvent.change(firstNameField(), { target: { value: 'Jamie' } });
            fireEvent.submit(form('customer'));
        })
    })

});