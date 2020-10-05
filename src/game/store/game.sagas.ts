import { all, takeLatest, select, put, takeEvery, delay, actionChannel } from "redux-saga/effects";
import { RootState } from "../../store/reducer";
import * as model from "../model";
import * as selectors from "./game.selectors";
import * as actions from "./game.actions"
import { ActionCreatorsMapObject } from "redux";
import { Map } from 'immutable';

export function* gameSaga() {
    //const moveChannel = yield actionChannel(COMMAND_MOVE)
    yield all([
        takeLatest(actions.INIT, initGameSaga),
        takeLatest(actions.TICK, tickSaga),
        takeLatest(actions.COMMAND_MOVE_SELECTED, commandMoveSelectedSaga),
        takeEvery(actions.COMMAND_MOVE, commandMovePieceSaga)
    ]);
}

function* initGameSaga(action : model.InitGameAction) {
    yield put(actions.tickAction());
}

function* tickSaga(action : model.InitGameAction) {
    const piecesInMotion : model.MotionModel[] = yield select(selectors.getCurrentMovement);
    
    for (let motion of piecesInMotion) {
        yield moveThePiece(motion);
    }

    yield delay(100);
    yield put(actions.tickAction());
}

function* moveThePiece(motion: model.MotionModel) {
    const valid = yield isDestinationValid(motion.dest) 
    if (valid) {
        yield put(actions.stepAction(actions.STEP_OUT, motion.piece, motion.src));
        yield put(actions.stepAction(actions.STEP_IN, motion.piece, motion.dest));
        if (motion.dest.x === motion.final.x && motion.dest.y === motion.final.y) {
            yield put(actions.commandStopAction(motion.piece));
        }
    } else {
        yield put(actions.commandStopAction(motion.piece));
        yield put(actions.commandMoveAction(motion.piece, motion.final));
    }
    
}
 
function* commandMoveSelectedSaga(action : model.CommandMoveSelectedAction) {
    const pieces: model.PieceModel[] = yield select(selectors.getSelectedPieces);
    yield all(pieces
        .map((piece: model.PieceModel) => put(actions.commandStopAction(piece))) );
    yield all(pieces
        .map((piece: model.PieceModel) => put(actions.commandMoveAction(piece, action.payload.dest))) );
}


function* commandMovePieceSaga(action : model.CommandMoveAction) {
    const {piece, dest} = action.payload;
    let src: model.Point = yield select(state => selectors.getPointByPiece(state, piece.id));
    let clock: number = yield select(state => state.game.clock);
    //movementService.getPlan
    let plan : Map<number, model.Point> = Map();
    plan = plan.set(clock, src);
    while (src.x !== dest.x || src.y !== dest.y) {
        const vector = {
            x: dest.x - src.x,
            y: dest.y - src.y
        }
        const stepVector = {
            x: vector.x === 0 ? 0 : vector.x / Math.abs(vector.x),
            y: vector.y === 0 ? 0 : vector.y / Math.abs(vector.y)
        }
        src = {
            x: src.x + stepVector.x,
            y: src.y + stepVector.y
        }
        let valid = yield isDestinationValid(src)
        plan = plan.set(++clock, src);
    }
    yield put(actions.planAction({
        piece,
        points: plan
    }));
}

function* isDestinationValid(dest : model.Point) {
    const key = dest.x + "," + dest.y;
    const piece = yield select(state => selectors.getPieceByPoint(state, key));
    return piece === null || piece === undefined;
} 