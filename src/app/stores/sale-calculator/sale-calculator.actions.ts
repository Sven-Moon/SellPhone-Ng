import { createAction, props } from '@ngrx/store'
import { PhoneModel } from 'src/app/models/PhoneModel'
import { PhoneType } from 'src/app/models/PhoneType'

export const updateSelectedPhoneType = createAction(
  '[Estimator Component] Update Selected Phone Type',
  props<{
    formIndex: number,
    selectedPhoneType: PhoneType
  }>()
)

export const updateSelectedPhoneModel = createAction(
  '[Estimator Component] Update Selected Phone Model ID',
  props<{
    formIndex: number,
    selectedPhoneModel: PhoneModel
  }>()
)

export const addFormSection = createAction(
  '[Sale Calculator Component] Add Form Section'
)

export const updateCondition = createAction(
  '[Sale Calculator Component] Update Condition',
  props<{ formIndex: number, id: string }>()
)

export const updateQuantity = createAction(
  '[Sale Calculator Component] Update Quantity',
  props<{ formIndex: number, quantity: number }>()
)
