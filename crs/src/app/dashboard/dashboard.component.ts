import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { userinfo } from '../interface/interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  id:any;
  userinfo:userinfo
  constructor(private ApiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.id=localStorage.getItem('id');
    console.log(this.id);
    this.ApiService.getuser()
    .subscribe
    (
      data=>{
        this.userinfo=data.data
        console.log(this.userinfo.Firstname[0]);
      }
    )
  }
  logout(){
    localStorage.clear();
    this.router.navigate([""]);
  }
}
