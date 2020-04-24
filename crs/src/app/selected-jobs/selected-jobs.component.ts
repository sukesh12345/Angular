import { Component, OnInit } from '@angular/core';
import { userinfo, jobdata } from '../interface/interface';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-selected-jobs',
  templateUrl: './selected-jobs.component.html',
  styleUrls: ['./selected-jobs.component.scss']
})
export class SelectedJobsComponent implements OnInit {
  displayedColumns: string[] = ['Company', 'DriveDate', 'CompanyWebsite','Options'];
  dataSource: MatTableDataSource<any>;
  constructor(private ApiService: ApiService, private router: Router) { }
  jobssearch: any;
  appliedjobstable: any;
  jobdata:jobdata;
  nojobs:any;

  ngOnInit() {
    this.jobssearch = true;
    this.nojobs = false;
    this.appliedjobstable = false;
    this.getapplications();
  }
  getapplications(){
    status='selected'
    this.ApiService.viewappliedjobs(status)
    .subscribe(
      data=>{
        this.jobssearch = false;
        this.appliedjobstable = true;
        this.jobdata = data.data;
        this.dataSource = new MatTableDataSource(data.data);
      },
      error=>{
          this.nojobs=true;
          this.appliedjobstable = false;
          setTimeout(() => {
            this.router.navigate(['appliedjobs']);
        }, 5000);  
      }
    )
  }
  navigate(){
    this.router.navigate(['appliedjobs']);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
