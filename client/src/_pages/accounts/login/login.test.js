import React, { Component } from 'react';
import { shallow } from 'enzyme';
import Login from './login';

describe('Login Component', () => {
    it('should render login component', () => {
        const wrapper = shallow(<Login />)
    });

    it('should render initial layout', () => {
        const component = shallow(<Login />);
        expect(component.getElements()).toMatchSnapshot();
    })

    it('should have email state', () => {
        const component = shallow(<Login />);
        const form = component.find('input[type="email"]');
        expect(component.state('email')).toBeDefined()
    })

    it('should have password state', () => {
        const component = shallow(<Login />);
        const form = component.find('input[type="password"]');
        expect(component.state('password')).toBeDefined()
    })

    it('should have update email onchange event', () => {
        const component = shallow(<Login />);
        const form = component.find('input[type="email"]');

        const mockEvent = {
            target: {
              name: "email",
              value: "abc@xyz.com"
            }
        };

        component.instance().handleChange(mockEvent);
        expect(component.state('email')).toEqual("abc@xyz.com");
    })

    it('should have update password onchange event', () => {
        const component = shallow(<Login />);
        const form = component.find('input[type="password"]');

        const mockEvent = {
            target: {
              name: "password",
              value: "123456"
            }
        };

        component.instance().handleChange(mockEvent);
        expect(component.state('password')).toEqual("123456");
    })

    it('should have valid email id', () => {
        const component = shallow(<Login />);
        const form = component.find('input[type="email"]');

        const mockEvent = {
            target: {
              name: "email",
              value: "abc"
            }
        };

        const expected = {
            email: "abc",
            password: null,
            formErrors: {
                email: 'Invalid email address',
                password: ''
            }
        }

        component.instance().handleChange(mockEvent);
        expect(component.state()).toEqual(expected);
    })
})
