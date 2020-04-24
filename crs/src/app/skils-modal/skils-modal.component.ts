import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { ApiService } from '../services/api.service';
import { skills} from '../interface/interface';

@Component({
  selector: 'app-skils-modal',
  templateUrl: './skils-modal.component.html',
  styleUrls: ['./skils-modal.component.scss']
})
export class SkilsModalComponent implements OnInit {
  jobskill:skills
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private ApiService:ApiService) { }
 
  ngOnInit() {
   
    this.ApiService.getsrelatedkillsofjob(this.data)
    .subscribe(
      data=>{
          this.jobskill=data.data;
      },
      error=>{

      }
    )
    console.log(this.data);
  }

}
