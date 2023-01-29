import React, { useEffect, useRef } from "react";
import { Circle, Line, Transformer } from "react-konva";

function Rectangle({ shapeProps, isSelected, onSelect, onChange, color }) {
  const shapeRef = useRef();
  const trRef = useRef();
  let nodeWidth;

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Line
        points={[50, 50, 150, 50, 100, 150]}
        tension={0.5}
        fill={color}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        stroke={"darkGreen"}
        closed
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: Math.floor(e.target.x()),
            y: Math.floor(e.target.y()),
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          const rotation = node.rotation();
          nodeWidth = node.points();
          // console.log("scaleX,scaleY :", scaleX.toFixed(2), scaleY.toFixed(2));
          // console.log("node.width():", node.width());
          // console.log("node.height():", node.height());
          // console.log("scaleY", scaleY.toFixed(2));
          // console.log("rotation", rotation.toFixed(2));
          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          // console.log("scaleX after reset", node.scaleX());

          onChange({
            ...shapeProps,
            //x: Math.floor(node.x()),
            //y: Math.floor(node.y()),
            // set minimal value
            points: node
              .points()
              .map((num, ind) =>
                Math.floor(num * (ind % 2 === 0 ? scaleX : scaleY))
              ),
            //points: node.points().map((num,ind) => num * (ind % 2 === 0 ? scaleX : scaleY)),
            //filtered: filtered.map(a => a * scaleX),
            // width: Math.max(50, node.width() * scaleX),
            // height: Math.max(50,node.height() * scaleY),
          });

          let newPoints = node.points();
          let newXofCircle = newPoints[4];
          console.log("newPoints :" + newPoints);
          console.log("newPoints :" + newXofCircle);
        }}
      />
      <Circle x={100} y={80} fill={"black"} radius={5} />

      {isSelected && (
        <>
          <Transformer
            borderStroke={"darkGreen"}
            borderDash={[10, 5]}
            borderStrokeWidth={5}
            anchorCornerRadius={5}
            anchorStrokeWidth={2}
            anchorSize={20}
            // rotateAnchorOffset={48}
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
export default Rectangle;
