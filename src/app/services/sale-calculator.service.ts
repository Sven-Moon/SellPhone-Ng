import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { selectPhoneTypes } from "../stores/staticData/staticData.selectors";

@Injectable({
  providedIn: 'root'
})
export class saleCalculatorService {
  constructor (
    private _store:Store<any>
  ) {}

  public getTypeName(typeId:number) {
    this._store.pipe(select(selectPhoneTypes)).subscribe(
      (typeList) => typeList.forEach(type => {
        type.typeId === typeId ? type.name : null;
      })
    )
  }
}
