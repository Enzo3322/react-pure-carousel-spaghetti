# React Pure Carousel Spaghetti

A lightweight and pure React carousel library with no external dependencies.

## Features

- 🚀 Pure React implementation with no external dependencies
- 🔄 Support for fractional items per view (1, 2, 3.5, 3.7, etc.)
- 🖼️ Lazy loading for better performance
- 📱 Fully responsive
- 🔄 Optional infinite navigation
- ⏱️ Optional autoplay
- 🎯 Navigation indicators
- 👆 Drag gesture support (mouse and touch)
- 🎨 Basic styling with pure CSS, easy to customize

## Installation

```bash
npm install react-pure-carousel-spaghetti
# or
yarn add react-pure-carousel-spaghetti
```

## Basic Usage

```jsx
import React from 'react';
import { Carousel } from 'react-pure-carousel-spaghetti';
import 'react-pure-carousel-spaghetti/dist/index.css'; // Import styles

const App = () => {
  return (
    <div className="app">
      <h1>React Pure Carousel</h1>
      
      <Carousel itemsPerView={3.5} spacing={10}>
        <div className="slide">Slide 1</div>
        <div className="slide">Slide 2</div>
        <div className="slide">Slide 3</div>
        <div className="slide">Slide 4</div>
        <div className="slide">Slide 5</div>
        <div className="slide">Slide 6</div>
      </Carousel>
    </div>
  );
};

export default App;
```

## Props

| Prop | Type | Default | Description |
|------|------|--------|-----------|
| `children` | `ReactNode[]` | Required | Elements to be displayed in the carousel |
| `itemsPerView` | `number` | `1` | Number of items visible at once (can be fractional) |
| `spacing` | `number` | `10` | Spacing between items in pixels |
| `lazyLoad` | `boolean` | `true` | Enable lazy loading for items |
| `preloadItems` | `number` | `1` | Number of items to preload before and after visible items |
| `infinite` | `boolean` | `false` | Enable infinite navigation |
| `autoPlay` | `boolean` | `false` | Enable automatic navigation |
| `autoPlayInterval` | `number` | `3000` | Interval in milliseconds for automatic navigation |
| `className` | `string` | `''` | Custom CSS class for the carousel container |
| `showIndicators` | `boolean` | `true` | Show navigation indicators |
| `showNavigation` | `boolean` | `true` | Show navigation buttons |
| `onSlideChange` | `(currentIndex: number) => void` | - | Callback function when the slide changes |

## Examples

### Carousel with fractional items

```jsx
<Carousel itemsPerView={3.5} spacing={20}>
  {/* Your items here */}
</Carousel>
```

### Carousel with infinite navigation and autoplay

```jsx
<Carousel 
  itemsPerView={1} 
  infinite={true} 
  autoPlay={true} 
  autoPlayInterval={5000}
>
  {/* Your items here */}
</Carousel>
```

### Carousel without lazy loading

```jsx
<Carousel itemsPerView={2} lazyLoad={false}>
  {/* Your items here */}
</Carousel>
```

## Customization

You can customize the appearance of the carousel by overriding the CSS classes:

```css
/* Customize the carousel container */
.carousel-container {
  /* Your styles here */
}

/* Customize the navigation buttons */
.carousel-nav-button {
  /* Your styles here */
}

/* Customize the indicators */
.carousel-indicator {
  /* Your styles here */
}
```

## License

MIT 