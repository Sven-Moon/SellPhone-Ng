import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ContactFormValue } from 'src/app/stores/contact-info/contact-info.reducer';
// import { FormGroupState, SetValueAction } from 'ngrx-forms'
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {
  contactForm: FormGroup
  // formState$: Observable<FormGroupState<ContactFormValue>>
  // submittedValue$: Observable<ContactFormValue | undefined>

  constructor(
    private fb: FormBuilder,
    private store: Store<any>
  ) {
    // this.formState$ = this.store.select(s => s.formState)
    // this.submittedValue$ = this.store.pipe(select(s => s.contactForm.submittedValue))
  }

  ngOnInit(): void {
    // instantiate form
    this.contactForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required]
    })
  }

}
