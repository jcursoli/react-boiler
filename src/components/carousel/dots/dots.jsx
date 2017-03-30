import React, { PureComponent } from 'react';
import styles from './dots.sass';

class Dots extends PureComponent {

  createDots = count => {
    const { currentIndex, dots, inView } = this.props;
    const realIndex = dots === 'page' ? Math.ceil(currentIndex / inView) : currentIndex;
    const dotsArray = [];
    for (let i = 0; i < count; i ++) {
      if (realIndex === i) {
        dotsArray.push(<div onClick={e => this.handleClick(e, i)} key={i} className={`${styles.dot} ${styles.active}`} />);
      } else {
        dotsArray.push(<div onClick={e => this.handleClick(e, i)} key={i} className={styles.dot} />);
      }
    }
    return dotsArray;
  }

  handleClick = (e, clickedDotIndex) => {
    const { inView, handleDotClick, dots } = this.props;
    if (dots === 'page') {
      handleDotClick(clickedDotIndex * inView);
    } else {
      handleDotClick(clickedDotIndex);
    }
  }

  getDots = () => {
    const { dots, inView, childrenLength } = this.props;
    const count = Math.ceil(childrenLength / inView);
    if (!dots) return null;
    switch (dots) {
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
  dots: React.PropTypes.string.isRequired,
  inView: React.PropTypes.number.isRequired,
  currentIndex: React.PropTypes.number.isRequired,
  childrenLength: React.PropTypes.number.isRequired,
  handleDotClick: React.PropTypes.func.isRequired,
};

export default Dots;
