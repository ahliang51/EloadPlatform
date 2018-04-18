import { Component, OnInit, TemplateRef } from '@angular/core';
import { BatchService } from '../../services/batch.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  batchArray = [];
  exportModal: BsModalRef;

  constructor(private batchService: BatchService,
    private spinnerService: Ng4LoadingSpinnerService,
    private modalService: BsModalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.spinnerService.show();
    this.batchService.listBatch().subscribe(data => {
      console.log(data);
      this.batchArray = data;
      this.spinnerService.hide();
    });
  }

  onExport(template: TemplateRef<any>) {
    this.exportModal = this.modalService.show(template, { class: 'modal-sm' });
  }

  onConfirm(batchNo): void {
    this.exportModal.hide();
    console.log(batchNo);
    const batch = {
      batchNo: batchNo
    };
    this.batchService.exportBatch(batch).subscribe(data => {
      console.log(data);
    });
  }

  onDecline(): void {
    this.exportModal.hide();
  }

  onSelectBatchNo(batchNo) {
    console.log(batchNo);
    this.router.navigate(['home/voucher/:batchNo'], {
      queryParams: {
        batchNo: batchNo
      }
    });
  }

}


