import { Component, OnInit } from '@angular/core';
import { userinfo } from '../interface/interface';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-rejected-students',
  templateUrl: './rejected-students.component.html',
  styleUrls: ['./rejected-students.component.scss']
})
export class RejectedStudentsComponent implements OnInit {
  userinfo: userinfo;
  jobid: any;
  applicationsearch: any;
  applications:any;
  noapplications:any;
  counter:any;
  status:any;
  timecount:any;
  displayedColumns: string[] = ['Name', 'Email', 'Telephone', 'Options'];
  dataSource: MatTableDataSource<any>;

  constructor(private ApiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.applicationsearch = true;
    this.applications = false;
    this.noapplications = false;
    this.jobid = localStorage.getItem('jobid');
    //localStorage.removeItem('jobid');                     //change
    this.viewapplications();
  }
  viewapplications(){
    this.status = 'rejected';
    this.ApiService.viewapplications(this.jobid,this.status)
      .subscribe(
        data => {
          this.applications = true;
          this.userinfo = data.data;
          this.dataSource = new MatTableDataSource(data.data);
          // this.dataSource = new MatTableDataSource(data);
          localStorage.setItem('applicationinfo', data.data);
          // this.router.navigate(['applications']);
          this.applicationsearch=false;
        },
        error => {
          //this.router.navigate(['profile']);
          this.applications = false;
          this.noapplications = true;
          this.timecount=10;
          setTimeout(() => {
            this.router.navigate(['applications']);
        }, 5000);  
         
          console.log(error);
        }
      )
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  navigate(){
    this.router.navigate(['profile']);
  }
  selectstudent(studentid){
    this.applicationsearch=true;
    this.status = 'selected';
    this.ApiService.updateapplicationstatus(studentid,this.status)
    .subscribe(
      data=>{
        this.viewapplications();
        this.status = 'rejected';
      },
      error=>{
        console.log(error);
      }
    )
  }
}
