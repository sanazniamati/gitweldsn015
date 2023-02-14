import React, { useState, useCallback } from "react";
import { Layer, Stage } from "react-konva";
import TransformerRectangle from "./TransformerRectangle";
import Konva from "konva";

function App() {
  const [selectShape, setSelectShape] = useState([]);
  const [blobs, setBlobs] = useState([]);
  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectShape([]);
    }
  };
  const handelCreateBlob = () => {
    setBlobs((prevBlobs) => [
      ...prevBlobs,
      {
        id: blobs.toString(),
        x: blobs.length * 150,
        color: Konva.Util.getRandomColor(),
      },
    ]);
  };

  return (
    <>
      <button onClick={handelCreateBlob}> CreateBlob</button>
      <Stage
        width={1000}
        height={1000}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        style={{
          backgroundColor: "pink",
        }}
      >
        <Layer>
          {blobs.map((blob, g) => (
            <TransformerRectangle
              key={g}
              id={blob.id}
              color={blob.color}
              shapeProps={blob}
              isSelected={blob.id === selectShape}
              onSelect={() => {
                setSelectShape(blob.id);
              }}
              onChange={(newAttrs) => {
                const copyOfSheklha = blobs.slice();
                copyOfSheklha[g] = newAttrs;
                setBlobs(copyOfSheklha);
              }}
              blobs={blobs}
            />
          ))}
        </Layer>
      </Stage>
    </>
  );
}

export default App;
