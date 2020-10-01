import { createSelector } from 'reselect'
import { RootState } from '../store/reducer';

const getSelected = (state : RootState) => state.game.selected;

export const isSelected = (state: RootState, pieceId: string) => createSelector(getSelected, (item) => item.includes(pieceId));

//const getAllPieces = (state: RootState) => state.game.pieces;
