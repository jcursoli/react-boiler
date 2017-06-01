import React, { PureComponent } from 'react';
import { fill, trim } from 'lodash';
import PropTypes from 'prop-types';
import styles from './dots.scss';

class Dots extends PureComponent {

  createDots = count => {
    const { currentIndex, dotsType, dots, inView, style, dotsClassName, childrenLength } = this.props;
    const pageIndex = (currentIndex + 1) > childrenLength ? 0 : Math.ceil(currentIndex / inView);
    const dotIndex = dotsType === 'page' ? pageIndex : currentIndex;
    if (dots === false) return null;
    return fill(Array(count)).map((unused, index) => {
      const key = dotIndex === index ? `${index}_active` : `${index}_nonactive`;
      const className = dotIndex === index ?
        trim(`${styles.dot} ${styles.active} ${dotsClassName}`) :
        trim(`${styles.dot} ${dotsClassName}`);
      return (
        <div
          style={style}
          onClick={e => this.handleClick(e, index)}
          key={key}
          className={className}
        />
      );
    });
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
    if (!dots) { return null; }
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
  dots: PropTypes.bool.isRequired,
  dotsType: PropTypes.string.isRequired,
  inView: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
  childrenLength: PropTypes.number.isRequired,
  handleDotClick: PropTypes.func.isRequired,
  dotsClassName: PropTypes.string.isRequired,
  style: PropTypes.objectOf(React.PropTypes.string),
};
Dots.defaultProps = {
  dotsClassName: '',
  style: {},
};

export default Dots;
