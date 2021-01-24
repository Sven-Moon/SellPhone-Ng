import { state } from "@angular/animations";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Action, createReducer, on } from "@ngrx/store";
import { PhoneModel } from "src/app/models/PhoneModel";
import { StaticData } from "src/app/models/StaticData";
import { returnSearchResultsFailure, returnSearchResultsSuccess } from "../search/search.actions";
import { loadStaticDataFailure, loadStaticDataSuccess, updateSelectedPhoneType } from "./staticData.actions";

export const staticDataFeatureKey = "staticData";

export interface StaticDataState extends EntityState<StaticData> {
  error: any;
  selectedTypeId: number;
  phoneModelsList: Array<PhoneModel>
}

export const adapter: EntityAdapter<StaticData> = 
  createEntityAdapter<StaticData>();

export const initialState: StaticDataState =
  adapter.getInitialState({
    error: undefined,
    usaStates: [],
    phoneTypes: [],
    phoneModelsByType: [],
    selectedTypeId: -1,
    phoneModelsList: []
})

export const staticDataReducer = createReducer(
  initialState,
  // Load Data from DB
  on(loadStaticDataSuccess, (state,action) => {
    return {
      ...state,
      usaStates: action.staticData.usaStates,
      phoneTypes: action.staticData.phoneTypes,
      phoneModelsByType: action.staticData.phoneModelsByType
    }
  }),
  on(loadStaticDataFailure, (state,action) => 
    ({...state, error: action.error})
  ),
  on(updateSelectedPhoneType, (state,action) =>
    ({...state, selectedTypeId: action.selectedTypeId})
  ),
  // on(updatePhoneModelsList, (state,action) => {
  //   return state.phoneModelsList.map(state.selectedTypeId =>)
  // }) 
)


export function reducer(state: StaticDataState | undefined, action: Action) {
  return staticDataReducer(state, action);
}


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();