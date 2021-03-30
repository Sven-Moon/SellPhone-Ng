import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Helpers } from 'src/app/helpers/helpers';
import { Condition } from 'src/app/models/Condition';
import { PhoneModel } from 'src/app/models/PhoneModel';
import { PhoneType } from 'src/app/models/PhoneType';
import { SaleOrder } from 'src/app/models/SaleOrder';
import { StaticData } from 'src/app/models/StaticData';
import { ModalService } from 'src/app/services/modal.service';
import { updateCondition, updateQuantity, updateSelectedPhoneModel, updateTotal } from 'src/app/stores/sale-calculator/sale-calculator.actions';
import { selectOrderDetail, selectSaleOrder } from 'src/app/stores/sale-calculator/sale-calculator.selectors';
import { selectConditions, selectPhoneModelsByType, selectPhoneModelsList, selectPhoneTypes, selectStaticData } from 'src/app/stores/staticData/staticData.selectors';

@Component({
  selector: 'app-order-edit-modal',
  templateUrl: './order-edit-modal.component.html',
  styleUrls: ['./order-edit-modal.component.scss']
})
export class OrderEditModalComponent implements OnInit {

  saleOrderForm: FormGroup
  saleOrder$: Observable<SaleOrder>
  saleOrder: SaleOrder
  // Observable<PhoneType[]>
  conditionsList: Array<Condition>
  phoneTypesList: Array<PhoneType>
  conditionsList$: Observable<Condition[]>
  phoneModelList: Array<PhoneModel[]>
  detailsRow: FormArray

  constructor(
    private store: Store,
    private modalService: ModalService,
    private fb: FormBuilder,
    private helper: Helpers
  ) { }

  ngOnInit(): void {
    this.saleOrder$ = this.store.select(selectSaleOrder)
    this.saleOrder$
      .subscribe(so => this.saleOrder = so)

    this.store.pipe(select(selectStaticData)).subscribe(sD => {
      this.conditionsList = sD.conditions
      this.phoneTypesList = sD.phoneTypes
      this.phoneModelList = sD.phoneModelsList
    })

    this.saleOrderForm = this.fb.group({
      orderId: [null],
      total: [this.saleOrder.total],
      orderDate: [null],
      orderStats: this.saleOrder.orderStatus,
      orderDetails: this.fb.array([])
    })
    // load form with details data
    this.saleOrder.orderDetails.forEach((od, i) => {
      this.addRow()
      this.saleOrderForm.get('orderDetails.' + i + '.type')
        .patchValue(od.phoneType)
      this.saleOrderForm.get('orderDetails.' + i + '.model')
        .patchValue(od.phoneModel)
      this.saleOrderForm.get('orderDetails.' + i + '.condition')
        .patchValue(od.phoneCondition)
      this.saleOrderForm.get('orderDetails.' + i + '.quantity')
        .patchValue(od.quantity)
      this.saleOrderForm.get('orderDetails.' + i + '.subTotal')
        .patchValue(od.subTotal)
    })
  }

  addRow() {
    const control = this.saleOrderForm.get('orderDetails') as FormArray
    control.push(this.newRow())
  }

  newRow(): FormGroup {
    return this.fb.group({
      type: [-1, Validators.required],
      model: [-1, Validators.required],
      condition: [-1, Validators.required],
      quantity: [null, [Validators.required, Validators.min(1)]],
      subTotal: [null]
    })
  }

  get orderDetails(): FormArray {
    return this.saleOrderForm.get('orderDetails') as FormArray
  }

  public onSubmit() {

  }

  public cancel(): void {
    this.modalService.hide()
  }

  public onTypeChange(e: any, formIndex: number) {
    const selectedPhoneType: PhoneType = {
      typeId: Number(e.target.selectedOptions[0].id),
      name: e.target.selectedOptions[0].label
    }
    // update type store
    this.helper.storeUpdateOnTypeChange(formIndex, selectedPhoneType)

    // get store modelList value
    let list: Array<PhoneModel>
    this.store.pipe(select(selectPhoneModelsList))
      .subscribe((mL) => list = mL[formIndex])

    // update form: subtotal -> total & model list
    this.helper.updateDetailsForm(this.saleOrderForm, formIndex, list)
  }

  public onModelChange(e: any, formIndex: number) {
    const modelId: number = e.target.selectedOptions[0].id

    // return model object from static list
    const selectedPhoneModel: PhoneModel = this.phoneModelList[formIndex]
      .find((model: PhoneModel) => model.modelId == modelId)
    // send the selected phone model to store details[]
    this.store.dispatch(updateSelectedPhoneModel(
      { formIndex, selectedPhoneModel })
    )

    // update form: subtotal -> total
    this.helper.updateDetailsForm(this.saleOrderForm, formIndex)
  }

  public onConditionChange(formIndex, id: string) {
    //return matching condition object from static data
    const condition: Condition = this.conditionsList
      .find((condition: Condition) => condition.id == id)

    // update the store
    this.store.dispatch(updateCondition({ formIndex, condition }))

    // update form: subtotal -> total
    this.helper.updateDetailsForm(this.saleOrderForm, formIndex)
  }

  public onQuantityChange(quantity: number, formIndex: number) {
    // update the store
    this.store.dispatch(updateQuantity({ formIndex, quantity }))

    // update form: subtotal -> total
    this.helper.updateDetailsForm(this.saleOrderForm, formIndex)
  }
}
