import { MapResponse } from "../model";

export async function getMap(x: number, y: number, width: number, height: number): Promise<MapResponse> {
    return fetch(`http://localhost:8080/api/map?x=${x}&y=${y}&width=${width}&height=${height}`)
        .then(response => response.json() as Promise<MapResponse>);
}