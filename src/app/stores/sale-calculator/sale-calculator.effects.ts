import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap } from "rxjs/operators";
import { Helpers } from "src/app/helpers/helpers";
import { removeLine } from "./sale-calculator.actions";

@Injectable()
export class SaleCalcEffects {

  constructor(
    private actions$: Actions,
    private helper: Helpers
  ) { }

  // removeItem = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(removeLine),
  //     map((action) =>
  //       this.helper.deleteOrderDetail(action.index).pipe(
  //         (orderDetails) => returnKeepers({ orderDetails })
  //       )
  //     )
  //   )
  // )
}
