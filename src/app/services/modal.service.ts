import { Injectable } from "@angular/core";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalRef: BsModalRef //provides show() & hide()
  constructor(private modalService: BsModalService) { }

  hide() {
    if (this.modalRef) {
      this.modalRef.hide()
    }
  }

  show(component) {
    this.modalRef = this.modalService.show(component, {
      class: 'modal-lg',
    })
  }
}
