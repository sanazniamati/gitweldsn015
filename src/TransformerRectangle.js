import React, { useEffect, useRef, useState } from "react";
import { Line, Transformer } from "react-konva";
import { Html } from "react-konva-utils";
function TransformerRectangle({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  color,
}) {
  const shapeRef = useRef();
  const trRef = useRef();

  const [unShow, setUnShow] = useState(true);

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
  const handelDelete = () => {
    // const result = blobs.filter((id) => id === shapeProps.id);
    // console.log(result);

    if (isSelected) {
      setUnShow(false);
    }
  };
  return (
    <React.Fragment>
      <Html>
        <button onClick={handelDelete}>Delete</button>
      </Html>

      <Line
        visible={unShow}
        ref={shapeRef}
        points={[50, 50, 150, 50, 100, 150]}
        tension={0.5}
        fill={color}
        onClick={onSelect}
        {...shapeProps}
        stroke={"darkGreen"}
        closed
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={() => {
          onChange({
            ...shapeProps,
          });
        }}
      />

      {isSelected && (
        <>
          <Transformer
            visible={unShow}
            borderStroke={"darkGreen"}
            borderDash={[10, 5]}
            borderStrokeWidth={5}
            anchorCornerRadius={5}
            anchorStrokeWidth={2}
            anchorSize={20}
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.width < 55 || newBox.height < 55) {
                return oldBox;
              }

              return newBox;
            }}
          />
        </>
      )}
    </React.Fragment>
  );
}
export default TransformerRectangle;
