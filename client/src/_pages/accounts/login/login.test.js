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
})
