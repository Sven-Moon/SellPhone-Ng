import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Action, createReducer, on } from "@ngrx/store";
import { StaticData } from "src/app/models/StaticData";
import { returnSearchResultsFailure, returnSearchResultsSuccess } from "../search/search.actions";
import { loadStaticDataFailure, loadStaticDataSuccess } from "./staticData.actions";

export const staticDataFeatureKey = "staticData";

export interface StaticDataState extends EntityState<StaticData> {
  error: any;
}

export const adapter: EntityAdapter<StaticData> = 
  createEntityAdapter<StaticData>();

export const initialState: StaticDataState =
  adapter.getInitialState({
    error: undefined,
    usaStates: [],
    phoneTypes: [],
    phoneModelsByType: []
})

export const staticDataReducer = createReducer(
  initialState,
  on(loadStaticDataSuccess, (state,action) => {
    return {
      ...state,
      staticData: action.staticData
    }
  }),
  on(loadStaticDataFailure, (state,action) => 
    ({...state, error: action.error})
  )
)

// state type should probably be StaticDataState
export function reducer(state: StaticDataState | undefined, action: Action) {
  return staticDataReducer(state, action);
}


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();