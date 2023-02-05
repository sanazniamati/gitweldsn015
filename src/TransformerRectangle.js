import React, { useEffect, useRef } from "react";
import { Line, Transformer } from "react-konva";

function TransformerRectangle({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  color,
  selectShape,
}) {
  const shapeRef = useRef();
  const trRef = useRef();
  const shapeId = shapeProps.id;

  useEffect(() => {
    // const oldNodes = trRef.current.nodes();
    // let selectedNodes;
    // if (isSelected) {
    //   // add current node to Transformer's nodes
    //   const newNodes = oldNodes.concat(shapeRef.current);
    //   selectedNodes = trRef.current.nodes(newNodes);
    // } else {
    //   // remove current node from Transformer's nodes
    //   const newNodes = oldNodes.filter((node) => node.id() !== shapeId);
    //   selectedNodes = trRef.current.nodes(newNodes);
    // }
    // selectedNodes.getLayer().batchDraw();
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
  const onClick = (e) => {
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey;

    let newIds = [];

    if (!metaPressed && isSelected) {
      // do nothing if node is selected and no key pressed
      return;
    }

    if (!metaPressed && !isSelected) {
      // if no key pressed and the node is not selected
      newIds = [shapeId];
    } else if (metaPressed && isSelected) {
      // if we pressed keys and node was selected
      // we need to remove it from selection
      newIds = selectShape.filter((i) => i !== shapeId);
    } else if (metaPressed && !isSelected) {
      // add the node into selection
      newIds = selectShape.concat(shapeId);
    }

    onSelect(newIds);
  };
  return (
    <React.Fragment>
      <Line
        ref={shapeRef}
        points={[50, 50, 150, 50, 100, 150]}
        tension={0.5}
        fill={color}
        opacity={0.4}
        // onClick={onSelect}
        onClick={onClick}
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

      {shapeId && (
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
export default TransformerRectangle;
