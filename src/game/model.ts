import { Map, Set } from 'immutable';
import { COMMAND_MOVE, COMMAND_MOVE_SELECTED, COMMAND_STOP, COMMAND_STOP_SELECTED, ENTER, INIT, MOVE, STEP_IN, STEP_OUT, PLACE, SELECTION_END, SELECTION_START } from './store/game.actions';
export interface GameState {
    config: ConfigState;
    board: Map<string, SquareModel>;
    piecesById: Map<string, PieceModel>;
    piecesByPoint: Map<string, PieceModel>;
    pointsByPiece: Map<string, Point>;
    //position: Map<string, string>;
    //movement: Map<string, MovementModel>;
    selected: Set<string>;
    selectionStart: Point | null;
}

export interface ConfigState {
    width: number;
    height: number;
}

export interface BoardProps {

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
}

export interface PieceModel {
    id: string;
    name: string;
}

export interface MovementModel {
    id: string;
    from: Point;
    to: Point;
}

export interface SelectionState {
    point: Point;
    shiftKey: boolean;
}

export interface SelectedState {
    pieces: PieceModel[];
}

export interface PieceProps {
    piece: PieceModel;
}

export interface InitGameAction {
    type: typeof INIT;
    payload: {
        width: number;
        height: number;
    }
}

export interface EnterAction {
    type: typeof ENTER;
    payload: {
        piece: PieceModel;
    }
}

export interface PlaceAction {
    type: typeof PLACE;
    payload: {
        id: string;
        dest: Point;
    }
}

export interface MoveAction {
    type: typeof MOVE;
    payload: {
        pieceId: string;
        src: Point;
        dest: Point;
    }
}


export interface StepAction {
    type: typeof STEP_OUT | typeof STEP_IN;
    payload: {
        piece: PieceModel;
        point: Point;
    }
}

export interface SelectionStartAction {
    type: typeof SELECTION_START;
    payload: {
        point: Point;
    }
}

export interface SelectionEndAction {
    type: typeof SELECTION_END;
    payload: {
        point: Point;
        shiftKey: boolean;
        ctrlKey: boolean;
        altKey: boolean;
    }
}

export interface CommandMoveSelectedAction {
    type: typeof COMMAND_MOVE_SELECTED;
    payload: {
        dest: Point;
    }
}

export interface CommandMoveAction {
    type: typeof COMMAND_MOVE;
    payload: {
        piece: PieceModel;
        dest: Point;
    }
}

export interface CommandStopSelectedAction {
    type: typeof COMMAND_STOP_SELECTED;
}

export interface CommandStopAction {
    type: typeof COMMAND_STOP;
    payload: {
        piece: PieceModel;
    }
}

export type GameAction = InitGameAction
    | EnterAction
    | PlaceAction
    | MoveAction
    | StepAction
    | SelectionStartAction
    | SelectionEndAction
    | CommandMoveSelectedAction
    | CommandMoveAction
    | CommandStopSelectedAction
    | CommandStopAction;