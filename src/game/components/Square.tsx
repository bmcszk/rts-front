import React from 'react';
import './Square.css';
import { useSelector, useDispatch } from 'react-redux';
import { commandMoveSelectedAction, selectionStartAction, selectionEndAction, mapLoadRequestAction } from '../store/game.actions'
import Piece from './Piece'
import { PieceModel, SquareModel, SquareProps } from '../model';
import { RootState } from '../../store/reducer';

function Square(props : SquareProps) {
    const squareKey = props.point.x + "," + props.point.y;
    const square = useSelector<RootState, SquareModel | undefined>(state => state.game.board.get(squareKey));
    const piece = useSelector<RootState, PieceModel | undefined>(state => state.game.piecesByPoint.get(squareKey));
    const pieceComponent = piece
        ? (<Piece piece={piece} />)
        : null;

    const dispatch = useDispatch()

    const disableEvent = (e : React.MouseEvent) => {
        e.shiftKey = false;
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    const handleMouseDown = (e : React.MouseEvent) => {
        if (e.button === 0) {
            dispatch(selectionStartAction(props.point));
        } else if (e.button === 2) {
            dispatch(commandMoveSelectedAction(props.point));
        }
        return disableEvent(e);
    }

    const handleMouseUp = (e: React.MouseEvent) => {
        if (e.button === 0) {
            dispatch(selectionEndAction(props.point, e.shiftKey, e.ctrlKey, e.altKey));
        }
        return disableEvent(e);
    }

    const handleDoubleClick = (e: React.MouseEvent) => {
        if (e.button === 0) {
            dispatch(mapLoadRequestAction(props.point));
        }
        return disableEvent(e);
    }

    return (
        <td className={square?.backStyleClass ?? ""}>
        <div className={`tile ${square?.frontStyleClass}`}
                onContextMenu={disableEvent} 
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onDoubleClick={handleDoubleClick}>
            {pieceComponent}
        </div>
        </td>
    );
}

export default Square;
