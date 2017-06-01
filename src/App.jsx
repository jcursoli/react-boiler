import React, { Component } from 'react';
import Carousel from './components/carousel/carousel';
import styles from './App.scss';

class App extends Component {
  render() {
    return (
      <div className={styles.main}>
        <Carousel inView={3} skipBy={3} gutter={30} animationTime={500} infinite>
          <div style={{ background: '#2f92d6', height: '300px' }} key={1}>1</div>
          <div style={{ background: '#2f92d6', height: '300px' }} key={2}>2</div>
          <div style={{ background: '#2f92d6', height: '300px' }} key={3}>3</div>
          <div style={{ background: '#2f92d6', height: '300px' }} key={4}>4</div>
          <div style={{ background: '#2f92d6', height: '300px' }} key={5}>5</div>
          <div style={{ background: '#2f92d6', height: '300px' }} key={6}>6</div>
          <div style={{ background: '#2f92d6', height: '300px' }} key={7}>7</div>
          <div style={{ background: '#2f92d6', height: '300px' }} key={8}>8</div>
          <div style={{ background: '#2f92d6', height: '300px' }} key={9}>9</div>
          <div style={{ background: '#2f92d6', height: '300px' }} key={10}>10</div>
          <div style={{ background: '#2f92d6', height: '300px' }} key={11}>11</div>
          <div style={{ background: '#2f92d6', height: '300px' }} key={12}>12</div>
        </Carousel>
      </div>
    );
  }
}

export default App;
