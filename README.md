# Frontend Mentor - Time tracking dashboard solution

This is my solution to the [Time tracking dashboard challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/time-tracking-dashboard-UIQ7167Jw). 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshots](#screenshots)
  - [Demo](#demo)
- [My process](#my-process)
  - [What I learned](#what-i-learned)
  - [Business logic](#business-logic)  
  - [Continued development](#continued-development)
- [Links](#links)


## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Switch between viewing Daily, Weekly, and Monthly stats

### Screenshots

<img src="https://user-images.githubusercontent.com/95124571/151046406-52e38d99-e8fe-45e0-82d1-33ef1936db36.png" width="192" height="512"> <img src="https://user-images.githubusercontent.com/95124571/151046567-d0ea3874-0dca-4894-b9b8-b40193efec96.png" width="768" height="512">

### Demo

- Solution URL: [Add solution URL here](https://www.frontendmentor.io/solutions/time-tracking-dashboard-using-only-vanilla-cssflexbox-html-js-QFITjKNPV)
- Live Site URL: [Click to open](https://forksort.github.io/Time-tracking-dashboard/)

## My process

I decided to use just vanilla: HTML, CSS (flexbox) and Javascript. 
Once i setup the basic mobile and then desktop skeletons i added colors, images and then found a decent balance between pixel-perfect offsets/size and least possible (while readable) css-code. Finally, to make this challenge a little more interesting i commented out all contents of the html body, and started planning the Javascript, i had a simple plan: dynamically render all html-content without using innerHTML or any frameworks/libraries. 

I've tried to name variables, properties and methods by their behaviour, so that comments should only be necessary to describe not-so-obvious-logic/nesting. I've used JSDoc standard for JS-comments (to best of my ability).

### What I learned

I learned many things, among them limits of flexbox (seems css-grid could be a better fit here) and a lot about Javascript.

### Business logic

While there isn't much "business-logic" (since we have pre-arranged data) this is what happens when the page is loaded:
```js
const app = new App({ // 1. instantiate the App
    profileName: "Jeremy Robson",
    profileImageUrl: "/images/image-jeremy.png",
    dataUrl: "./data.json"
}); // ^ here we could load the app with custom data (in a future version)
```
```js
// then the App method calls...
async fetchData() // 2. loads json-file
createInitialElements() // 3. Creates the initial app-elements, and initiates event-listeners
renderSchedule() // 4. renders the weekly time-track elements
// 5. awaits user interaction
```

### Continued development

I think it would be interesting to convert the flexbox to css-grid, add some more transitions/animations, and perhaps also add new functionality. Last but not least add a "syntactic-sugar" method to the createElement() method.

## Links

[My other projects @ Github](https://github.com/ForkSort)

[Me @ Frontend Mentor](https://www.frontendmentor.io/profile/ForkSort)
