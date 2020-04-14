import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { userinfo } from '../interface/interface';
import { FormControl, Validators } from '@angular/forms';
import { gender } from '../interface/interface';

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
  editStreetname : any;
  editCity : any;
  editState : any;
  editPostalcode : any;

    constructor(private ApiService: ApiService, private router: Router) { }

ngOnInit() {
  this.expression = true;
  this.updateinfo = false;
  this.id = localStorage.getItem('id');
  this.ApiService.getuser()
    .subscribe
    (
      data => {
        this.userinfo = data.data;
      }
    )
}
logout(){
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
update(){
  this.expression = false;
  this.updateinfo = true;
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
}
