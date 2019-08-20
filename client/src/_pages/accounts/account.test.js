/* 
    1. One component should have only one snapshot. - done
    2. Testing props.
    3. Testing data types.
    4. Event testing.
    5. Testing conditions.
    6. State's Testing.
*/
import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import Account from './accounts';
import configureStore from 'redux-mock-store';

describe('Account component',() => {
    const mockStore = configureStore();
    let store, component;

    beforeEach(() => {
        store = mockStore();
        component = shallow(<Account store={store} />)
    })

    it('should render account component', () => {
        expect(component.exists()).toBe(true)
    });

    it('should render initial layout', () => {
        expect(component.getElements()).toMatchSnapshot();
    })
})
