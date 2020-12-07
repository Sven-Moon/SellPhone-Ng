import { Action } from '@ngrx/store';
import { StaticData } from '../models/StaticData';

export type StaticDataState = StaticData;

const initialState = undefined;

export const LOAD_STATIC_DATA = 'LOAD_STATIC_DATA';

export class LoadStaticDataAction implements Action {
  readonly type = LOAD_STATIC_DATA;
  payload: StaticData;
}

// Reducer
export function staticData(_,action:LoadStaticDataAction): StaticDataState {
  return action.payload;
}
