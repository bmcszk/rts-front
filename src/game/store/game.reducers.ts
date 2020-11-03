import { ConfigState, GameAction, GameState, Point, PointImpl, ViewModel } from "../model";
import { Map, Set } from 'immutable';
import { COMMAND_STOP, ENTER, INIT, MAP_LOAD_REQUEST, MAP_LOAD_RESPONSE_SUCCESS, PLAN, SELECTION_END, SELECTION_START, STEP_IN, STEP_OUT, TICK } from "./game.actions";

const initialState = (): GameState => {
    return {
        clock: 0,
        config: {
            width: 0,
            height: 0
        },
        view: {
            center: { x: 0, y: 0 },
            start: { x: 0, y: 0 },
            end: { x: 0, y: 0 }
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

export function gameReducer(state: GameState = initialState(), action: GameAction): GameState {
    switch (action.type) {
        case INIT: {
            let config = { ...state.config };
            config.width = action.payload.width;
            config.height = action.payload.height;
            return { ...state, config, view: createView(action.payload.center, config) };
        }
        case MAP_LOAD_REQUEST: {
            return {...state, view: createView(action.payload, state.config)}
        }
        case MAP_LOAD_RESPONSE_SUCCESS: {
            const board = state.board.withMutations(
                map => {
                    for (let i = 0; i < action.payload.rows.length; i++) {
                        const row = action.payload.rows[i];
                        for (let j = 0; j < row.length; j++) {
                            const square = row[j];
                            const key = new PointImpl(square.point).toString();
                            map = map.set(key, square)
                        }
                    }  
                }
            )
            return { ...state, board }
        }
        case TICK: {
            return { ...state, clock: state.clock + 1 };
        }
        case ENTER: {
            let piecesById = state.piecesById;
            const piece = action.payload.piece
            piecesById = piecesById.set(piece.id, piece);
            return { ...state, piecesById };
        }
        case PLAN: {
            const piece = action.payload.piece;
            return { ...state, movement: state.movement.set(piece.id, action.payload) };
        }
        case COMMAND_STOP: {
            const piece = action.payload.piece;
            return { ...state, movement: state.movement.remove(piece.id) }
        }
        case STEP_OUT: {
            let piecesByPoint = state.piecesByPoint;
            let pointsByPiece = state.pointsByPiece;
            const pointId = new PointImpl(action.payload.point).toString();
            piecesByPoint = piecesByPoint.remove(pointId);
            pointsByPiece = pointsByPiece.remove(action.payload.piece.id);
            return { ...state, piecesByPoint, pointsByPiece };
        }
        case STEP_IN: {
            let piecesByPoint = state.piecesByPoint;
            let pointsByPiece = state.pointsByPiece;
            const point = action.payload.point;
            const pointId = new PointImpl(point).toString();
            const piece = action.payload.piece;
            piecesByPoint = piecesByPoint.set(pointId, piece);
            pointsByPiece = pointsByPiece.set(piece.id, point);
            return { ...state, piecesByPoint, pointsByPiece };
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

function createView(center : Point, config : ConfigState) : ViewModel {
    // TODO from config?
    const width = Math.floor(window.innerWidth / 16);
    const height = Math.floor(window.innerHeight / 16);
    const halfWidth = Math.floor(width / 2);
    const halfHeight = Math.floor(height / 2);
    return {
        center: center,
        start: {
            x: center.x - halfWidth,
            y: center.y - halfHeight
        },
        end: {
            x: center.x + halfWidth,
            y: center.y + halfHeight
        }
    } 
}


function selectBox(state: GameState, end: Point, shiftKey: boolean) {
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

function getAllPointsInRange(start: Point, end: Point): string[] {
    const result: string[] = [];

    const xmin = Math.min(start.x, end.x);
    const xmax = Math.max(start.x, end.x);
    const ymin = Math.min(start.y, end.y);
    const ymax = Math.max(start.y, end.y);

    for (let y = ymin; y <= ymax; y++) {
        for (let x = xmin; x <= xmax; x++) {
            result.push(x + "," + y);
        }
    }
    return result;
}
