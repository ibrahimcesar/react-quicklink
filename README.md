# React Quicklink

> ⚡️ Faster subsequent page-loads by prefetching in-viewport links during idle time for __React__, port of https://getquick.link

![Quicklink example](https://react-quicklink.s3.amazonaws.com/example.gif)

## Installation

Use your favorite package manager:

```bash
yarn add react-quicklink
```

```bash
npm install react-quicklink -S
```
## How it works

Quicklink attempts to make navigations to subsequent pages load faster by making anchors aware of user network capabilities. 

It will:  
- Detect links within the viewport (using __Intersection Observer__)
- Wait until the browser is idle (using __requestIdleCallback__)
- Check if the user isn't on a slow connection (using __navigator.connection.effectiveType__) or has data-saver enabled (using __navigator.connection.saveData__)
- Prefetch URLs to the links (using __<link rel=prefetch>__ or __XHR__).

## Why

Specially for Server Side Rendering Apps, with a lot of content, navigation between pages is not as performant as single page applications, this technique makes it possible to fine tune your perceived speed and provide a better experience for your users. As a component you can have control in which links and origins you want to target and not load every link it finds (which is a very expensive task if you have a lot of links in a page) -- which met my expectations and needs, and hopefully yours too. An adaptive loading method for anchors make for a better navigation.

Prefer a Higher Order Component (HOC)?

Great, this will be the right choice for you: https://github.com/HOUCe/react-quicklink-component/

## Basic usage

```javascript
import React from "react";
import { render } from "react-dom";
import { Quicklink } from "react-quicklink";

const App = () => (
  <div>
    <Quicklink 
        to="https://google.com"
        alt="Alt"
        title="Title"
    >Click Here!
    </Quicklink>
  </div>
);

// But please, do not use "Click Here", the good People of Internet will thank you.
// https://www.smashingmagazine.com/2012/06/links-should-never-say-click-here/

render(<App />, document.getElementById("root"));
```
And that's it.

## Pro Usage

You asked for props? You got props.

Examples with and without children.

```javascript
const App = () => (
  <div>
    <Quicklink
        to="https://example.com" // String, is the URL to be fetched. Required
        alt="Alt" // String for alternative text for your link. Required! #a11y
        title="Title" // String for title text for your link
        connType: "2g" // String with threshold for slow connection. Could be "slow-2g", "2g", "3g" or"4g". Dafaults to 2g, meaning on "slow-2g", "2g" this component will not do anything besides be the good and old anchor link <a>
        rootMargin: "0px" // String value for rootMargin property for Intersection Observer. Must be in pixels or percentage.
        threshold: [1.0], // Array of floats from 0 to 1.0. Threshold or Intersection Observer. To better understand about this Web API, pelase refer to https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
        content: "My text link that is not Click Here, passed as a prop!", // String for content if you prefer a more concise way to wrote the tag, like I fancy myself. 
        cls: "my-class" // Bring Your Own Styles. Pass a class to Quicklink, style as you wish
    />

    <Quicklink
        to="https://example.com" // String, is the URL to be fetched. Required
        alt="Alt" // String for alternative text for your link. Required! #a11y
        // Every other prop is the same
        content="This will be ignored" // If you are using Quicklink with a children, it will display your children and not the string passed this prop. Childrens first!
    >My text link that is not Click Here, passed as children</Quicklink>
  </div>
);
```

## Browser support

The prefetching provided by `quicklink` can be viewed as a [progressive enhancement](https://www.smashingmagazine.com/2009/04/progressive-enhancement-what-it-is-and-how-to-use-it/). Cross-browser support is as follows:

* Without polyfills: Chrome, Safari ≥ 12.1, Firefox, Edge, Opera, Android Browser, Samsung Internet.
* With [Intersection Observer polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) ~6KB gzipped/minified: Safari ≤ 12.0, IE11
* With the above and a [Set()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) and [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) polyfill: IE9 and IE10. [Core.js](https://github.com/zloirock/core-js) provides both `Set()` and `Array.from()` shims. Projects like [es6-shim](https://github.com/paulmillr/es6-shim/blob/master/README.md) are an alternative you can consider.

Certain features have layered support:

* The [Network Information API](https://wicg.github.io/netinfo/), which is used to check if the user has a slow effective connection type (via `navigator.connection.effectiveType`) is only available in [Chrome 61+ and Opera 57+](https://caniuse.com/#feat=netinfo)
* If [Fetch API](https://fetch.spec.whatwg.org/) isn't available, XHR will be used instead.


## Issues
Not tested in all OS, browsers etc. Use at your risk, but please, send feedback! Please feel free to open an issue!

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### TO DO:
- Add tests
- Test browser coverage

## Thanks

[Quicklink](https://getquick.link/) lib from Google  
[React Quicklink Component](https://github.com/GoogleChromeLabs/quicklink), a HOC for React for the inspiration  
Addy Osmani ([addyosmani](https://github.com/addyosmani)) for the Adaptive Loading ideas and the great work in a more performant web

## See Also
[__React Lite YouTube Embed__](https://www.npmjs.com/package/react-lite-youtube-embed): A faster and cleaner YouTube embed component for __React__

## License
[MIT](https://choosealicense.com/licenses/mit/)

