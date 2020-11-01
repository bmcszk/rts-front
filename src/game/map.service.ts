import { MapResponse } from "./model"

export {}

export function aaa() {
    let response : MapResponse = {
        width: 100,
        height: 100,
        rows: [
            [
                {
                    backStyleClass: "",
                    frontStyleClass: "",
                    groundLevel: 0,
                    landType: "",
                    point: {
                        x: 0, 
                        y: 0
                    },
                    postGlacial:false,
                    value: undefined,
                    waterlevel: undefined
                }
            ]
        ]
    }
}