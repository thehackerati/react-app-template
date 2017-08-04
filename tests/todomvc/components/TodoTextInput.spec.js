'use strict';

import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import sinon from 'sinon'

import TodoTextInput from '../../../src/todomvc/components/TodoTextInput'

function setup() {
  const props = {
    text: 'my todo',
    placeholder: 'do it',
    onSave: sinon.spy(),
  };
  const component = shallow(
    <TodoTextInput {...props} />
  );

  return {
    props: props,
    component: component
  }
}

describe('TodoTextInput component', () => {
  describe('Should render correctly', () => {
    it('Should be a TodoTextInput component', () => {
      const {props, component} = setup();

      expect(component.find('input')).to.have.length(1);
      expect(component.find('input').at(0).prop('placeholder')).to.equal(props.placeholder);
      expect(component.find('input').at(0).prop('value')).to.equal(props.text)
    })
  });

  describe('Should behave correctly', () => {
    it('Should update value on change', () => {
      const {props, component} = setup();

      component.find('input').at(0).simulate('change', {target: {value: 'todo'}});
      expect(component.find('input').at(0).prop('value')).to.equal('todo')
    });

    it('Should call onSave() on return key press', () => {
      const {props, component} = setup();

      component.find('input').at(0).simulate('keydown', {
        which: 13, // RETURN KEY
        target: {value: 'new todo'}
      });
      expect(props.onSave.called).to.be.true;
      expect(props.onSave.args[0][0]).to.equal('new todo')
    })
  })
});