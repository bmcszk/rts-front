import React from 'react';
import './Board.css';
import Square from './Square';
import { useSelector } from 'react-redux';
import { BoardProps, ConfigState, Point } from '../model'
import { RootState } from '../../store/reducer';

function Board(props: BoardProps) {
    const config = useSelector<RootState, ConfigState>(state => state.game.config);

    const renderSquare = (index: number, point: Point) => {
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
    for (let y = config.view.start.y; y <= config.view.end.y; y++) {
        let line = [];
        for (let x = config.view.start.x; x <= config.view.end.x; x++) {
            const point = { x, y };
            line.push(renderSquare(i++, point));
        }
        rows.push(<tr key={y} className="board-row">{line}</tr>);
    }

    return (
        <table className="map">
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}

export default Board;
