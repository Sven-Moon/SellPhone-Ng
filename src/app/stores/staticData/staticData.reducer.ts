import { Action, createReducer, on } from "@ngrx/store";
import { PhoneModel } from "src/app/models/PhoneModel";
import { StaticData } from "src/app/models/StaticData";
import { loadStaticDataFailure, loadStaticDataSuccess, updatePhoneModelsList, } from "./staticData.actions";

export const staticDataFeatureKey = "staticData";

export interface StaticDataState extends StaticData {
  error: any;
  phoneModelsList: Array<PhoneModel>
}

export const initialState: StaticDataState =
  {
    error: undefined,
    usaStates: [],
    phoneTypes: [],
    phoneModelsByType: [],
    phoneModelsList: [],
    conditions: []
}

export const staticDataReducer = createReducer(
  initialState,
  // Load StaticData from DB
  on(loadStaticDataSuccess, (state,action) => {
    return {
      ...state,
      usaStates: action.staticData.usaStates,
      phoneTypes: action.staticData.phoneTypes,
      phoneModelsByType: action.staticData.phoneModelsByType,
      conditions: action.staticData.conditions
    }
  }),
  on(loadStaticDataFailure, (state,action) =>
    ({...state, error: action.error})
  ),
  on(updatePhoneModelsList, (state,action) => {
    for (var i in state.phoneModelsByType) {
      if (state.phoneModelsByType[i].typeId == action.typeId) {
        return {
          ...state,
          phoneModelsList: state.phoneModelsByType[i].phoneModels
        }            }        }
  })
)

export function reducer(state: StaticDataState | undefined, action: Action) {
  return staticDataReducer(state, action);
}
