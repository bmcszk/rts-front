import React, { useEffect } from 'react';
import './Game.css';
import Board from './Board';
import Piece from './Piece';
import { useSetRecoilState } from 'recoil';
import { boardState, configState } from '../state';

function Game() {
    const setConfig = useSetRecoilState(configState);
    const setSquare1 = useSetRecoilState(boardState("1,1"));
    const setSquare2 = useSetRecoilState(boardState("2,2"));
    const setSquare3 = useSetRecoilState(boardState("3,3"));

    setConfig({
        width: 8,
        height: 8
    });

    setSquare1(s => ({
        ...s,
        occupied: {
            id: 1,
            name: "Q",
            floaty: false,
            selected: false
        }
    }));

    setSquare2(s => ({
        ...s,
        occupied: {
            id: 2,
            name: "W",
            floaty: false,
            selected: false
        }
    }));

    setSquare3(s => ({
        ...s,
        occupied: {
            id: 3,
            name: "E",
            floaty: false,
            selected: false
        }
    }));

    return (
        <Board/>
    )
}

export default Game;