import React, { PureComponent } from 'react';
import { fill, trim } from 'lodash';
import styles from './dots.sass';

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
