# MuHelm

Mutations + Helmet => MuHelm 
It provides simple way of subscription to changes of HTML head to React components

## Installation
Using `npm`
```sh
$ npm install muhelm --save-dev 
```
or `yarn`
```sh
$ yarn add muhelm
```

## Basic usage
Most common case is when you need to subscribe to `load` event of styles and scripts declared in head, using MuHelm you can easily subscribe to this event and propagate
needed data to your React component by passing properties into it, see following exanple
```javascript
import {muhelmLoads} from 'muhelm';

muhelmLoads(StyledComponent, (node) => {
	if (node && node.id === 'styled-component-styles') {
		return {
			isStyledComponentStylesLoaded: true
		}
	}
}));
```

## Get More Control
In case if you need more control you can use general mutation callback like in following example
```javascript
import {muhelm} from 'muhelm';

muhelm(StyledComponent, (nodes) => {
  nodes.forEach((node) => {
    if (node.id === 'styled-component-styles') {
      node.addEventListener('load', () => {
        done({
          isStyledComponentStylesLoaded: true
        });
      });
    }
  });
});
```

## API

### muhelmLoads
Subscribes to `load` event of styles and scripts in head
* **node** - DOM Element that represents link or script tag in head
* Should return properties object or anything that can be cast as false. Properties will be passed through to wrapped component

### muhelm
Subscribes to any mutation of the head
* **nodes** - Array of DOM elements that were mutated
* **done** - MuHelm callback. You need to pass properties object or anything that can be cast as false to callback. Properties will be passed through to wrapped component