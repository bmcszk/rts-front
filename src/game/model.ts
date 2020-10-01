export const COMMAND_TYPE_ATTACK = 'attack';
export const COMMAND_TYPE_MOVE = 'move';

export interface ConfigState {
    width: number;
    height: number;
}

export interface Point {
    x: number;
    y: number;
}

export interface SquareProps {
    index: number;
    point: Point;
}

export interface SquareModel {
    point: Point;
    reserved?: Piece;
    occupied?: Piece;
}

export interface Piece {
    id: number;
    name: string;
    selected: boolean;
    floaty: boolean;
}

export interface SelectionState {
    point: Point;
    shiftKey: boolean;
}

export interface SelectedState {
    pieces: Piece[];
}

export interface PieceProps {
    point?: Point;
    piece: Piece;
}

export interface CommandState {
    command: typeof COMMAND_TYPE_ATTACK | typeof COMMAND_TYPE_MOVE;
    point?: Point;
}