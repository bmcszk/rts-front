import { createSelector } from 'reselect'
import { RootState } from '../../store/reducer';

const getSelected = (state : RootState) => state.game.selected;
const getSelectedArray = createSelector([getSelected], selected => selected.toArray());
const getPiecesByIdMap = (state : RootState) => state.game.piecesById;

export const getSelectedPieces = createSelector([getSelectedArray, getPiecesByIdMap], 
    (selected, piecesByIdMap) => {
        return selected.map(pieceId => piecesByIdMap.get(pieceId))
    });


