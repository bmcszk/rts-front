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
    start?: Point;
    end?: Point;
}

export interface PieceProps {
    point: Point;
    piece: Piece;
}