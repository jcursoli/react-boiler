# executive-react

## Carousel Example
  ```jsx
<Carousel inView={3} seperation={30} animationTime={500} skipBy={3} dots='page' infinite dotsStyle={dotsStyle}>
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
  * infinite (bool) : if carousel should loop infinitely without animating oppisite way if reached the end   
  * dotsType (string)   
    * default 'page' : displays dots for each page of items   
    * 'item' : displays dots for each item
  * dots (bool) : display dots
    * default: true   
