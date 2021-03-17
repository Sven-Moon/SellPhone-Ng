import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {
  contactForm: FormGroup

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // instantiate form
    this.contactForm = this.fb.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required]
    })
  }
}
