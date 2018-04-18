import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BatchService } from '../services/batch.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {

  batchNo;
  voucherArray = [];

  constructor(private route: ActivatedRoute,
    private batchService: BatchService) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.batchNo = params['batchNo'];
      });
    console.log(this.batchNo);
    const batchNo = {
      batchNo: this.batchNo
    };
    this.batchService.listVoucher(batchNo).subscribe(data => {
      console.log(data);
      this.voucherArray = data;
    });
  }

}
