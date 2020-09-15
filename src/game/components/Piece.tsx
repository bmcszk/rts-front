import React, { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { PieceProps } from '../model';
import './Piece.css';

function Piece(props : PieceProps) {
    const piece = props.piece;
    const pieceName = piece
        ? piece.name
        : '';

    const selected = false; //useRecoilValue()
    //const selected = useSelector(state => state.map.selected.contains(piece.id));
    const cssClass = (piece && selected)
        ? "piece selected"
        : "piece";

    const handleClick = () => {
        //dispatch(touch(props.point));
    }

    const ref = useRef<HTMLButtonElement>(null);

    /* console.log(ref);
    if (ref.current) {
        const el = ref.current;
        const rect = el.getBoundingClientRect();
        console.log(rect.top, rect.right, rect.bottom, rect.left);
        el.style.position = "absolute";
        el.style.left = rect.left + 100 + "px";
        el.style.top = rect.top + 100 + "px";
    } */

    return (
        <button ref={ref} key={piece.id} className={cssClass} onClick={handleClick}>
            {pieceName}
        </button>
    );
}

export default Piece;