import React, { useState } from "react";
import './BoxComponent.css'; // Import the CSS file

// Box Component to display each individual box
function Box({ size, position, onClick }) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation(); // Prevent the click event from bubbling up
        onClick(position);
      }}
      className="box"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    ></div>
  );
}

// Main BoxSplitApp Component
export default function BoxSplitApp() {
  const initialSize = 300; // The size of the initial square
  const initialPosition = { x: 0, y: 0 }; // Initial position for the first square
  const [boxes, setBoxes] = useState([{ size: initialSize, position: initialPosition }]);

  const handleClick = (position) => {
    // When a box is clicked, split it into four smaller boxes
    setBoxes((prevBoxes) => {
      const newBoxes = [];
      prevBoxes.forEach((box) => {
        if (box.position.x === position.x && box.position.y === position.y) {
          // Split the box into four smaller boxes
          const newSize = box.size / 2;
          newBoxes.push(
            { size: newSize, position: { x: box.position.x, y: box.position.y } }, // Top-left
            { size: newSize, position: { x: box.position.x + newSize, y: box.position.y } }, // Top-right
            { size: newSize, position: { x: box.position.x, y: box.position.y + newSize } }, // Bottom-left
            { size: newSize, position: { x: box.position.x + newSize, y: box.position.y + newSize } } // Bottom-right
          );
        } else {
          // Keep existing boxes as they are
          newBoxes.push(box);
        }
      });
      return newBoxes;
    });
  };

  return (
    <div className="container">
      {/* Display the center marker */}
      <div className="center-marker"></div>
      
      {boxes.map((box, index) => (
        <Box key={index} size={box.size} position={box.position} onClick={handleClick} />
      ))}
    </div>
  );
}
