/* eslint-disable */
import React, { PureComponent, Children, cloneElement } from 'react';
import { throttle }  from 'lodash';
import styles from './carousel.sass';

class Carousel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      childIndex: 0,
      width: 0,
      rightOffset: 0,
      rounds: 0,
      disabled: props.disabled,
      animate: !props.infinite,
      // if infinte then dont animate on initial position which is middle
    };
  }
  componentDidMount() {
    const { inView, seperation, disabled, children, skipBy } = this.props;
    const newSkipBy = skipBy ? skipBy : inView;
    const inviewTotal = inView > children.length ? children.length : inView;
    const disable = (inviewTotal === children.length) || disabled;
    const width = ( ( this.container.offsetWidth - (seperation * (inviewTotal -1) ) ) / ( inviewTotal || 1 ) );
    const startRightOffset = (inView * ( width + seperation ) );
    this.setState({ width, disabled: disable, rightOffset: startRightOffset, skipBy: newSkipBy });
  }
  mapNewChildren = () => {
    const { children, seperation, infinite, inView } = this.props;
    const { width, childIndex, rounds } = this.state;
    const mappedChildren = Children.map(children, (element) =>
      cloneElement(element, {
       ...element.props,
       style: { ...element.props.style, width: `${width}px`, minWidth: `${width}px`, marginRight: `${seperation}px` }
     })
    )
    if (infinite) {
      const newChildren = Children.toArray(mappedChildren);
      // TODO do extra check if inView > length
      const beginningArray = newChildren.slice(newChildren.length - inView, newChildren.length).map((element, index) =>
        cloneElement(element, {
          ...element.props,
          key: `${index}_beginning`
        })
      )
      const endArray = newChildren.slice(0, inView).map((element, index) =>
        cloneElement(element, {
         ...element.props,
         key: `${index}_end`
       })
      )
      return [...beginningArray, ...newChildren, ...endArray];
    }
    return newChildren;
  }
  handleLeft = throttle(() => {
    const { children, seperation, infinite, inView, animationTime } = this.props;
    const { childIndex, rightOffset, width, disabled, rounds, skipBy } = this.state;
    const newOffset = ( rightOffset - ( skipBy * ( width + ( seperation || 0 ) ) ) );
    const newChildIndex = childIndex - skipBy;
    if (this.animateTimer || disabled) { return; }
    if (newChildIndex <= 0) {
      if (infinite === true) {
        this.setState({ rightOffset: newOffset, childIndex: newChildIndex, animate: true }, () => {
          this.animateTimer = setTimeout(() => {
            const fastChangeOffset = ( children.length ) * ( width + seperation );
            this.setState({ rightOffset: fastChangeOffset, childIndex: children.length - 1, animate: false });
            this.animateTimer = null;
          }, animationTime)
           });
        } else {
          this.setState({ rightOffset: newOffset, childIndex: newChildIndex, animate: true });
        }
    } else {
      this.setState({ rightOffset: newOffset, childIndex: newChildIndex, animate: true });
    }
  }, this.props.animationTime)
  handleRight = throttle(() => {
    const { children, seperation, infinite, inView, animationTime } = this.props;
    const { childIndex, rightOffset, width, disabled, rounds, skipBy } = this.state;
    const newOffset = ( rightOffset + ( skipBy * ( width + ( seperation || 0 ) ) ) );
    const newChildIndex = childIndex + skipBy;
    // if waiting for setTimeout to finish animating dont continue click
    // should rarely get here if throttle is precise
    if (this.animateTimer || disabled) { return; }
    if (newChildIndex >= children.length -1) {
      if (infinite === true) {
        this.setState({ rightOffset: newOffset, childIndex: newChildIndex, animate: true }, () => {
          this.animateTimer = setTimeout(() => {
            const fastChangeOffset = inView * ( width + seperation );
            this.setState({ rightOffset: fastChangeOffset, childIndex: 0, animate: false });
            this.animateTimer = null;
          }, animationTime)
           });
        } else {
          this.setState({ rightOffset: 0, childIndex: 0, animate: true });
        }
    } else {
      this.setState({ rightOffset: newOffset, childIndex: newChildIndex, rounds: rounds + 1, animate: true });
    }
  }, this.props.animationTime)

  render() {
    const { rightOffset, animate } = this.state;
    const { animationTime } = this.props;
    return (
      <div className={styles.carousel}>
        <div
          onClick={this.handleLeft}
          className={`${styles['left-arrow']} ${styles.left}`}
        />
        <div
          onClick={this.handleRight}
          className={`${styles['right-arrow']} ${styles.right}`}
        />
        <div className={styles.root}>
          <div
            ref={container => { this.container = container; }}
            style={{ right: rightOffset, transition: animate ? `${animationTime/1000}s` : '0s' }}
            className={`${styles['children-container']}`}
          >
            { this.mapNewChildren() }
          </div>
        </div>
      </div>
    );
  }
}
Carousel.defaultProps = {
  animationTime: 1000,
  disabled: false,
  infinite: false,
  inView: 2,
  seperation: 30,
  skipBy: undefined,
};

export default Carousel;
