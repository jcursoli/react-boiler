import React, { PureComponent } from 'react';
import styles from './dots.sass';

class Dots extends PureComponent {

  createDots = count => {
    const { currentIndex, dotsType, dots, inView, style, dotsClassName } = this.props;
    const pageIndex = Math.ceil(currentIndex / inView) >= count ? count - 1 : Math.ceil(currentIndex / inView);
    const dotIndex = dotsType === 'page' ? pageIndex : currentIndex;
    const dotsArray = Array(count - 1);
    if (dots === false) return null;
    for (let i = 0; i < count; i ++) {
      if (dotIndex === i) {
        dotsArray.push(
            <div
              style={style}
              onClick={e => this.handleClick(e, i)}
              key={`${i}_active`}
              className={`${styles.dot} ${styles.active} ${dotsClassName}`}
            />
          );
      } else {
        dotsArray.push(
          <div
            style={style}
            onClick={e => this.handleClick(e, i)}
            key={`${i}_nonactive`}
            className={`${styles.dot} ${dotsClassName}`}
          />
        );
      }
    }
    return dotsArray;
  }

  handleClick = (e, clickedDotIndex) => {
    const { inView, handleDotClick, dotsType } = this.props;
    if (dotsType === 'page') {
      handleDotClick(clickedDotIndex * inView);
    } else {
      handleDotClick(clickedDotIndex);
    }
  }

  getDots = () => {
    const { dots, inView, childrenLength, dotsType } = this.props;
    const count = Math.ceil(childrenLength / inView);
    if (!dots) return null;
    switch (dotsType) {
      case 'page' :
        return this.createDots(count);
      case 'item' :
        return this.createDots(childrenLength);
      default:
        return this.createDots(count);
    }
  }
  render() {
    return (
      <div className={styles.dots}> { this.getDots() } </div>
    );
  }
}
Dots.propTypes = {
  dots: React.PropTypes.bool.isRequired,
  dotsType: React.PropTypes.string.isRequired,
  inView: React.PropTypes.number.isRequired,
  currentIndex: React.PropTypes.number.isRequired,
  childrenLength: React.PropTypes.number.isRequired,
  handleDotClick: React.PropTypes.func.isRequired,
  dotsClassName: React.PropTypes.string.isRequired,
  style: React.PropTypes.objectOf(React.PropTypes.string),
};
Dots.defaultProps = {
  dotsClassName: '',
  style: {},
};

export default Dots;
