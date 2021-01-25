import { Injectable } from "@angular/core";
import { createEffect, ofType } from "@ngrx/effects";
import { Actions } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { mergeMap, map, catchError } from "rxjs/operators";
import { PhoneModels } from "src/app/models/PhoneModels";
import { EstimatorService } from "src/app/services/estimator.service";
import * as fromEstimatorActions from "./estimator.actions";

@Injectable()
export class EstimatorEffects { 

  constructor(
    private actions$: Actions,
    private estimatorService: EstimatorService
  ) {}

  getPhoneModelsByType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromEstimatorActions.loadPhoneModelsByType),
      mergeMap(() =>
        this.estimatorService.getPhoneModelsByType().pipe(
          map(phoneModelsByType => 
          fromEstimatorActions.loadPhoneModelsByTypeSuccess({ 
            phoneModelsByType 
          })),
          catchError(error => 
            of(fromEstimatorActions.loadPhoneModelsByTypeFailure({ error }))
        )))
    )
  )
}