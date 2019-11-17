import { useState, useEffect, useRef } from 'react';

export const useChange = (callback, deps=[]) => {
    const initialLoad = useRef(true);

    useEffect(() => {
        if (!initialLoad.current) {
            callback();
        }

        initialLoad.current = false;
    }, deps)
}

export function useMousePosition() {
    const [ mousePosition, setMousePosition ] = useState({ x:0, y: 0 });

    function handleMouseMove(e) {
        setMousePosition({ x: e.clientX, y: e.clientY });
    }

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove)
    });

    return mousePosition;
}

export function useMousePositionRelative(element=null, scale=1) {

    const mousePosition = useMousePosition();
    let offset = { x: 0, y: 0 }

    if (element) {
        const rect = element.getBoundingClientRect();
        offset = { x: rect.left, y: rect.top };
    } else {
        element = window.document.documentElement;
    }

    return {
        x: (mousePosition.x - offset.x) / scale,
        y: (mousePosition.y - offset.y) / scale
    };
}

export function useMouseDrag(element, contraints=[]) {

    if (!element) {
        element = window.document.documentElement;
    }

    const mousePosition = useMousePositionRelative(element);
    const ref = useRef(mousePosition)

    let [ startPosition, setStartPosition] = useState(null);
    const [ dragging, setDragging ] = useState(false);

    const handleMouseDown = (e) => {
        const valid = contraints.every(fn => fn(mousePosition));
        if (valid) {
            setStartPosition(ref.current);
        }
    }

    function handleMouseUp(e) {
        setDragging(false);
    }

    useEffect(() => {
        ref.current = mousePosition
    }, [ mousePosition ]);

    useChange(() => {
        setDragging(true);
    }, [ startPosition ]);

    useEffect(() => {
        if (element) {
            element.addEventListener('mousedown', handleMouseDown);
            window.addEventListener('mouseup', handleMouseUp);
            return () => {
                element.removeEventListener('mousedown', handleMouseDown);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
        
    }, [ element ]);

    return {
        mousePosition: {
            start: { ...startPosition },
            end: { ...mousePosition }
        },
        dragging
    }
}