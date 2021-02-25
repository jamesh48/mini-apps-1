// import 'jsdom-global/register';
import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { configure, mount, shallow } from 'enzyme';
import App from '../../src/App.jsx';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('App', () => {
  it(`should create object`, () => {
    const wrapper = shallow(<App/>);
    expect(App.prototype).to.not.be.null;
  });
});