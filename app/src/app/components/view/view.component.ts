import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BatchService } from '../../services/batch.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  startDate = new FormControl({ value: new Date(), disabled: true });
  endDate = new FormControl({ value: new Date(), disabled: true });
  transactionArray = [];

  constructor(private batchService: BatchService) { }

  ngOnInit() {
  }

  onFilter() {
    this.transactionArray = [];
    const startDate = this.startDate.value.getFullYear() +
      '/' + (this.startDate.value.getMonth() + 1) + '/' + this.startDate.value.getDate();
    const endDate = this.endDate.value.getFullYear() + '/' + (this.endDate.value.getMonth() + 1) + '/' + this.endDate.value.getDate();

    this.batchService.viewTransactions(startDate, endDate).subscribe(data => {
      console.log(data);
      this.transactionArray = data[0];
    });
  }

}
