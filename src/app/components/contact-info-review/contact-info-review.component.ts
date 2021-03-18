import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-contact-info-review',
  templateUrl: './contact-info-review.component.html',
  styleUrls: ['./contact-info-review.component.scss']
})
export class ContactInfoReviewComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

}
