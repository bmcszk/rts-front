import { createSelector } from 'reselect'
import { RootState } from '../../store/reducer';
import { PlannedMovementModel, PieceModel, Point, MotionModel } from '../model';
import { Map } from 'immutable';

export const getSelected = (state : RootState) => state.game.selected;
export const getSelectedArray = createSelector([getSelected], selected => selected.toArray());
export const getPiecesByIdMap = (state : RootState) : Map<string, PieceModel> => state.game.piecesById;
export const getPiecesByPointMap = (state : RootState) : Map<string, PieceModel> => state.game.piecesByPoint;
export const getPieceByPoint = (state : RootState, pointId : string) : PieceModel | undefined => getPiecesByPointMap(state).get(pointId);

export const getPointsByPieceMap = (state : RootState) : Map<string, Point> => state.game.pointsByPiece;
export const getPointByPiece = (state : RootState, pieceId : string) : Point | undefined => getPointsByPieceMap(state).get(pieceId);

export const getSelectedPieces = createSelector([getSelectedArray, getPiecesByIdMap], 
    (selected, piecesByIdMap) => {
        return selected.map(pieceId => piecesByIdMap.get(pieceId))
    });


export const getClock = (state: RootState) : number => state.game.clock;
export const getMovement = (state: RootState) : Map<string, PlannedMovementModel> => state.game.movement;
export const getCurrentMovement = createSelector([getClock, getMovement, getPointsByPieceMap],
    (clock, movement, pointsByPieceMap) => {
        let result : MotionModel[] = [];
        movement.forEach((v, k) => {
            const src: Point | undefined = pointsByPieceMap.get(v.piece.id);
            const dest : Point | undefined = v.points.get(clock);
            const final : Point | undefined = v.points.last();
            if (src && dest && final) {
                result.push({ piece: v.piece, src, dest, final, retries: v.retries });
            }
        })
        return result;
    });