import { Component, OnInit, TemplateRef } from '@angular/core';
import { BatchService } from '../../services/batch.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';
import { ExcelServiceService } from '../../services/excel-service.service';
import { NotificationsService } from 'angular2-notifications';
import { mergeMap } from 'rxjs/operators';


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
    private router: Router,
    private excelService: ExcelServiceService,
    private notificationService: NotificationsService,
  ) { }

  ngOnInit() {
    this.spinnerService.show();

    this.batchService.listBatch().subscribe(data => {
      this.batchArray = data;
      this.spinnerService.hide();
    });
  }

  onExportTemplate(template: TemplateRef<any>) {
    this.exportModal = this.modalService.show(template, { class: 'modal-sm' });
  }

  onPrintTemplate(template: TemplateRef<any>) {
    this.exportModal = this.modalService.show(template, { class: 'modal-sm' });
  }

  onActivateTemplate(template: TemplateRef<any>) {
    this.exportModal = this.modalService.show(template, { class: 'modal-sm' });
  }

  onConfirmExport(batchNo): void {
    this.exportModal.hide();
    console.log(batchNo);
    const batch = {
      batchNo: batchNo
    };
    this.batchService.exportBatch(batch).subscribe(data => {
      const batchArray = [];
      for (const temp of data[0]) {
        const tempObject = {
          serialNumber: temp.SERIAL_NO,
          pinNumber: temp.PIN_NO,
          value: temp.VALUE,
          expiryDate: temp.EXPIRY_DATE
        };
        batchArray.push(tempObject);
      }
      this.excelService.exportAsExcelFile(batchArray, batchNo);
    });
  }

  onConfirmPrint(batchNo): void {
    this.exportModal.hide();
    this.spinnerService.show();

    // this.batchService.getIpAddress().pipe(mergeMap(ipAddress =>
    //   this.batchService.printBatch({
    //     batchNo: batchNo,
    //     ipAddress: ipAddress
    //   }))).subscribe(data => {
    //     console.log(data);
    //     this.spinnerService.hide();
    //     this.ngOnInit();
    //     this.notificationService.success(
    //       'Success',
    //       (data[0])[0].STATUS,
    //       {
    //         timeOut: 3000,
    //         pauseOnHover: false,
    //         clickToClose: true
    //       }
    //     );
    //   });

    const batch = {
      batchNo: batchNo,
    };

    this.batchService.printBatch(batch).subscribe(data => {
      console.log(data);
      this.spinnerService.hide();
      this.ngOnInit();
      this.notificationService.success(
        'Success',
        (data[0])[0].STATUS,
        {
          timeOut: 3000,
          pauseOnHover: false,
          clickToClose: true
        }
      );
    });
  }

  onConfirmActivate(batchNo): void {
    this.exportModal.hide();
    this.spinnerService.show();
    const batch = {
      batchNo: batchNo
    };
    this.batchService.activateBatch(batch).subscribe(data => {
      this.spinnerService.hide();
      this.ngOnInit();
      this.notificationService.success(
        'Success',
        (data[0])[0].STATUS,
        {
          timeOut: 5000,
          pauseOnHover: false,
          clickToClose: true
        }
      );
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


