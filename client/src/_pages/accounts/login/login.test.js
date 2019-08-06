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
        /* form.props().onChange({
            target: {
                name: 'myName',
                value: 'myValue'
            }
        }) */
        expect(component.state('email')).toBeDefined()
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
})
