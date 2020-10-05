import { Map } from 'immutable';
import * as model from "./model";

export function getPlan(clock: number, src: model.Point, dest: model.Point) : Map<number, model.Point>  {
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
        plan = plan.set(++clock, src);
    }
    return plan
}