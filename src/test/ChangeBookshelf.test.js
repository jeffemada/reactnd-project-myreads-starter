import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ChangeBookshelf from '../ChangeBookshelf';

Enzyme.configure({ adapter: new Adapter() });

it('should render a select', () => {
  const wrapper = shallow(<ChangeBookshelf currentShelf="none" onUpdateBookshelf={jest.fn()} />);
  expect(wrapper).toMatchSnapshot();
});

it('should have 5 options', () => {
  const wrapper = shallow(<ChangeBookshelf currentShelf="none" onUpdateBookshelf={jest.fn()} />);
  expect(wrapper.find('option').length).toEqual(5);
});

it('should have "none" option selected', () => {
  const wrapper = shallow(<ChangeBookshelf currentShelf="none" onUpdateBookshelf={jest.fn()} />);
  expect(wrapper.find('select').prop('value')).toEqual('none');
});

it('should select option "wantToRead"', () => {
  const wrapper = shallow(<ChangeBookshelf currentShelf="none" onUpdateBookshelf={jest.fn()} />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('select').simulate('change', {
    target: { value: 'wantToRead' }
  });
  expect(wrapper).toMatchSnapshot();
});

it('should pass a selected value to the onUpdateBookshelf handler', () => {
  const value = 'wantToRead';
  const onUpdateBookshelf = jest.fn();
  const wrapper = shallow(<ChangeBookshelf currentShelf="none" onUpdateBookshelf={onUpdateBookshelf} />);
  wrapper.find('select').simulate('change', {
    target: { value }
  });
  expect(onUpdateBookshelf).toBeCalledWith(value);
});
