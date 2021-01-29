import { state } from "@angular/animations";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Action, createReducer, on } from "@ngrx/store";
import { PhoneModel } from "src/app/models/PhoneModel";
import { StaticData } from "src/app/models/StaticData";
import { returnSearchResultsFailure, returnSearchResultsSuccess } from "../search/search.actions";
import { loadStaticDataFailure, loadStaticDataSuccess, updatePhoneModelsList, } from "./staticData.actions";

export const staticDataFeatureKey = "staticData";

export interface StaticDataState extends StaticData {
  error: any;
  selectedTypeId: number;
  phoneModelsList: Array<PhoneModel>
}

// export const adapter: EntityAdapter<StaticData> = 
//   createEntityAdapter<StaticData>();

export const initialState: StaticDataState =
  {
    error: undefined,
    usaStates: [],
    phoneTypes: [],
    phoneModelsByType: [],
    selectedTypeId: -1,
    phoneModelsList: []
}

export const staticDataReducer = createReducer(
  initialState,
  // Load StaticData from DB
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
  on(updatePhoneModelsList, (state,action) => {
    for (var i in state.phoneModelsByType) {
      if (state.phoneModelsByType[i].typeId == action.typeId) {
        return {
          ...state,
          phoneModelsList: state.phoneModelsByType[i].phoneModels 
        } 
      }
    }
  })
    // state.phoneModelsList = state.phoneModelsByType.filter((type) => {
    //   if (type.typeId == action.typeId) {
    //     return {
    //       ...state,
    //       phoneModelsList: type.phoneModels // phoneModel[]
    //     }
    //   }
    // });
  // ))  
)


export function reducer(state: StaticDataState | undefined, action: Action) {
  return staticDataReducer(state, action);
}