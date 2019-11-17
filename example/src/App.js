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