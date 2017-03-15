/* eslint-disable */
import React, { PureComponent, Children, cloneElement } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './carousel.sass';

class Carousel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      childIndex: 0,
      width: 0,
      rightOffset: 0,
      rounds: 0,
      disabled: props.disabled || false,
    };
  }
  componentDidMount() {
    const { inView, seperation, disabled } = this.props;
    const { children } = this.props;
    const inviewTotal = inView > children.length ? children.length : inView;
    const shouldBeDisabled = (inviewTotal === children.length) || disabled;
    const width = ( ( this.container.offsetWidth - ( seperation * (inviewTotal -1) ) ) / ( inviewTotal || 1 ) );
    this.setState({ width, disabled: shouldBeDisabled })
  }
  mapNewChildren = () => {
    const { children, seperation, infinite } = this.props;
    const { width, childIndex, rounds } = this.state;
    const newChildren = Children.map(children, (element) =>
      cloneElement(element, {
       ...element.props,
       style: { ...element.props.style, width: `${width}px`, minWidth: `${width}px`, marginRight: `${seperation}px` }
     })
    )
    if (infinite) {
      const childrenArr = Children.toArray(newChildren);
      let i, index;
      for (i = 0; i < rounds; i++) {
        if (index === children.length -1) {
          return childrenArr;
        }
        index = index >= children.length -1 ? 0 : index + 1 || 0;
        childrenArr.push(cloneElement(childrenArr[index], {
          ...childrenArr[index].props,
          key: i,
        }));
      }
      return childrenArr;
    }
    return newChildren;
  }
  handleLeft = () => {
    const { children, seperation, infinite } = this.props;
    const { childIndex, rightOffset, width, disabled } = this.state;
    if (disabled) {
      return;
    }
    if (childIndex <= 0) {
      const newOffset =  ( (width + (seperation || 0)) * ( children.length - 1 ));
      this.setState({ rightOffset: newOffset, childIndex: children.length - 1 })
    } else {
      const newOffset = (rightOffset - width) - (seperation || 0);
      this.setState({ rightOffset: newOffset, childIndex: childIndex - 1 })
    }
  }
  handleRight = () => {
    const { children, seperation, infinite } = this.props;
    const { childIndex, rightOffset, width, disabled, rounds } = this.state;
    if (disabled) {
      return;
    }
    if (childIndex >= children.length-1) {
        this.setState({ rightOffset: 0, childIndex: 0 })
    } else {
      const newOffset = rightOffset + width + (seperation || 0);
      this.setState({ rightOffset: newOffset, childIndex: childIndex + 1, rounds: rounds + 1 })
    }
  }
  render() {
    const { rightOffset } = this.state;
    return (
      <div className={styles.carousel}>
        <div
          onClick={this.handleLeft}
          className={`${styles['left-arrow']} ${styles.left}`}/>
        <div
          onClick={this.handleRight}
          className={`${styles['right-arrow']} ${styles.right}`}/>
        <div className={styles.root}>
          <div
            ref={container => { this.container = container; }}
            style={{right: rightOffset, transition: '1s' }}
            className={`${styles['children-container']}`}>
            { this.mapNewChildren() }
          </div>
        </div>
      </div>
    );
  }
}
export default Carousel;
