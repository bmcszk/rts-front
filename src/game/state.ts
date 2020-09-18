import { atom, atomFamily } from "recoil";
import { ConfigState, Piece, Point, SelectionState, SquareModel } from "./model";

export const configState = atom<ConfigState>({
  key: 'config',
  default: {
    width: 0,
    height: 0
  }
})

export const boardState = atomFamily<SquareModel, string>({
  key: 'board',
  default: (key) => ({
    point: toPoint(key)
  })
})

export const pieceState = atomFamily<Piece, number>({
  key: 'pieces',
  default: (id) => ({
    id: id,
    name: "",
    selected: false,
    floaty: false
  })
})

export const selectionStartState = atom<SelectionState | null>({
  key: 'selectionStart',
  default: null
})

export const selectionEndState = atom<SelectionState | null>({
  key: 'selectionEnd',
  default: null
})

export const selectedState = atom<Piece[]>({
  key: 'selected',
  default: []
})

export const movingPieceState = atom<Piece[]>({
  key: 'moving',
  default: []
})

function toPoint(str: string): Point {
  const array = str.split(",");
  return {
    x: parseInt(array[0]),
    y: parseInt(array[1])
  }
}