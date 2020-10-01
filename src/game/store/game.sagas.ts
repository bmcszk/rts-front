import { all, takeLatest, select, put, takeEvery, delay, actionChannel } from "redux-saga/effects";
import { RootState } from "../../store/reducer";
import { CommandMoveAction, CommandMoveSelectedAction, PieceModel, Point } from "../model";
import { getSelectedPieces } from "./game.selectors";
import { COMMAND_MOVE_SELECTED, COMMAND_MOVE, commandMoveAction, moveAction, stepAction, STEP_OUT, STEP_IN, commandStopAction } from "./game.actions"

export function* gameSaga() {
    //const moveChannel = yield actionChannel(COMMAND_MOVE)
    yield all([
        takeLatest(COMMAND_MOVE_SELECTED, moveSelectedSaga),
        takeEvery(COMMAND_MOVE, movePieceSaga)
    ]);
}
 
function* moveSelectedSaga(action : CommandMoveSelectedAction) {
    const pieces: PieceModel[] = yield select(getSelectedPieces);
    yield all(pieces
        .map((piece: PieceModel) => put(commandStopAction(piece))) );
    yield all(pieces
        .map((piece: PieceModel) => put(commandMoveAction(piece, action.payload.dest))) );
}


function* movePieceSaga(action : CommandMoveAction) {
    const {piece, dest} = action.payload;
    const src: Point = yield select(state => state.game.pointsByPiece.get(piece.id));
    yield put(stepAction(STEP_OUT, piece, src));

    
    const vector = {
        x: dest.x - src.x,
        y: dest.y - src.y
    }
    const stepVector = {
        x: vector.x === 0 ? 0 : vector.x / Math.abs(vector.x),
        y: vector.y === 0 ? 0 : vector.y / Math.abs(vector.y)
    }
    const step = {
        x: src.x + stepVector.x,
        y: src.y + stepVector.y
    }
    let valid = yield isDestinationValid(step)
    // for (let i = 0; i < 10 && !valid; i++) {
    //     yield delay(100)
    //     valid = yield isDestinationValid(step)
    // }
    if (valid) {
        // yield delay(50)
        yield put(stepAction(STEP_IN, piece, step))
        if (step.x !== dest.x || step.y !== dest.y) {
            yield delay(200)
            yield put(commandMoveAction(piece, dest))
        }
    } else {
        yield put(stepAction(STEP_IN, piece, src))
        if (step.x !== dest.x || step.y !== dest.y) {
            yield delay(200)
            yield put(commandMoveAction(piece, dest))
        }
    }
}

function* isDestinationValid(dest : Point) {
    const key = dest.x + "," + dest.y;
    const piece = yield select(state => state.game.piecesByPoint.get(key));
    return piece === null || piece === undefined;
} 