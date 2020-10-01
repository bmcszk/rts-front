import { all } from "redux-saga/effects";
import { gameSaga } from "../game/store/game.sagas";

export default function* rootSaga() {
    yield all([
        gameSaga()
    ])
}