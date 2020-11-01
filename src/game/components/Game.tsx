import React, { useEffect } from 'react';
import './Game.css';
import Board from './Board';
import { useDispatch } from 'react-redux';
import { enterAction, initGameAction, stepAction, STEP_IN } from '../store/game.actions';

function Game() {
    const dispatch = useDispatch();
    useEffect(() => {
        const width = Math.floor(window.innerWidth / 16);
        const height = Math.floor(window.innerHeight / 16);


        dispatch(initGameAction(width, height));

        const A = {
            id: "1", name: "A"
        };

        const B = {
            id: "2", name: "B"
        }

        const C = {
            id: "3", name: "C"
        };

        dispatch(enterAction(A));
        dispatch(enterAction(B));
        dispatch(enterAction(C));

        dispatch(stepAction(STEP_IN, A, { x: 1, y: 1 }));
        dispatch(stepAction(STEP_IN, B, { x: 1, y: 2 }));
        dispatch(stepAction(STEP_IN, C, { x: 1, y: 3 }));
    }, [dispatch]);

    //const floatyPieces = useSelector<RootState, Map<string, MovementModel>>(state => state.game.movement)

    return (
        <div className="game">
            {/* <div className="game-board"> */}
                <Board />
                {/* {floatyPieces.map((v, k) => {
                    return (<Piece key={v.id} pieceId={v.id} />);
                })} */}
            {/* </div> */}
        </div>
    );
}

export default Game;