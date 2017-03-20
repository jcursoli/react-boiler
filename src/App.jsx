import React, { Component } from 'react';
import Carousel from './components/carousel/carousel';
import styles from './App.sass';

class App extends Component {
  render() {
    return (
      <div className={styles.main}>
        <Carousel inView={2} seperation={30} infinite animationTime={1000}>
          <div className={styles.col} style={{ height: '200px', background: '#2F92D6' }}> <h2>1</h2> </div>
          <div className={styles.col} style={{ height: '200px', background: '#2F92D6' }}> <h2>2</h2> </div>
          <div className={styles.col} style={{ height: '200px', background: '#2F92D6' }}> <h2>3</h2> </div>
          <div className={styles.col} style={{ height: '200px', background: '#2F92D6' }}> <h2>4</h2> </div>
        </Carousel>
      </div>
    );
  }
}

export default App;
