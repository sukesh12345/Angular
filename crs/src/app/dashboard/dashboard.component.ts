import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { userinfo, jobdata } from '../interface/interface';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { gender } from '../interface/interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { toUnicode } from 'punycode';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  id: any;
  gender: gender
  userinfo: userinfo;
  expression: any;
  updateinfo: any;
  editfirstname: any;
  editlastname: any;
  editgender: any;
  editdate: any;
  editemail: any;
  editDoorno: any;
  editStreetname: any;
  editCity: any;
  editState: any;
  editPostalcode: any;
  color: any;
  mode: any;
  truth: any;
  dashboardprogress: any;
  recruiter: any;
  student: any;
  jobdata: jobdata;
  load: any;
  i: any;
  options: FormGroup;
  addjob: any;
  addjobtoggle: any;
  viewjobstoggle: any;
  updateinfotoggle: any;
  Company: any;
  DriveDate: any;
  Drivedetails: any;
  CompanyWebsite: any;
  myForm: NgForm;
  appliedjobstoggle: any;
  deleteprogress: any;
  viewmatchingjobstoggle: any;
  addjobprogress: any;
  applyprogress: any;
  approved: any;
  matchjobprogress: any;
  nojobsmatch: any;

  constructor(private ApiService: ApiService, private router: Router, fb: FormBuilder, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.dashboardprogress = true;
    this.applyprogress = false;
    this.addjob = false;
    this.load = false;
    this.updateinfo = false;
    this.recruiter = false;
    this.addjobtoggle = false;
    this.matchjobprogress = false;
    this.mode = 'indeterminate';
    this.student = false;
    this.expression = false;
    this.viewjobstoggle = false;
    this.updateinfotoggle = false;
    this.appliedjobstoggle = false;
    this.deleteprogress = false;
    this.viewmatchingjobstoggle = false;
    this.approved = false;
    this.nojobsmatch = false;
    this.id = localStorage.getItem('id');
    this.ApiService.getuser()
      .subscribe
      (
        data => {
          this.dashboardprogress = false;
          this.userinfo = data.data;
          this.load = true;
          if (this.userinfo.Status[0] == "Not Approved") {
            this.approved = true;
            localStorage.clear();
            return
          }
          this.expression = true;
          if (this.userinfo.Type[0] == "Student") {
            this.student = true;
            this.updateinfotoggle = true;
            this.appliedjobstoggle = true;
            this.viewmatchingjobs();
          }
          else {
            this.i = 0;
            this.getpostedjobs();
            this.recruiter = true;
            this.addjobtoggle = true;
            this.updateinfotoggle = true;
          }
        },
        error => {
          setTimeout(() => {
            this.router.navigate(['profile']);
          }, 5000);
        }
      )
  }
  drivedateControl = new FormControl('', [Validators.required]);
  companyControl = new FormControl('', [Validators.required]);
  drivedetailsControl = new FormControl('', [Validators.required]);
  companywebsiteControl = new FormControl('', [Validators.required]);
  logout() {
    localStorage.clear();
    this.router.navigate([""]);
  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  genderControl = new FormControl('', [Validators.required]);
  dateControl = new FormControl('', [Validators.required]);
  postalControl = new FormControl('', [Validators.required]);
  genders: gender[] = [
    { name: 'Male' },
    { name: 'Female' },
    { name: 'Others' },
  ];
  minDate = new Date(1997, 0, 1);
  maxDate = new Date(1999, 0, 1);
  update() {
    this.color = 'primary';
    this.mode = 'indeterminate';
    this.expression = false;
    this.updateinfo = true;
    this.addjob = false;
    if (this.userinfo.Type[0] == "Recruiter") {
      this.addjobtoggle = true;
      this.viewjobstoggle = true;
    }
    else {
      this.viewmatchingjobstoggle = true;
    }
    this.updateinfotoggle = false;
    this.editfirstname = this.userinfo.Firstname[0];
    this.editlastname = this.userinfo.Lastname[0];
    this.editgender = this.userinfo.Gender[0];
    this.editdate = this.userinfo.Dob[0];
    this.editemail = this.userinfo.Email[0];
    this.editDoorno = this.userinfo.Doorno[0];
    this.editCity = this.userinfo.City[0];
    this.editStreetname = this.userinfo.Streetname[0];
    this.editState = this.userinfo.State[0];
    this.editPostalcode = this.userinfo.Postalcode[0];
    // localStorage.setItem('data',this.userinfo.Firstname[0]);
    // this.router.navigate(["update"]);
  }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  updatecancel() {
    this.expression = true;
    this.updateinfotoggle = true;
    this.updateinfo = false;
    this.addjob = false;
    this.viewjobstoggle = false;
    if (this.userinfo.Type[0] == "Recruiter") {
      this.recruiter = true;
    }
    else {
      this.student = true;
      this.viewmatchingjobstoggle = false;
    }
  }
  updatesubmit() {
    this.color = 'primary';
    this.mode = 'query';
    let updatepayload = {
      "firstname": this.editfirstname,
      "lastname": this.editlastname,
      "gender": this.editgender,
      "date": this.editdate,
      "email": this.editemail,
      "doorno": this.editDoorno,
      "streetname": this.editStreetname,
      "city": this.editCity,
      "state": this.editState,
      "postalcode": this.editPostalcode,
    }
    this.ApiService.update(updatepayload)
      .subscribe
      (
        data => {
          this.ApiService.getuser()
            .subscribe
            (
              data => {
                this.userinfo = data.data;
              }
            )
          this.expression = true;
          this.updateinfo = false;
          this.updateinfotoggle = true;
          if (this.userinfo.Type[0] == "Recruiter") {
            this.addjob = false;
            this.viewjobstoggle = false;
          }
          else {
            this.viewmatchingjobstoggle = false;
          }
        },
        error => {
          this.color = 'warn';
          this.mode = 'query';
          console.log(error);
        }
      )

  }
  getpostedjobs() {
    this.ApiService.getpostedjobs()
      .subscribe(
        data => {
          this.jobdata = data.data;
          //this.arrayOne(data.count);
        },
        error => {
          console.log(error.error);
        }
      )
  }
  viewmatchingjobs() {
    this.matchjobprogress = true;
    this.viewmatchingjobstoggle = false;
    this.updateinfotoggle = true;
    this.updateinfo = false;
    this.ApiService.getmatchingjobs()
      .subscribe(
        data => { 
          console.log(data.data);
          if (data.data[0] == 'There are no matched jobs') {
            this.nojobsmatch = true;
            this.student = false;
          }
          else {
            this.expression = true;
            // console.log(data.data);
            this.jobdata = data.data;
            
            this.student = true;
          }
          this.matchjobprogress = false;
        },
        error => {
          console.log("here" + error);
        }
      )
  }
  viewapplications(jobid) {
    localStorage.setItem('jobid', jobid[0]);
    this.router.navigate(['applications']);
  }
  addnewjob() {
    this.addjob = true;
    this.addjobtoggle = false;
    this.updateinfo = false;
    this.expression = false;
    this.viewjobstoggle = true;
    this.updateinfotoggle = true;
  }
  addjobcancel() {
    this.addjobtoggle = true;
    this.addjob = false;
    this.expression = true;
    this.viewjobstoggle = false;
  }
  viewjoblist() {
    this.recruiter = true;
    this.addjob = false;
    this.addjobtoggle = true;
    this.updateinfo = false;
    this.expression = true;
    this.viewjobstoggle = false;
    this.updateinfotoggle = true;
  }
  savejob() {
    this.addjobprogress = true;
    let addjobpayload = {
      "Company": this.Company,
      "DriveDate": this.DriveDate,
      "Drivedetails": this.Drivedetails,
      "CompanyWebsite": this.CompanyWebsite
    }
    this.ApiService.addjob(addjobpayload)
      .subscribe(
        data => {
          this.addjobtoggle = true;
          this.addjob = false;
          this.expression = true;
          this.viewjobstoggle = false;
          this.Company = null;
          this.DriveDate = null;
          this.Drivedetails = null;
          this.CompanyWebsite = null;
          this.addjobprogress = false;
          this.ngOnInit();
        },
        error => {
          this.color = "warn";
          console.log(error);
        }
      )
  }
  appliedjobs() {
    this.router.navigate(['appliedjobs']);
  }
  deletejob(jobid) {
    this.deleteprogress = true;
    this.ApiService.deletejob(jobid)
      .subscribe(
        data => {
          this.ngOnInit();
          this.deleteprogress = false;
        },
        error => {

        }
      )
  }
  applyjob(jobid) {
    this.applyprogress = true;
    console.log(jobid);
    this.ApiService.applyjob(jobid)
      .subscribe(
        data => {
          // console.log(data.data);
          this.applyprogress = false;
          this.viewmatchingjobs();

        },
        error => {
          console.log(error);
        }
      )
  }
}
