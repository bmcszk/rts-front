import { CommandMoveAction, CommandMoveSelectedAction, CommandStopAction, CommandStopSelectedAction, EnterAction, InitGameAction, MoveAction, PieceModel, PlaceAction, Point, SelectionEndAction, SelectionStartAction, StepAction } from "../model";

export const INIT = "INIT";
export const ENTER = "ENTER";
export const PLACE = "PLACE";
export const STEP_OUT = "STEP_OUT";
export const MOVE = "MOVE";
export const STEP_IN = "STEP_IN";
export const SELECTION_START = "SELECTION_START";
export const SELECTION_END = "SELECTION_END";

export const COMMAND_MOVE_SELECTED = "COMMAND_MOVE_SELECTED";
export const COMMAND_MOVE = "COMMAND_MOVE";
export const COMMAND_STOP_SELECTED = "COMMAND_STOP_SELECTED";
export const COMMAND_STOP = "COMMAND_STOP";

export const initGameAction = (width : number, height : number) : InitGameAction => {
    return {
        type: INIT,
        payload: { width, height }
    }
}

export const enterAction = (piece: PieceModel) : EnterAction => {
    return {
        type: ENTER,
        payload: { piece }
    }
}

export const placeAction = (id : string , dest: Point) : PlaceAction => {
    return {
        type: PLACE,
        payload: { id, dest }
    }
}

export const moveAction = (
        pieceId: string, src : Point, dest: Point) : MoveAction => {
    return {
        type: MOVE,
        payload: { pieceId, src, dest }
    }
}

export const stepAction = (
        type: typeof STEP_OUT | typeof STEP_IN, 
        piece: PieceModel, point : Point) : StepAction => {
    return {
        type: type,
        payload: { piece, point }
    }   
}

export const selectionStartAction = (point : Point) : SelectionStartAction => {
    return {
        type: SELECTION_START,
        payload: { point }
    }
}

export const selectionEndAction = (point : Point, shiftKey : boolean, ctrlKey : boolean, altKey : boolean) : SelectionEndAction => {
    return {
        type: SELECTION_END,
        payload: { point, shiftKey, ctrlKey, altKey }
    }
}


export const commandMoveSelectedAction = (dest : Point) : CommandMoveSelectedAction => {
    return {
        type: COMMAND_MOVE_SELECTED,
        payload: { dest: dest }
    }
}

export const commandMoveAction = (piece: PieceModel, dest : Point) : CommandMoveAction => {
    return {
        type: COMMAND_MOVE,
        payload: { piece, dest }
    }
}

export const commandStopSelectedAction = () : CommandStopSelectedAction => {
    return {
        type: COMMAND_STOP_SELECTED
    }
}

export const commandStopAction = (piece: PieceModel) : CommandStopAction => {
    return {
        type: COMMAND_STOP,
        payload: { piece }
    }
}
