import React, { Fragment, useState } from "react";

import { Group, Layer, Stage } from "react-konva";
import Rectangle from "./Rectangle";
import Konva from "konva";

function App() {
  const [selectShape, setSelectShape] = useState(null);
  const [blobs, setBlobs] = useState([]);
  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectShape(null);
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
    console.log(blobs);
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
            <Rectangle
              id={blob.id}
              // color={blob.color}
              shapeProps={blob}
              isSelected={blob.id === selectShape}
              onSelect={() => {
                setSelectShape(blob.id);
                console.log("Selected shape" + blob.id);
              }}
              onChange={(newAttrs) => {
                const copyOfSheklha = blobs.slice();
                copyOfSheklha[g] = newAttrs;
                // console.log(newAttrs);
                setBlobs(copyOfSheklha);
              }}
            />
          ))}
        </Layer>
      </Stage>
    </>
  );
}

export default App;
