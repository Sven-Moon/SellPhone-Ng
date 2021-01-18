import { Injectable } from "@angular/core";
import { createEffect, ofType } from "@ngrx/effects";
import { Actions } from "@ngrx/effects";
import { of } from "rxjs";
import { mergeMap, map, catchError } from "rxjs/operators";
import { StaticDataService } from "src/app/services/staticData.service";
import * as fromStaticDataActions from "./staticData.actions";

@Injectable()
export class StaticDataEffects { 

  constructor(
    private actions$: Actions,
    private staticDataService: StaticDataService
  ) {}

  getStaticData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromStaticDataActions.loadStaticData),
      mergeMap(() =>
        this.staticDataService.getStaticData().pipe(
          map(staticData => fromStaticDataActions.loadStaticDataSuccess({ staticData })),
          catchError(error => 
            of(fromStaticDataActions.loadStaticDataFailure({ error }))
        )))
    )
  )
}