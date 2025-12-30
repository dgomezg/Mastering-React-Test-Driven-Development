import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CustomerForm } from '../src/CustomerForm';


describe('CustomerForm', () => {

    const form = id => document.querySelector(`form[id="${id}"]`);

    const field = name => form('customer').elements[name];
    const labelFor = formElement => document.querySelector(`label[for="${formElement}"]`);

    const expectToBeInputFieldOfTypeText = (formElement, placeHolder ) => {
        expect(formElement).not.toBeNull();
        expect(formElement.tagName).toEqual('INPUT');
        expect(formElement.type).toEqual('text');
        placeHolder && expect(formElement.placeholder).toEqual(placeHolder);
    }

    const itRendersAsATextBox = (fieldName) => {
        it('renders as a text box', () => {
            render(<CustomerForm/>);
            expectToBeInputFieldOfTypeText(field(fieldName) );
        })
    }

    const itIncludesTheExistingValue = (fieldName) => {
        it('includes the existing value', () => {
            render(<CustomerForm { ...{[fieldName]: 'value' }}/>);
            expect(field(fieldName).value).toEqual('value');
        })
    }

    const itRendersALabel = (fieldName, text) => {
        it('renders a label', () => {
            render(<CustomerForm/>);
            expect(labelFor(fieldName)).not.toBeNull();
            expect(labelFor(fieldName).textContent).toEqual(text);
        })
    }

    const itAssignsAnId = (fieldName, value) => {
        it('assigns an id that matches the label id', () => {
            render(<CustomerForm/>);
            expect(field(fieldName).id).toEqual(value);
        })
    }

    const itSavesExistingValueWhenSubmitted = (fieldName, value) => {
        it('saves existing value when submitted',  () => {
            expect.hasAssertions();

            render(
                <CustomerForm
                    {...{[fieldName]: value}}
                    onSubmit={ props => expect(props[fieldName]).toEqual(value)}
                />
            )

            fireEvent.submit(form('customer'));
        })
    };

    const itSavesNewValueWhenSubmitted = (fieldName, newValue) => {
        it('saves new value when submitted', () => {
            expect.hasAssertions();

            render(
                <CustomerForm
                    {...{[fieldName]: 'oldValue'}}
                    onSubmit={ props => expect(props[fieldName]).toEqual(newValue)}
                />
            );

            fireEvent.change(field(fieldName), { target: { value: newValue } });
            fireEvent.submit(form('customer'));
        })
    }


    it('renders a form element', () => {
        render(<CustomerForm/>);
        expect(form('customer')).not.toBeNull();
    })

    describe ('first name field', () => {
        itRendersAsATextBox('firstName')
        itIncludesTheExistingValue('firstName');
        itRendersALabel('firstName', 'First name');
        itAssignsAnId('firstName', 'firstName')
        itSavesExistingValueWhenSubmitted('firstName', 'Ashley');
        itSavesNewValueWhenSubmitted('firstName', 'Jamie');
    })

    describe('last name field', () => {
        itRendersAsATextBox('lastName');
        itIncludesTheExistingValue('lastName');
        itRendersALabel('lastName', 'Last name');
        itAssignsAnId('lastName', 'lastName')
        itSavesExistingValueWhenSubmitted('lastName', 'Smith');
        itSavesNewValueWhenSubmitted('lastName', 'Johnson');
    })

    describe('phone number field', () => {
        itRendersAsATextBox('phoneNumber');
        itIncludesTheExistingValue('phoneNumber');
        itRendersALabel('phoneNumber', 'Phone Number');
        itAssignsAnId('phoneNumber', 'phoneNumber')
        itSavesExistingValueWhenSubmitted('phoneNumber', '555-555-5555');
        itSavesNewValueWhenSubmitted('phoneNumber', '666-666-6666');
    })

    it('has a submit button', () => {
        render(<CustomerForm/>);
        const submitButton = document.querySelector('input[type="submit"]');
        expect(submitButton).not.toBeNull();

    })

});