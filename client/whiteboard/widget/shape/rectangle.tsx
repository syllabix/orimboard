import { KonvaEventObject } from 'konva/lib/Node';
import { Rect as IRect } from 'konva/lib/shapes/Rect';
import { Transformer as ITransformer } from 'konva/lib/shapes/Transformer';
import React, { LegacyRef, useEffect, useRef } from 'react';
import { Rect, Transformer } from 'react-konva';
import { WidgetActions, WidgetData } from 'whiteboard/widget';



export const Rectangle: React.FC<WidgetData & WidgetActions> = ({ selected, onSelect, onChange, ...props }) => {
    const trRef: LegacyRef<ITransformer> = useRef(null);
    const shapeRef: LegacyRef<IRect> = useRef(null);

    useEffect(() => {
        if (selected && trRef.current && shapeRef.current) {
            // we need to attach transformer manually
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer()?.batchDraw();
        }
    }, [selected]);

    return (
        <>
            <Rect
                onTap={() => onSelect(props.id)}
                onClick={() => onSelect(props.id)}
                ref={shapeRef}
                {...props}
                onDragMove={(e) => {
                    onChange({
                        ...props,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onTransformEnd={(e: KonvaEventObject<Event>) => {
                    // transformer is changing scale of the node
                    // and NOT its width or height
                    // but in the store we have only width and height
                    // to match the data better we will reset scale on transform end
                    if (shapeRef.current == null) return;
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    // we will reset it back
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...props,
                        x: node.x(),
                        y: node.y(),
                        // set minimal value
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(node.height() * scaleY),
                    });
                }}
            />
            {selected && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        // limit resize
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </>
    );
};