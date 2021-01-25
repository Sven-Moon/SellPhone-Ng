import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Action, createReducer, on } from "@ngrx/store";
import { PhoneModels } from "src/app/models/PhoneModels";
import { loadPhoneModelsByTypeFailure, loadPhoneModelsByTypeSuccess, updateSelectedPhoneType } from "./estimator.actions";

export const estimatorFeatureKey = "phoneModelsByType";

export interface PhoneModelsState extends EntityState<PhoneModels> {
  error: any;
  selectedTypeId: number;
  phoneModelsList: Array<PhoneModels>
}

export function selectPhoneTypeId(phoneModelsByType: PhoneModels): number {
  return phoneModelsByType.typeId;
}

export const adapter: EntityAdapter<PhoneModels> = 
  createEntityAdapter<PhoneModels>({
    selectId: selectPhoneTypeId
  });

export const initialState: PhoneModelsState =
  adapter.getInitialState({
    error: undefined,
    selectedTypeId: -1,
    phoneModelsList: []
})

export const estimatorReducer = createReducer(
  initialState,
  // Load Data from DB
  on(loadPhoneModelsByTypeSuccess, (state,action) => 
    // ({...state, phoneModelsList: action.phoneModelsByType})
    adapter.setAll(action.phoneModelsByType, state)
  ),
  on(loadPhoneModelsByTypeFailure, (state,action) => 
    ({...state, error: action.error})
  ),
  on(updateSelectedPhoneType, (state,action) =>
    ({...state, selectedTypeId: action.selectedTypeId})
  )
)

export function reducer(state: PhoneModelsState | undefined, action: Action) {
  return estimatorReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();