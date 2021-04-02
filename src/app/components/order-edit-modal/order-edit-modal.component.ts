import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Helpers } from 'src/app/helpers/helpers';
import { Condition } from 'src/app/models/Condition';
import { PhoneModel } from 'src/app/models/PhoneModel';
import { PhoneType } from 'src/app/models/PhoneType';
import { SaleOrder } from 'src/app/models/SaleOrder';
import { ModalService } from 'src/app/services/modal.service';
import { addOrderDetail, deleteOrderDetail, updateCondition, updateQuantity, updateSelectedPhoneModel } from 'src/app/stores/sale-calculator/sale-calculator.actions';
import { selectSaleOrder } from 'src/app/stores/sale-calculator/sale-calculator.selectors';
import { selectPhoneModelsList, selectStaticData } from 'src/app/stores/staticData/staticData.selectors';

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
    private helper: Helpers,
    private cd: ChangeDetectorRef,
    private router: Router
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
      orderStatus: this.saleOrder.orderStatus,
      orderDetails: this.fb.array(this.loadStoreData())
    })
  }

  loadStoreData(): Array<FormGroup> {
    // create array
    const detailArray: Array<FormGroup> = []
    this.saleOrder.orderDetails.forEach((storeOd, i) => {
      detailArray.push(
        this.fb.group({
          phoneType: [+storeOd.phoneType.typeId, Validators.required],
          phoneModel: [+storeOd.phoneModel.modelId, Validators.required],
          phoneCondition: [storeOd.phoneCondition ? storeOd.phoneCondition : "", Validators.required],
          quantity: [+storeOd.quantity, [Validators.required, Validators.min(1)]],
          subTotal: [+storeOd.subTotal],
          modelList: [this.phoneModelList[i]]
        })
      )
    })
    return detailArray
  }

  addRow() {
    let index: number = this.saleOrderForm.get('orderDetails').value.length
    this.helper.addOrderDetails(this.saleOrderForm, index)

    this.cd.detectChanges()
  }

  public addOrderDetails(index: number) {

  }

  removeRow(index: number) {
    // remove the row from the form
    this.getOrderDetails.removeAt(index)
    // remove the row from the store
    this.store.dispatch(deleteOrderDetail({ index }))

    this.helper.calcTotalSale(this.saleOrderForm)
  }

  get getOrderDetails(): FormArray {
    return this.saleOrderForm.get('orderDetails') as FormArray
  }

  public onSubmit(): void {
  }

  public cancel(): void {
    this.modalService.hide()
  }

  public onTypeChange(e: any, formIndex: number): void {
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

  public onModelChange(e: any, formIndex: number): void {
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

  public onConditionChange(id: string, formIndex): void {
    //return matching condition object from static data
    const condition: Condition = this.conditionsList
      .find((condition: Condition) => condition.id == id)

    // update the store
    this.store.dispatch(updateCondition({ formIndex, condition }))

    // update form: subtotal -> total
    this.helper.updateDetailsForm(this.saleOrderForm, formIndex)
  }

  public onQuantityChange(quantity: number, formIndex: number): void {
    // update the store
    this.store.dispatch(updateQuantity({ formIndex, quantity }))

    // update form: subtotal -> total
    this.helper.updateDetailsForm(this.saleOrderForm, formIndex)
  }
}
