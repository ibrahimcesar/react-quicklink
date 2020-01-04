# React Quicklink

> ⚡️ Faster subsequent page-loads by prefetching in-viewport links during idle time for React, port of https://getquick.link

![iFrame example](https://react-lite-youtube-embed.s3-sa-east-1.amazonaws.com/lite.gif)

## Installation

Use your favorite package manager:

```bash
yarn add react-quicklink
```

```bash
npm install react-quicklink -S
```
## How it works

Quicklink attempts to make navigations to subsequent pages load faster. It:

- Detects links within the viewport (using __Intersection Observer__)
- Waits until the browser is idle (using __requestIdleCallback__)
- Checks if the user isn't on a slow connection (using __navigator.connection.effectiveType__) or has data-saver enabled (using __navigator.connection.saveData__)
- Prefetches URLs to the links (using __<link rel=prefetch>__ or __XHR__).

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
    >Click me!
    </Quicklink>
  </div>
);

render(<App />, document.getElementById("root"));
```
And that's it.

## Pro Usage

```javascript
const App = () => (
  <div>
    <LiteYouTubeEmbed
    />
  </div>
);
```

## Bring Your Own Styles

React Lite YouTube Embed is packaged with all original styles from Paul Irish's [Lite YouTube Embed](https://github.com/paulirish/lite-youtube-embed) but you can customize them as you wish passing as a prop.

```javascript
const App = () => (
  <div>
    <LiteYouTubeEmbed
       id="L2vS_050c-M"
       activeClass="lyt-activated" // Default as "lyt-activated", gives control to wrapper once clicked
       iframeClass="" // Default none, gives control to add a class to iframe element itself
       playerClass="lty-playbtn" // Default as "lty-playbtn" to control player button styles
       wrapperClass="yt-lite" // Default as "yt-lite" for the div wrapping the area, it is the most important class and needs extra attention, please refer to LiteYouTubeEmbed.css for a reference.
    />
  </div>
);
```
## Issues
Not tested in all Operation Systems, Browsers etc. Use at your risk, but please, send feedback! Please feel free to open an issue!

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### TO DO:
- Add tests
- Test browser coverage

## Thanks

Paul Irish ([paulirish](https://github.com/paulirish)) for [Lite YouTube Embed](https://github.com/paulirish/lite-youtube-embed)  
Acauã Sperl de Faria ([acaua](https://github.com/acaua)) for code review  
Addy Osmani ([addyosmani](https://github.com/addyosmani)) for the Adaptive Loading ideas

## License
[MIT](https://choosealicense.com/licenses/mit/)

