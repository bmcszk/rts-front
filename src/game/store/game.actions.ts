import * as model from "../model";

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

export const TICK = "TICK";
export const PLAN = "PLAN";

export const initGameAction = (width : number, height : number) : model.InitGameAction => {
    return {
        type: INIT,
        payload: { width, height }
    }
}

export const enterAction = (piece: model.PieceModel) : model.EnterAction => {
    return {
        type: ENTER,
        payload: { piece }
    }
}

export const placeAction = (id : string , dest: model.Point) : model.PlaceAction => {
    return {
        type: PLACE,
        payload: { id, dest }
    }
}

export const moveAction = (
        pieceId: string, src : model.Point, dest: model.Point) : model.MoveAction => {
    return {
        type: MOVE,
        payload: { pieceId, src, dest }
    }
}

export const stepAction = (
        type: typeof STEP_OUT | typeof STEP_IN, 
        piece: model.PieceModel, point : model.Point) : model.StepAction => {
    return {
        type: type,
        payload: { piece, point }
    }   
}

export const selectionStartAction = (point : model.Point) : model.SelectionStartAction => {
    return {
        type: SELECTION_START,
        payload: { point }
    }
}

export const selectionEndAction = (point : model.Point, shiftKey : boolean, ctrlKey : boolean, altKey : boolean) : model.SelectionEndAction => {
    return {
        type: SELECTION_END,
        payload: { point, shiftKey, ctrlKey, altKey }
    }
}


export const commandMoveSelectedAction = (dest : model.Point) : model.CommandMoveSelectedAction => {
    return {
        type: COMMAND_MOVE_SELECTED,
        payload: { dest: dest }
    }
}

export const commandMoveAction = (piece: model.PieceModel, dest : model.Point, retries: number) : model.CommandMoveAction => {
    return {
        type: COMMAND_MOVE,
        payload: { piece, dest, retries }
    }
}

export const commandStopSelectedAction = () : model.CommandStopSelectedAction => {
    return {
        type: COMMAND_STOP_SELECTED
    }
}

export const commandStopAction = (piece: model.PieceModel) : model.CommandStopAction => {
    return {
        type: COMMAND_STOP,
        payload: { piece }
    }
}

export const tickAction = () : model.TickAction => {
    return {
        type: TICK
    }
}

export const planAction = (movement : model.PlannedMovementModel) : model.PlanAction => {
    return {
        type: PLAN,
        payload: movement
    }
}
