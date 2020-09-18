import React from 'react';
import './Game.css';
import Piece from './Piece';
import { useRecoilValue } from 'recoil';
import { movingPieceState } from '../state';

function Moving() {
    const movingPieces = useRecoilValue(movingPieceState);


    return (
        <>
            {movingPieces.map(
                piece => (<Piece key={piece.id} piece={piece} />)
            )}
        </>
    )
}

export default Moving;