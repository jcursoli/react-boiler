import React, { PureComponent, Children, cloneElement } from 'react';
import { throttle } from 'lodash';
import styles from './carousel.sass';
import Dots from './dots/dots';

class Carousel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      childIndex: 0,
      width: 0,
      rightOffset: 0,
      disabled: props.disabled,
      animate: !props.infinite,
      rootHeight: 0,
      childOffsetCount: 0,
    };
  }
  // TODO add dynamic height to root carousel element
  componentDidMount() {
    const { inView, seperation, disabled, children, skipBy, infinite } = this.props;
    const newSkipBy = skipBy || inView;
    const inviewTotal = inView > children.length ? children.length : inView;
    const disable = (inviewTotal === children.length) || disabled;
    const width = ((this.container.offsetWidth - (seperation * (inviewTotal - 1))) / (inviewTotal || 1));
    // childOffsetCount used for determining how many clones should be created
    // add children.length % inviewTotal for when children.length is not divisible by how many are being skipped (newSkipBy)
    const childOffsetCount = infinite ? (children.length % inviewTotal === 0 ? inviewTotal : inviewTotal + (children.length % newSkipBy)) : 0;
    const startRightOffset = (childOffsetCount * (width + seperation));
    this.setState({ width, childOffsetCount, disabled: disable, rightOffset: startRightOffset, skipBy: newSkipBy });
    window.addEventListener('resize', this.carouselResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.carouselResize);
  }
  carouselResize = throttle(() => {
    const { seperation, children, inView } = this.props;
    const { childOffsetCount, childIndex } = this.state;
    const inviewTotal = inView > children.length ? children.length : inView;
    const width = ((this.container.offsetWidth - (seperation * (inviewTotal - 1))) / (inviewTotal || 1));
    const newOffset = ((childOffsetCount + childIndex) * (width + seperation));
    this.setState({ width, rightOffset: newOffset });
  }, 200)

  handleDotClick = index => {
    const { seperation, children, inView, infinite } = this.props;
    const { width, disabled, childOffsetCount } = this.state;
    if (disabled) return;
    if (infinite === true) {
      const newOffset = ((childOffsetCount + index) * (width + seperation));
      this.setState({ childIndex: index, rightOffset: newOffset, animate: true });
    } else {
      const modifiedIndex = (index + inView) > children.length ? index - ((index + inView) - children.length) : index;
      const newOffset = (modifiedIndex * (width + seperation));
      this.setState({ rightOffset: newOffset, childIndex: index, animate: true });
    }
  }

  mapNewChildren = () => {
    const { children, seperation, infinite } = this.props;
    const { width, childOffsetCount } = this.state;
    const mappedChildren = Children.map(children, element =>
      cloneElement(element, {
        ...element.props,
        style: { ...element.props.style, width: `${width}px`, minWidth: `${width}px`, marginRight: `${seperation}px` },
      })
    );
    const newChildren = Children.toArray(mappedChildren);
    if (infinite) {
      // TODO do extra check if inView > length
      // TODO check if children and inview are not % 2 aka uneven
      const beginningArray = newChildren.slice(newChildren.length - childOffsetCount, newChildren.length).map((element, index) =>
        cloneElement(element, {
          ...element.props,
          key: `${index}_beginning`,
        })
      );
      const endArray = newChildren.slice(0, childOffsetCount).map((element, index) =>
        cloneElement(element, {
          ...element.props,
          key: `${index}_end`,
        })
      );
      return [...beginningArray, ...newChildren, ...endArray];
    }
    return newChildren;
  }
  handleLeft = throttle(() => {
    const { children, seperation, infinite, animationTime } = this.props;
    const { childIndex, rightOffset, width, disabled, skipBy, childOffsetCount } = this.state;
    const newOffset = (rightOffset - (skipBy * (width + seperation)));
    const newChildIndex = childIndex - skipBy;
    if (this.animateTimer || disabled) { return; }
    if (newChildIndex <= 0) {
      if (infinite === true) {
        this.setState({ rightOffset: newOffset, childIndex: newChildIndex, animate: true }, () => {
          this.animateTimer = setTimeout(() => {
            const subtractIfLarger = children.length + newChildIndex;
            const fastChangeOffset = (childOffsetCount + subtractIfLarger) * (width + seperation);
            this.setState({ rightOffset: fastChangeOffset, childIndex: subtractIfLarger, animate: false });
            this.animateTimer = null;
          }, animationTime);
        });
      } else {
          // if its not already at the beginning then animate left
        if (childIndex > 0) {
          this.setState({ rightOffset: 0, childIndex: 0, animate: true });
        }
      }
    } else {
      this.setState({ rightOffset: newOffset, childIndex: newChildIndex, animate: true });
    }
  }, this.props.animationTime + 15)

  // right
  handleRight = throttle(() => {
    const { children, seperation, infinite, animationTime, inView } = this.props;
    const { childIndex, rightOffset, width, disabled, skipBy, childOffsetCount } = this.state;
    const newChildIndex = childIndex + skipBy;
    const newOffset = (rightOffset + (skipBy * (width + seperation)));
    // if waiting for setTimeout to finish animating dont continue click
    // should rarely get here if throttle is precise
    if (this.animateTimer || disabled) { return; }
    if (newChildIndex >= children.length - 1) {
      if (infinite === true) {
        this.setState({ rightOffset: newOffset, childIndex: newChildIndex, animate: true }, () => {
          const subtractIfLarger = newChildIndex - children.length;
          this.animateTimer = setTimeout(() => {
            // fastChangeOffset is derived from getting how many clones (childOffsetCount) and
            // multiplying the width of all of them to get original starting point without clones
            const fastChangeOffset = (childOffsetCount + subtractIfLarger) * (width + seperation);
            this.setState({ rightOffset: fastChangeOffset, childIndex: subtractIfLarger, animate: false });
            this.animateTimer = null;
          }, animationTime);
        });
      } else {
        // check if have less items left, then the skip count
        // if so edit skip count to be remaining items off screen
        if (infinite === false && children.length > childIndex + inView) {
          const offsetOddCount = children.length - (childIndex + inView);
          const newOffsetWithRemainingSlides = (rightOffset + (offsetOddCount * (width + seperation)));
          this.setState({ rightOffset: newOffsetWithRemainingSlides, childIndex: childIndex + offsetOddCount, animate: true });
        } else {
          this.setState({ rightOffset: 0, childIndex: 0, animate: true });
        }
      }
    } else {
      // check if next skip will have empty slots
      // i.e check if next skip will be too large for remaining items
      if (infinite === false && newChildIndex + inView > children.length - 1) {
        const lastSkipByIfUneven = skipBy - ((newChildIndex + inView) - children.length);
        const newOffsetWithoutEmptySlots = (rightOffset + (lastSkipByIfUneven * (width + seperation)));
        this.setState({ rightOffset: newOffsetWithoutEmptySlots, childIndex: childIndex + lastSkipByIfUneven, animate: true });
      } else {
        this.setState({ rightOffset: newOffset, childIndex: newChildIndex, animate: true });
      }
    }
  }, this.props.animationTime + 15)

  render() {
    const { rightOffset, animate, childIndex } = this.state;
    const { animationTime, inView, dots, children } = this.props;
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
              style={{ right: rightOffset, transition: animate ? `${animationTime / 1000}s` : '0s' }}
              className={`${styles['children-container']}`}
            >
              { this.mapNewChildren() }
            </div>
          </div>
          <Dots
            handleDotClick={this.handleDotClick}
            childrenLength={Children.count(children)}
            dots={dots}
            inView={inView}
            currentIndex={childIndex}
          />
        </div>
    );
  }
}
Carousel.propTypes = {
  children: React.PropTypes.array,
  inView: React.PropTypes.number,
  seperation: React.PropTypes.number,
  disabled: React.PropTypes.bool,
  skipBy: React.PropTypes.number,
  animationTime: React.PropTypes.number,
  infinite: React.PropTypes.bool,
};
Carousel.defaultProps = {
  animationTime: 1000,
  disabled: false,
  infinite: false,
  inView: 2,
  seperation: 30,
  skipBy: undefined,
};

export default Carousel;
