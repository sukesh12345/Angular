import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { ApiService } from '../services/api.service';
import { skills} from '../interface/interface';


@Component({
  selector: 'app-job-delete-confirmation',
  templateUrl: './job-delete-confirmation.component.html',
  styleUrls: ['./job-delete-confirmation.component.scss']
})
export class JobDeleteConfirmationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
