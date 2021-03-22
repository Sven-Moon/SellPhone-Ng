import { FormGroup } from '@angular/forms'
import { createAction, props } from '@ngrx/store'
import { Condition } from 'src/app/models/Condition'
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
  props<{ formIndex: number, condition: Condition }>()
)

export const updateQuantity = createAction(
  '[Sale Calculator Component] Update Quantity',
  props<{ formIndex: number, quantity: number }>()
)

export const updateSubtotal = createAction(
  '[Sale Calculator Component] Update Subtotal',
  props<{ formIndex: number, subTotal: number }>()
)

export const updateTotal = createAction(
  '[Sale Calculator Component] Update Total',
  props<{ total: number }>()
)

export const removeLine = createAction(
  '[Sale Calculator Component] Remove Order Line',
  props<{ LineId: number }>()
)
