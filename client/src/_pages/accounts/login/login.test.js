import React, { Component } from 'react';
import { shallow } from 'enzyme';
import Login from './login';

describe('Test cases for Login Component', () => {
    it('should render login component', () => {
        const wrapper = shallow(<Login />)
    })
})
