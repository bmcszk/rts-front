import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import createSagaMiddleware from "redux-saga"
import { rootReducer } from "./reducer"
import rootSaga from "./saga"

export function initStore() {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(rootReducer,
        composeWithDevTools(
            applyMiddleware(sagaMiddleware)
        )
    );

    sagaMiddleware.run(rootSaga);
    return store;
}