import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as ContactInfoActions from './contact-info.actions';



@Injectable()
export class ContactInfoEffects {

  // loadContactInfos$ = createEffect(() => {
  //   return this.actions$.pipe(

  //     ofType(ContactInfoActions.loadContactInfos),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => ContactInfoActions.loadContactInfosSuccess({ data })),
  //         catchError(error => of(ContactInfoActions.loadContactInfosFailure({ error }))))
  //     )
  //   );
  // });



  // constructor(private actions$: Actions) {}

}
