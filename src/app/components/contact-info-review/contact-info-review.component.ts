import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { State } from 'src/app/stores/contact-info/contact-info.reducer';
import { selectContactInfoForm } from 'src/app/stores/contact-info/contact-info.selectors';

@Component({
  selector: 'app-contact-info-review',
  templateUrl: './contact-info-review.component.html',
  styleUrls: ['./contact-info-review.component.scss']
})
export class ContactInfoReviewComponent implements OnInit {
  formState$: Observable<FormGroupState<User>>

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.formState$ = this.store.select(s => s.contactInfo.formState)
  }

}
