import { selector, selectorFamily } from "recoil";
import { Point } from "./model";
import { selectionEndState, selectionStartState } from "./state";

export const allSelectedPointsSelector = selector<Point[]>({
    key: "allSelectedPoints",
    get: ({ get }) => {
        const result = [] as Point[];
        const start = get(selectionStartState);
        const end = get(selectionEndState);
        if (!start || !end) {
            return result;
        }

        const nextY = nextFunction(start.point.y, end.point.y);
        const nextX = nextFunction(start.point.x, end.point.x);
        const betweenY = betweenFunction(start.point.y, end.point.y);
        const betweenX = betweenFunction(start.point.x, end.point.x);
        for (let y = start.point.y; betweenY(y); y = nextY(y)) {
            for (let x = start.point.x; betweenX(x); x = nextX(x)) {
                result.push({ x, y });
            }
        }
        return result;
    }
});

export const isSelectedSelector = selectorFamily<boolean, string | null>({
    key: "isSelected",
    get: (key) => ({ get }) => {
        if (!key) {
            return false;
        }
        const point = toPoint(key);
        const index = get(allSelectedPointsSelector).findIndex(p => point.x === p.x && point.y === p.y);
        return index >= 0;
    }
})

function betweenFunction(start: number, end: number) {
    if (start <= end) {
        return (x: number) => x >= start && x <= end;
    } else {
        return (x: number) => x <= start && x >= end;
    }
}

function nextFunction(start: number, end: number) {
    if (start <= end) {
        return (x: number) => x + 1;
    } else {
        return (x: number) => x - 1;
    }
}

function toPoint(str: string): Point {
    const array = str.split(",");
    return {
        x: parseInt(array[0]),
        y: parseInt(array[1])
    };
}