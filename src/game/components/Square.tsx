import React from 'react';
import './Square.css';
import Piece from './Piece'
import { useRecoilState, useRecoilValue } from 'recoil';
import { boardState, selectionState} from '../state';
import { SquareModel, SquareProps } from '../model';

function Square(props: SquareProps) {
    //const piece = useSelector(state => state.pieces.pieces.find(p => props.point.x === p.point.x && props.point.y === p.point.y));
    const squareKey = props.point.x + "," + props.point.y;
    const square = useRecoilValue<SquareModel>(boardState(squareKey));
    const [selection, setSelection] = useRecoilState(selectionState);
 
    const pieceComponent = square.occupied
        ? (<Piece piece={square.occupied} point={props.point} />)
        : null;


    const disableEvent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.shiftKey = false;
        e.preventDefault();
        e.stopPropagation();
        //return false;
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.button === 0) {
            setSelection({
                start: props.point
            })
        } else if (e.button === 2) {
            //dispatch(commandMoveSelected(props.point));
        }
        disableEvent(e);
    }

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.button === 0) {
            setSelection({
                ...selection,
                end: props.point,
                //shiftKey: e.shiftKey,
            })
            //dispatch(selectionEnd(props.point, e.shiftKey, e.ctrlKey, e.altKey));
        }
        disableEvent(e);
    }

    return (
        <div className="square"
                onContextMenu={disableEvent} 
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}>
            {pieceComponent}
        </div>
    );
}

export default Square;