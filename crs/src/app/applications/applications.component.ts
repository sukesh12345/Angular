import { Component, OnInit } from '@angular/core';
import { userinfo } from '../interface/interface';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  userinfo: userinfo;
  jobid: any;
  applicationsearch: any;
  applications:any;
  noapplications:any;
  counter:any;
  displayedColumns: string[] = ['Name', 'Email', 'Telephone', 'Options'];
  dataSource: MatTableDataSource<any>;
  constructor(private ApiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.applicationsearch = true;
    this.applications = false;
    this.noapplications = false;
    this.jobid = localStorage.getItem('jobid');
    //localStorage.removeItem('jobid');                     //change
    this.ApiService.viewapplications(this.jobid)
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
          this.noapplications = true;
          setTimeout(() => {
            this.router.navigate(['profile']);
        }, 5000);  
          console.log("There are no applications yet")
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
}
