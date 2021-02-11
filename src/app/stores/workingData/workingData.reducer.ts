import { createReducer, on } from '@ngrx/store';
import { WorkingData } from 'src/app/models/WorkingData';
import { updatePhoneModelsList } from './workingData.actions'

export const orderDetailFeatureKey = "orderDetail";

export interface WorkingDataState extends WorkingData {

}

export const initialState: WorkingDataState = {
  phoneModelsList: []
}



export const saleCalculatorReducer = createReducer(
  initialState,

  on(updatePhoneModelsList, (state,action) => {
    phoneModelsList: getphonemodels
        }            }        }
  })
  on(updatePhoneModelsList, (state,action) => {
    for (var i in state.phoneModelsByType) {
      if (state.phoneModelsByType[i].typeId == action.typeId) {
        return {
          ...state,
          phoneModelsList: state.phoneModelsByType[i].phoneModels
        }            }        }
  })
);
