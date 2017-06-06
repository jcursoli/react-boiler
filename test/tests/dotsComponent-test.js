import test from 'ava';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, render } from 'enzyme';
import Dots from '../../src/components/carousel/dots/dots';
import { getDotsProps } from '../helper/_helpers';

test('<Dots /> should have expected classNames', t => {
  const wrapper = shallow(<Dots {...getDotsProps()} />);
  t.true(wrapper.hasClass('dots'));
  t.is(wrapper.find('.testClass').length, 5);
  t.is(wrapper.find('.dots').length, 1);
});
test('<Dots /> should have expected children', t => {
  const wrapper = render(<Dots {...getDotsProps()} />);
  t.is(wrapper.find('.dots').children().length, 5);
});
test('<Dots /> should have expected children with odd', t => {
  const wrapper = render(<Dots {...getDotsProps({ inView: 3, childrenLength: 11 })} />);
  t.is(wrapper.find('.dots').children().length, 4);
});
test('<Dots /> should have correct index for active dot (page)', t => {
  const wrapper = shallow(<Dots {...getDotsProps({ inView: 3, childrenLength: 9, currentIndex: 6 })} />);
  const lastIndex = wrapper.find('.dot').length - 1;
  wrapper.find('.dot').forEach((node, index) => {
    index === lastIndex ? t.true(node.hasClass('active')) : // eslint-disable-line
                          t.false(node.hasClass('active'));
  });
});
test('<Dots /> should have correct index for active dot (item)', t => {
  const currentIndex = 6;
  const wrapper = shallow(<Dots {...getDotsProps({ inView: 3, childrenLength: 9, dotsType: 'item', currentIndex })} />);
  wrapper.find('.dot').forEach((node, index) => {
    index === currentIndex ? t.true(node.hasClass('active')) : // eslint-disable-line
                             t.false(node.hasClass('active'));
  });
});
test('<Dots /> should have correct active index for uneven child/skipby ratio (page)', t => {
  // skipby is defaulted to inView#
  const activeIndex = 3;
  const wrapper = shallow(<Dots {...getDotsProps({ inView: 3, childrenLength: 11, currentIndex: 9 })} />);
  wrapper.find('.dot').forEach((node, index) => {
    index === activeIndex ? t.true(node.hasClass('active')) : // eslint-disable-line
                            t.false(node.hasClass('active'));
  });
});
