/* 
    1. One component should have only one snapshot. - done
    2. Testing props.
    3. Testing data types.
    4. Event testing.
    5. Testing conditions.
    6. State's Testing.
*/
import React, { Component } from 'react';
import { shallow } from 'enzyme';
import Signup from './signup';

describe('Signup Component', () => {
    let component =''
    beforeEach(() => {
        component = shallow(<Signup />);
    })

    it('should render signup component', () => {
        expect(component.exists()).toBe(true)
    });

    it('should render initial layout', () => {
        expect(component.getElements()).toMatchSnapshot();
    })

    it('should have firstname state', () => {
        expect(component.state('firstname')).toBeDefined()
    })

    it('should have lastname state', () => {
        expect(component.state('lastname')).toBeDefined()
    })

    it('should have email state', () => {
        expect(component.state('email')).toBeDefined()
    })

    it('should have password state', () => {
        expect(component.state('password')).toBeDefined()
    })

    it('should have update firstname onchange event', () => {
        const mockEvent = {
            target: {
              name: "firstname",
              value: "Vaibhav"
            }
        };
        component.find('input[name="firstname"]').simulate('change', mockEvent);
        expect(component.state('firstname')).toEqual("Vaibhav");
    })

    it('should have update lastname onchange event', () => {
        const mockEvent = {
            target: {
              name: "lastname",
              value: "Sharma"
            }
        };
        component.find('input[name="lastname"]').simulate('change', mockEvent);
        expect(component.state('lastname')).toEqual("Sharma");
    })

    it('should have update email onchange event', () => {
        const mockEvent = {
            target: {
              name: "email",
              value: "abc@xyz.com"
            }
        };
        component.find('input[type="email"]').simulate('change', mockEvent);
        expect(component.state('email')).toEqual("abc@xyz.com");
    })

    it('should have update password onchange event', () => {
        const mockEvent = {
            target: {
              name: "password",
              value: "123456"
            }
        };

        component.find('input[type="password"]').simulate('change', mockEvent);
        expect(component.state('password')).toEqual("123456");
    })
})
