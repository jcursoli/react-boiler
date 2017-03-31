import React, { Component } from 'react';
import Carousel from './components/carousel/carousel';
import styles from './App.sass';

class App extends Component {
  render() {
    return (
      <div className={styles.main}>
        {/* <Carousel inView={3} seperation={30} animationTime={500}> */}
        {/* <Carousel inView={3} seperation={30} animationTime={500}> */}
        {/* <Carousel inView={2} seperation={30} animationTime={500} skipBy={4}> */}
        {/* <Carousel inView={5} seperation={30} animationTime={500} skipBy={4}> */}
        {/* <Carousel inView={4} seperation={30} animationTime={500} skipBy={3}> */}
        {/* <Carousel inView={5} seperation={30} animationTime={500} skipBy={3}>*/}
        <Carousel inView={3} seperation={30} animationTime={500} skipBy={3} dotsType='page' infinite>
          <div style={{background: "#2f92d6", height: '300px'}} key={1}>1</div>
          <div style={{background: "#2f92d6", height: '300px'}} key={2}>2</div>
          <div style={{background: "#2f92d6", height: '300px'}} key={3}>3</div>
          <div style={{background: "#2f92d6", height: '300px'}} key={4}>4</div>
          <div style={{background: "#2f92d6", height: '300px'}} key={5}>5</div>
          <div style={{background: "#2f92d6", height: '300px'}} key={6}>6</div>
          <div style={{background: "#2f92d6", height: '300px'}} key={7}>7</div>
          <div style={{background: "#2f92d6", height: '300px'}} key={8}>8</div>
          <div style={{background: "#2f92d6", height: '300px'}} key={9}>9</div>
          <div style={{background: "#2f92d6", height: '300px'}} key={10}>10</div>
          <div style={{background: "#2f92d6", height: '300px'}} key={11}>11</div>
          <div style={{background: "#2f92d6", height: '300px'}} key={12}>12</div>

        </Carousel>
      </div>
    );
  }
}

export default App;


{/* <img key={1} src='https://d13yacurqjgara.cloudfront.net/users/147281/screenshots/1768035/nike_tshirt_design_by_noem9_studio_04.jpg' />
<img key={2} src='http://cdn.ndtv.com/tech/images/gadgets/nike_hyperadapt_1.0_native_self_lacing_sneaker_official.jpg' />
<img key={3} src='https://d13yacurqjgara.cloudfront.net/users/675405/screenshots/3029550/nike-3.png' />
<img key={4} src='http://insidethesneakerbox.com/wp-content/uploads/2017/01/16-420_Nike_PG1_Hero_Single_Gray-03a_original-e1483995723140.jpg' />
<img key={5} src='https://s-media-cache-ak0.pinimg.com/originals/03/b7/98/03b798dfe81521b9f8723dd7c46f8e13.jpg' />
<img key={6} src='https://s3.amazonaws.com/freebiesupply/large/1x/nike-air-jordan-vector-w61.jpg' />
<img key={7} src='http://img.autobytel.com//2017/nissan/gt-r/2-800-oemexteriorfront1300-80917.jpg' />
<img key={8} src='https://s-media-cache-ak0.pinimg.com/originals/04/bf/b1/04bfb10ca9d7bb53e96439d080f24725.jpg' />
<img key={9} src='https://s-media-cache-ak0.pinimg.com/originals/0d/d0/19/0dd019aca48d781638636495041cdb30.jpg' />
<img key={10} src='https://s-media-cache-ak0.pinimg.com/originals/52/83/fb/5283fba638c200a39a00e94543b1d6a3.jpg' /> */}
