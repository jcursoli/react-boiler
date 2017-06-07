# react-carousel
`$ npm install --save reactjs-carousel`
## Carousel Example
  ```jsx
<Carousel inView={3} gutter={30} animationTime={500} skipBy={3} dotsStyle={dotsStyle} infinite>
    <div style={{background: "#2f92d6", height: '300px'}} key={1}>1</div>
    <div style={{background: "#2f92d6", height: '300px'}} key={2}>2</div>
    <div style={{background: "#2f92d6", height: '300px'}} key={3}>3</div>
    <div style={{background: "#2f92d6", height: '300px'}} key={4}>4</div>
</Carousel>
  ```

## Carousel Props
  * inView (number) : how many children to be displayed at once   
    * default: 2   
  * skipBy (number) : how many items the arrows will skip though on each click   
    * default: inView   
  * gutter (number) : how much space to be between each item (in pixels)   
    * default: 30   
  * animationTime (number) : how long animation should take place (in ms)   
    * default: 1000   
  * infinite (bool) : if carousel should loop infinitely without animating opposite way if reached the end   
  * dotsType (string)   
    * default 'page' : displays dots for each page of items   
    * 'item' : displays dots for each item
  * dots (bool) : display dots
    * default: true   

## Why?   
 * react-carousel has many options that are configurable and makes styling very easy with style and className hooks.
 * offers infinite looping with children passed in
   * The infinite loop obeys the skipBy prop and always skips the same amount of items each time, even when children are uneven (the reason the carousel was made)

### Testing
  * Always begin with shallow
  * If componentDidMount or componentDidUpdate should be tested, use mount
  * If you want to test component lifecycle and children behavior, use mount
  * If you want to test children rendering with less overhead than mount and you are not interested in lifecycle methods, use render
  Refer to https://github.com/airbnb/enzyme/issues/465
