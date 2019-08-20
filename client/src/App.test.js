import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

configure({ adapter: new Adapter() });

describe('App component', () => {
  const mockStore = configureStore();
  let store, component;

  beforeEach(() => {
    store = mockStore();
    component = shallow(<App store={store} />)
  })

  it('render', () => {
    expect(component.exists()).toBe(true)
  })
})

/* it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
}); */
