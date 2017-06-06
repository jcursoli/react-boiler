export const getDotsProps = newSet =>
  ({
    dots: true,
    dotsType: 'page',
    inView: 2,
    currentIndex: 0,
    childrenLength: 10,
    handleDotClick: () => {},
    dotsClassName: 'testClass',
    style: {},
    ...newSet,
  });
