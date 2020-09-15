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

export const selectionState = atom<SelectionState>({
  key: 'selection',
  default: {
    start: undefined,
    end: undefined
  }
})

function toPoint(str: string) : Point {
  const array = str.split(",");
  return { 
    x: parseInt(array[0]),
    y: parseInt(array[1])
  }
}