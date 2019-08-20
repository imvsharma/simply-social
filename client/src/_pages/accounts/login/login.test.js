/* 
    1. One component should have only one snapshot. - done
    2. Testing props.
    3. Testing data types.
    4. Event testing.
    5. Testing conditions.
    6. State's Testing.
*/
import React from 'react';
import { shallow, mount } from 'enzyme';
import Login from './login';
import configureStore from 'redux-mock-store';

describe('Login Component', () => {
    const mockStore = configureStore();
    let store, component;

    beforeEach(() => {
        store = mockStore();
        component = shallow(<Login store={store} />)
    })

    it('should render login component', () => {
        expect(component.exists()).toBe(true)
    });

    it('should render initial layout', () => {
        //const component = shallow(<Login store={store} />);
        expect(component.getElements()).toMatchSnapshot();
    })

    it('should have email state', () => {
        component = mount(component.get(0))
        expect(component.state('email')).toBeDefined()
    })

    it('should have password state', () => {
        component = mount(component.get(0))
        expect(component.state('password')).toBeDefined()
    })

    it('should have update email onchange event', () => {
        component = mount(component.get(0))
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
        component = mount(component.get(0))
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

    it('should have error when email is invalid', () => {
        component = mount(component.get(0))
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

    it('should have error when password less than 6 characters', () => {
        component = mount(component.get(0))
        const form = component.find('input[type="email"]');

        const mockEvent = {
            target: {
              name: "password",
              value: "abc"
            }
        };

        const expected = {
            email: null,
            password: "abc",
            formErrors: {
                email: '',
                password: 'Minimum 6 characters required'
            }
        }

        component.instance().handleChange(mockEvent);
        expect(component.state()).toEqual(expected);
    })

    it('should cancelled the event when form is submitted', () => {
        component = mount(component.get(0))
        let prevented = false;
        component.find('form').simulate('submit', {
            preventDefault:() => {
                prevented = true
            }
        })

        expect(prevented).toBe(true);
    })
})
