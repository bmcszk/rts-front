import { Map, Set } from 'immutable';
import * as actions from './store/game.actions';
export interface GameState {
    clock: number;
    config: ConfigState;
    board: Map<string, SquareModel>;
    piecesById: Map<string, PieceModel>;
    piecesByPoint: Map<string, PieceModel>;
    pointsByPiece: Map<string, Point>;
    //position: Map<string, string>;
    movement: Map<string, PlannedMovementModel>;
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

export interface PlannedMovementModel {
    piece: PieceModel;
    points: Map<number, Point>;
}

export interface MotionModel {
    piece: PieceModel;
    src: Point;
    dest: Point;
    final: Point;
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
    type: typeof actions.INIT;
    payload: {
        width: number;
        height: number;
    }
}

export interface EnterAction {
    type: typeof actions.ENTER;
    payload: {
        piece: PieceModel;
    }
}

export interface PlaceAction {
    type: typeof actions.PLACE;
    payload: {
        id: string;
        dest: Point;
    }
}

export interface MoveAction {
    type: typeof actions.MOVE;
    payload: {
        pieceId: string;
        src: Point;
        dest: Point;
    }
}


export interface StepAction {
    type: typeof actions.STEP_OUT | typeof actions.STEP_IN;
    payload: {
        piece: PieceModel;
        point: Point;
    }
}

export interface SelectionStartAction {
    type: typeof actions.SELECTION_START;
    payload: {
        point: Point;
    }
}

export interface SelectionEndAction {
    type: typeof actions.SELECTION_END;
    payload: {
        point: Point;
        shiftKey: boolean;
        ctrlKey: boolean;
        altKey: boolean;
    }
}

export interface CommandMoveSelectedAction {
    type: typeof actions.COMMAND_MOVE_SELECTED;
    payload: {
        dest: Point;
    }
}

export interface CommandMoveAction {
    type: typeof actions.COMMAND_MOVE;
    payload: {
        piece: PieceModel;
        dest: Point;
    }
}

export interface CommandStopSelectedAction {
    type: typeof actions.COMMAND_STOP_SELECTED;
}

export interface CommandStopAction {
    type: typeof actions.COMMAND_STOP;
    payload: {
        piece: PieceModel;
    }
}

export interface TickAction {
    type: typeof actions.TICK;
}
export interface PlanAction {
    type: typeof actions.PLAN;
    payload: PlannedMovementModel;
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
    | CommandStopAction
    | TickAction
    | PlanAction;
