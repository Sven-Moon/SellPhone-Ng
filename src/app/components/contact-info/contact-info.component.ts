import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormGroupState, SetValueAction, updateGroup, validate } from 'ngrx-forms'
import { select, Store } from '@ngrx/store';
import { updateContactInfo } from 'src/app/stores/contact-info/contact-info.actions';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {
  // contactForm: FormGroup
  formState$: Observable<FormGroupState<User>>
  submittedValue$: Observable<User | undefined>

  constructor(
    // private fb: FormBuilder,
    private store: Store<any>
  ) {
    this.formState$ = this.store.select(s => s.contactInfo.formState)
    this.submittedValue$ = this.store.pipe(select(s => s.contactInfo.submittedValue))
  }


  ngOnInit(): void { }
}
