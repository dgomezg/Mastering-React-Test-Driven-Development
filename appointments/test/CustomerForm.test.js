import React from 'react';
import { render } from '@testing-library/react';
import { CustomerForm } from '../src/CustomerForm';

describe('CustomerForm', () => {

    const form = id => document.querySelector(`form[id="${id}"]`);

    const expectToBeInputFieldOfTypeText = (formElement, placeHolder ) => {
        expect(formElement).not.toBeNull();
        expect(formElement.tagName).toEqual('INPUT');
        expect(formElement.type).toEqual('text');
        placeHolder && expect(formElement.placeholder).toEqual(placeHolder);
    }

    const firstNameField = () => form('customer').elements.firstName;

    const labelFor = formElement => document.querySelector(`label[for="${formElement}"]`);

    it('renders a form element', () => {
        render(<CustomerForm/>);
        expect(form('customer')).not.toBeNull();
    })

    it('renders the first name field as a text box', () => {
        render(<CustomerForm/>);

        expectToBeInputFieldOfTypeText(firstNameField(), 'First name' );
    })

    it('includes the existing value for the first name', () => {
        render(<CustomerForm firstName='Ashley'/>);
        expect(firstNameField().value).toEqual('Ashley');
    })

    it('renders a label for the first name field', () => {
        render(<CustomerForm/>);
        expect(labelFor('firstName')).not.toBeNull();
        expect(labelFor('firstName').textContent).toEqual('First name');
    })

    it('assigns an id that matches the label ide to the first name field', () => {
        render(<CustomerForm/>);
        expect(firstNameField().id).toEqual('firstName');
    })
});