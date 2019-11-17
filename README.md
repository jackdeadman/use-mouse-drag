# use-mouse-drag

> A react hook for creating interaction by dragging the mouse e.g., moving elements and drawing boxes

[![NPM](https://img.shields.io/npm/v/use-mouse-drag.svg)](https://www.npmjs.com/package/use-mouse-drag) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-mouse-drag
```

## Basic Usage

```
const { mousePosition, dragging } = useMouseDrag(element, constraints)
```


The mousePosition variable changes whenever the mouse moves. The object contains a start attribute and an end attribute indicating the location of the mouse at the start and the end of dragging. The dragging variable indicates whether or not the mouse is currently down. The `mousePosition.start` is an undefined value when not being dragged, use `mousePosition.end` to get current mousePosition.

Both the parameters passed into the hook are optional, The `element` parameter is the element that will listen for drags and will default to the entire page. The `constraints` parameter is an array of functions, the function gets passed a mousePosition and if any of the functions are false a drag will not begin.

See the Example below to see how it all fits together.

## Example
```jsx
import React, { useRef, useCallback, useState, useEffect } from 'react'
import { useMouseDrag, useChange } from 'use-mouse-drag'

const App = () => {
  const [ allowDragging, setAllowDragging ] = useState(true);
  const canvasRef = useRef();
  const allowDraggingRef = useRef(allowDragging);

  const { mousePosition, dragging } = useMouseDrag(canvasRef.current, [
    mousePosition => allowDraggingRef.current
  ]);

  useEffect(() => {
    allowDraggingRef.current = allowDragging;
  }, [ allowDragging ]);

  useChange(() => {
    // Drag ended
    if (!dragging) {
      alert('Dragged: ' + JSON.stringify(mousePosition))
    }
  }, [ dragging ]);

  return (
    <React.Fragment>
      <div ref={canvasRef} className="canvas"
      style={
        { opacity: allowDragging ? 1: 0.4 }
      }>
      </div>

      <div>Dragging: { dragging.toString() }</div>
      <div>Position: { JSON.stringify(mousePosition) }</div>
      <button onClick={() => setAllowDragging(!allowDragging)}>
        Turn dragging { allowDragging ? 'Off' : 'On' }
      </button>
    </React.Fragment>
  )
}
export default App
```

## License

MIT © [jackdeadman](https://github.com/jackdeadman)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
