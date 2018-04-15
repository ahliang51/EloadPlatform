import { Component, OnInit } from '@angular/core';
import { BatchService } from '../../services/batch.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  batchArray = [];

  constructor(private batchService: BatchService,
    private spinnerService: Ng4LoadingSpinnerService,
  ) { }

  ngOnInit() {
    this.spinnerService.show();
    this.batchService.listBatch().subscribe(data => {
      console.log(data);
      this.batchArray = data;
      this.spinnerService.hide();
    });
  }

  onExport() {

  }

}


