import React, { Fragment, useState } from "react";

import { Group, Layer, Stage } from "react-konva";
import Rectangle from "./Rectangle";
import Konva from "konva";
function generateShapes() {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() + 100,
    y: Math.random() + 100,
    color: Konva.Util.getRandomColor(),
  }));
}
const INITIAL_STATE = generateShapes();
function App() {
  const [sheklha, setSheklha] = useState(INITIAL_STATE);
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
    setBlobs((prevBlobs) => [...prevBlobs]);
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
            <Group key={g} x={g * 150}>
              {/*<Fragment key={g}>*/}
              {sheklha.map((item, i) => {
                return (
                  <Rectangle
                    key={i}
                    id={item.id}
                    color={item.color}
                    shapeProps={item}
                    isSelected={item.id === selectShape}
                    onSelect={() => {
                      setSelectShape(item.id);
                    }}
                    onChange={(newAttrs) => {
                      const copyOfSheklha = sheklha.slice();
                      copyOfSheklha[i] = newAttrs;
                      console.log(newAttrs);
                      setSheklha(copyOfSheklha);
                    }}
                  />
                );
              })}

              {/*</Fragment>*/}
            </Group>
          ))}
        </Layer>
      </Stage>
    </>
  );
}

export default App;
