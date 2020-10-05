import { GameAction, GameState, Point } from "../model";
import { Map, Set } from 'immutable';
import { COMMAND_STOP, ENTER, INIT, PLAN, SELECTION_END, SELECTION_START, STEP_IN, STEP_OUT, TICK } from "./game.actions";

const initialState = () : GameState => {
    return {
        clock: 0,
        config: { 
            width: 0,
            height: 0
        },
        board: Map(),
        piecesById: Map(),
        piecesByPoint: Map(),
        pointsByPiece: Map(),
        movement: Map(),
        selectionStart: null,
        selected: Set()
    };
};

export function gameReducer(state : GameState = initialState(), action : GameAction) : GameState {
    switch (action.type) {
        case INIT: {
            let board = state.board;
            for(let x = 0; x < action.payload.width; x++) {
                for(let y = 0; y < action.payload.height; y++) {
                    const point = {x, y};
                    const key = toString(point);
                    board = board.set(key, { point, })
                }
            }
            return {...state, config: action.payload, board};
        }
        case TICK: {
            return { ...state, clock: state.clock + 1};
        }
        case ENTER: {
            let piecesById = state.piecesById;
            const piece = action.payload.piece
            piecesById = piecesById.set(piece.id, piece);
            return {...state, piecesById };
        }
        case PLAN: {
            const piece = action.payload.piece;
            return {...state, movement: state.movement.set(piece.id, action.payload) };
        }
        case COMMAND_STOP: {
            const piece = action.payload.piece;
            return {...state, movement: state.movement.remove(piece.id) }
        }
        case STEP_OUT: {
            let piecesByPoint = state.piecesByPoint;
            let pointsByPiece = state.pointsByPiece;
            const pointId = toString(action.payload.point);
            piecesByPoint = piecesByPoint.remove(pointId);
            pointsByPiece = pointsByPiece.remove(action.payload.piece.id);
            return {...state, piecesByPoint, pointsByPiece };
        }
        case STEP_IN: {
            let piecesByPoint = state.piecesByPoint;
            let pointsByPiece = state.pointsByPiece;
            const point = action.payload.point;
            const pointId = toString(point);
            const piece = action.payload.piece;
            piecesByPoint = piecesByPoint.set(pointId, piece);
            pointsByPiece = pointsByPiece.set(piece.id, point);
            return {...state, piecesByPoint, pointsByPiece };
        }
        case SELECTION_START: {
            const { point } = action.payload;
            return {
                ...state,
                selectionStart: point
            }
        }
        case SELECTION_END: {
            const { point, shiftKey } = action.payload;
            return {
                ...state,
                selectionStart: null,
                selected: selectBox(state, point, shiftKey)
            }
        }
        default:
            return state;
    }
}


function selectBox(state : GameState, end: Point, shiftKey: boolean) {
    let result = state.selected
    if (!state.selectionStart) {
        return result;
    }
    if (!shiftKey) {
        result = result.clear();
    }
    getAllPointsInRange(state.selectionStart, end)
        .map(pointId => state.piecesByPoint.get(pointId))
        .filter(piece => piece)
        .map(piece => piece!.id)
        .forEach(pieceId => {
            if (shiftKey && result.contains(pieceId)) {
                result = result.remove(pieceId);
            } else {
                result = result.add(pieceId)
            }
        });
    return result;
}

function getAllPointsInRange(start: Point, end: Point) : string[] {
    const result: string[] = [];

    const xmin = Math.min(start.x, end.x);
    const xmax = Math.max(start.x, end.x);
    const ymin = Math.min(start.y, end.y);
    const ymax = Math.max(start.y, end.y);

    for(let y = ymin; y <= ymax; y++) {
        for(let x = xmin; x <= xmax; x++) {
            result.push(x + "," + y);
        }
    }
    return result;
}

function toString(point : Point) {
    return point.x + "," + point.y;
}
