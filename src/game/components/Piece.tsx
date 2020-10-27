import React/* , { useRef } */ from 'react';
import './Piece.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import { PieceProps } from '../model';

function Piece({piece} : PieceProps) {
    //const piece = useSelector<RootState, PieceModel>(state => state.game.piecesById.get(props.pieceId)!);

    const selected = useSelector<RootState, boolean>(state => state.game.selected.contains(piece.id));
    const cssClass = (piece && selected)
        ? "piece selected"
        : "piece";

    // const dispatch = useDispatch()
    // const handleClick = () => {
    //     dispatch(touch(props.point));
    // }

    // const ref = useRef();

    return (
        <button /* ref={ref} */ key={piece.id} className={cssClass} >
            {piece.name}
        </button>
    );
}

export default Piece;
