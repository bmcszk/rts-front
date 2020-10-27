import React from 'react';
import './Board.css';
import Square from './Square';
import { useSelector } from 'react-redux';
import { BoardProps, ConfigState, Point } from '../model'
import { RootState } from '../../store/reducer';

function Board(props : BoardProps) {
    const config = useSelector<RootState, ConfigState>(state => state.game.config);

    const renderSquare = (index : number, point : Point) => {
        return (
            <Square
                key={index}
                index={index}
                point={point}
            />
        );
    };

    let rows = [];
    let i = 0;
    for (let y = 0; y < config.height; y++) {
        let line = [];
        for(let x = 0; x < config.width; x++) {
            const point = {x, y };
            line.push(renderSquare(i++, point));
        }
        rows.push(<div key={y} className="board-row">{line}</div>);
    }

    return (
        <div>
            {rows}
        </div>
    );
}

export default Board;
