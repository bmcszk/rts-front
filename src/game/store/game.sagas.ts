import { all, takeLatest, select, put, takeEvery, delay } from "redux-saga/effects";
import * as model from "../model";
import * as selectors from "./game.selectors";
import * as actions from "./game.actions"
import { Map } from 'immutable';
import { getPlan } from "../movement.service";

const RETRIES : number = 3;

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
        if (motion.retries > 0) {
            yield put(actions.commandMoveAction(motion.piece, motion.final, motion.retries - 1));
        }
    }
    
}
 
function* commandMoveSelectedSaga(action : model.CommandMoveSelectedAction) {
    const pieces: model.PieceModel[] = yield select(selectors.getSelectedPieces);
    yield all(pieces
        .map((piece: model.PieceModel) => put(actions.commandStopAction(piece))) );
    yield all(pieces
        .map((piece: model.PieceModel) => put(actions.commandMoveAction(piece, action.payload.dest, RETRIES))) );
}


function* commandMovePieceSaga(action : model.CommandMoveAction) {
    const {piece, dest} = action.payload;
    let src: model.Point = yield select(state => selectors.getPointByPiece(state, piece.id));
    let clock: number = yield select(state => state.game.clock);
    //movementService.getPlan
    const plan : Map<number, model.Point> = getPlan(clock, src, dest);
    yield put(actions.planAction({
        piece,
        points: plan,
        retries: action.payload.retries
    }));
}

function* isDestinationValid(dest : model.Point) {
    const piece = yield select(state => selectors.getPieceByPoint(state, new model.PointImpl(dest).toString()));
    return piece === null || piece === undefined;
} 