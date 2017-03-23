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
      disabled: props.disabled,
      animate: !props.infinite,
      childOffsetCount: 0,
    };
  }
  componentDidMount() {
    const { inView, seperation, disabled, children, skipBy, infinite } = this.props;
    const newSkipBy = skipBy ? skipBy : inView;
    const inviewTotal = inView > children.length ? children.length : inView;
    const disable = (inviewTotal === children.length) || disabled;
    const width = ( ( this.container.offsetWidth - (seperation * (inviewTotal -1) ) ) / ( inviewTotal || 1 ) );
    // childOffsetCount used for determining how many clones should be created
    // add children.length % inviewTotal for when children.length is not divisible by how many are being skipped (newSkipBy)
    const childOffsetCount = infinite ? (children.length % inviewTotal === 0 ? inviewTotal : inviewTotal + ( children.length % newSkipBy ) ) : 0;
    const startRightOffset = (childOffsetCount * ( width + seperation ) );
    this.setState({ width, disabled: disable, rightOffset: startRightOffset, skipBy: newSkipBy, childOffsetCount });
  }
  mapNewChildren = () => {
    const { children, seperation, infinite, inView } = this.props;
    const { width, childIndex, childOffsetCount } = this.state;
    const mappedChildren = Children.map(children, (element) =>
      cloneElement(element, {
       ...element.props,
       style: { ...element.props.style, width: `${width}px`, minWidth: `${width}px`, marginRight: `${seperation}px` }
     })
    )
    if (infinite) {
      const newChildren = Children.toArray(mappedChildren);
      // TODO do extra check if inView > length
      // TODO check if children and inview are not % 2 aka uneven
      const beginningArray = newChildren.slice(newChildren.length - childOffsetCount, newChildren.length).map((element, index) =>
        cloneElement(element, {
          ...element.props,
          key: `${index}_beginning`
        })
      )
      const endArray = newChildren.slice(0, childOffsetCount).map((element, index) =>
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
    const { childIndex, rightOffset, width, disabled, skipBy, childOffsetCount } = this.state;
    const newOffset = ( rightOffset - ( skipBy * ( width + seperation ) ) );
    const newChildIndex = childIndex - skipBy;
    if (this.animateTimer || disabled) { return; }
    if (newChildIndex <= 0) {
      if (infinite === true) {
        this.setState({ rightOffset: newOffset, childIndex: newChildIndex, animate: true }, () => {
          this.animateTimer = setTimeout(() => {
            const subtractIfLarger = children.length + newChildIndex;
            const fastChangeOffset = ( childOffsetCount + subtractIfLarger ) * ( width + seperation );
            this.setState({ rightOffset: fastChangeOffset, childIndex: subtractIfLarger, animate: false });
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

  // right
  handleRight = throttle(() => {
    const { children, seperation, infinite, animationTime } = this.props;
    const { childIndex, rightOffset, width, disabled, skipBy, childOffsetCount } = this.state;
    const newOffset = ( rightOffset + ( skipBy * ( width + seperation ) ) );
    const newChildIndex = childIndex + skipBy;
    // if waiting for setTimeout to finish animating dont continue click
    // should rarely get here if throttle is precise
    if (this.animateTimer || disabled) { return; }
    if (newChildIndex >= children.length -1) {
      if (infinite === true) {
        this.setState({ rightOffset: newOffset, childIndex: newChildIndex, animate: true }, () => {
          const subtractIfLarger = newChildIndex - children.length;
          this.animateTimer = setTimeout(() => {
            // fastChangeOffset is derived from getting how many clones (childOffsetCount) and
            // multiplying the width of all of them to get original starting point without clones
            const fastChangeOffset = (childOffsetCount + subtractIfLarger) * ( width + seperation );
            this.setState({ rightOffset: fastChangeOffset, childIndex: subtractIfLarger, animate: false });
            this.animateTimer = null;
          }, animationTime)
           });
        } else {
          this.setState({ rightOffset: 0, childIndex: 0, animate: true });
        }
    } else {
      this.setState({ rightOffset: newOffset, childIndex: newChildIndex, animate: true });
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
