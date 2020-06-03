import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { userinfo, jobdata, skills } from '../interface/interface';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { gender } from '../interface/interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, from } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SkilsModalComponent } from '../skils-modal/skils-modal.component';
import { JobDeleteConfirmationComponent } from '../job-delete-confirmation/job-delete-confirmation.component';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { UploaadResumeBottomSheetComponent } from '../uploaad-resume-bottom-sheet/uploaad-resume-bottom-sheet.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageSnippet } from '../interface/interface'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillcontrol = new FormControl('', [Validators.required]);
  filteredskills: Observable<string[]>;
  skills: string[] = [];
  allskills: string[] = [];


  @ViewChild('skillinput', { static: false }) skillinput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
  skillvalue: any;
  te: any = [{}];

  selectedChips: any[] = [];

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
  options: FormGroup;
  addjob: any;
  addjobtoggle: any;
  viewjobstoggle: any;
  updateinfotoggle: any;
  addskillstoggle: any;
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
  skillstack: string[] = [];
  nopostedjobs: any;
  noskillsadded: any;
  Companylocation: any;
  skillstackdisplay: any;
  deletejobconfirmationdialogresult: any;
  selectedjobstoggle: any;
  skillfilter: string[] = [];
  companies: string[] = [];
  companyfilter: string[] = [];
  jobfilters: string[] = [];
  filtercheckbox: any;
  applymessage = "Applied succesfully";
  close = "Ok";
  filters = true;
  url: any;
  selectedfile:ImageSnippet= null;
  upload : any;
  image: any;
  position: any;
  companylogoimage:any;

  constructor(private ApiService: ApiService, private router: Router, public dialog: MatDialog, private _bottomSheet: MatBottomSheet, private _snackBar: MatSnackBar, public domSanitizer: DomSanitizer) {
    this.filteredskills = this.skillcontrol.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filter(skill) : this.allskills.slice()));
  } openBottomSheet(): void {
    this._bottomSheet.open(UploaadResumeBottomSheetComponent);
  }
  ngOnInit() {
    console.log("ngoninit");
    this.addskillstoggle = false;
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
    this.nopostedjobs = false;
    this.noskillsadded = false;
    this.skillstackdisplay = false;
    this.filters = false;
    this.getlogo();
    this.ApiService.getskills()
      .subscribe(
        data => {
          this.allskills = data.data;
        }
      )

    this.ApiService.companies()
      .subscribe(
        data => {
          this.companies = data.data;
        }
      )
    this.getuser();

    

  }

  getuser(){
    this.ApiService.getuser()
      .subscribe
      (
        data => {
          this.dashboardprogress = false;
          this.userinfo = data.data;
          this.load = true;
          // console.log(this.userinfo.Status[0])
          if (this.userinfo.Status[0] == "NotApproved") {
            this.approved = true;
            return
          }
          else {
            this.approved = false;
          }
          console.log("here");
          this.expression = true;
          if (this.userinfo.Type[0] == "Student") {
            localStorage.setItem('Firstname', this.userinfo.Firstname[0]);
            this.addskillstoggle = true;
            this.student = true;
            this.skillstackdisplay = true;
            this.selectedjobstoggle = true;
            this.ApiService.getsrelatedkills()
              .subscribe(
                data => {
                  this.noskillsadded = false;
                  this.skillstackdisplay = true;
                  this.skillstack = data.data;
                  
                  this.viewmatchingjobs();

                },
                error => {

                  this.noskillsadded = true;
                  this.skillstackdisplay = false;
                }
              )
            this.updateinfotoggle = true;
            this.appliedjobstoggle = true;
          }
          else {
            // this.i = 0;
            this.getpostedjobs();
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

  openskillsdialog(jobid) {
    this.dialog.open(SkilsModalComponent, { data: jobid })
  }

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
          this.nopostedjobs = false;
          this.recruiter = true;
          this.deleteprogress = false;
          //this.arrayOne(data.count);
        },
        error => {
          console.log(error);
          this.nopostedjobs = true;
          this.student = false;
          this.recruiter = true;
          this.deleteprogress = false;
        }
      )
  }


  viewmatchingjobs() {
    this.matchjobprogress = true;
    this.viewmatchingjobstoggle = false;
    this.updateinfotoggle = true;
    this.updateinfo = false;
    this.nojobsmatch = false;
    this.ApiService.getmatchingjobs()
      .subscribe(
        data => {

          if (data.data[0] == 'There are no matched jobs') {
            this.nojobsmatch = true;
            this.student = false;
          }
          else {
            this.expression = true;

            this.jobdata = data.data;
            console.log(this.jobdata[0].image);
            this.student = true;
            this.nojobsmatch = false;
          }
          this.matchjobprogress = false;
        },
        error => {
          this.nojobsmatch = true;

          this.student = false;
          this.matchjobprogress = false;
        }
      )
  }
  viewapplications(jobid) {
    localStorage.setItem('jobid', jobid[0]);
    this.router.navigate(['applications']);
  }
  selectedstudents(jobid) {

    localStorage.setItem('jobid', jobid[0]);
    this.router.navigate(['selectedstudents']);
  }


  addnewjob() {
    this.addjob = true;
    this.addjobtoggle = false;
    this.updateinfo = false;
    this.expression = false;
    this.viewjobstoggle = true;
    this.updateinfotoggle = true;
    this.color = "primary";
    this.skills = [];
  }
  addjobcancel() {
    this.addjobtoggle = true;
    this.addjob = false;
    this.expression = true;
    this.viewjobstoggle = false;
    this.color = "primary";
    this.skills = [];
    this.addjobform.reset();
  }
  viewjoblist() {
    this.addjob = false;
    this.addjobtoggle = true;
    this.updateinfo = false;
    this.expression = true;
    this.viewjobstoggle = false;
    this.updateinfotoggle = true;
  }

  drivedateControl = new FormControl('', [Validators.required]);
  companyControl = new FormControl('', [Validators.required]);
  drivedetailsControl = new FormControl('', [Validators.required]);
  companywebsiteControl = new FormControl('', [Validators.required]);
  companylocationControl = new FormControl('', [Validators.required]);
  addjobform = new FormGroup({
    drivedateControl: this.drivedateControl,
    companyControl: this.companyControl,
    drivedetailsControl: this.drivedetailsControl,
    companywebsiteControl: this.companywebsiteControl,
    companylocationControl: this.companylocationControl
  })
  savejob() {
    this.addjobprogress = true;
    this.color = "primary";
    let addjobpayload = {
      "Company": this.Company,
      "DriveDate": this.DriveDate,
      "Drivedetails": this.Drivedetails,
      "CompanyWebsite": this.CompanyWebsite,
      "CompanyLocation": this.companylocationControl.value,
      "array": this.skills,
      "image": this.companylogoimage
    }
    this.ApiService.addjob(addjobpayload)
      .subscribe(
        data => {
          this.addjobtoggle = true;
          this.addjob = false;
          this.expression = true;
          this.viewjobstoggle = false;
          this.addjobprogress = false;
          this.skills = [];
          this.addjobform.reset();
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
  deletejobconfirmation(jobid) {
    this.deleteprogress = true;
    let dialogref = this.dialog.open(JobDeleteConfirmationComponent);
    dialogref.afterClosed().subscribe(
      result => {
        this.deletejobconfirmationdialogresult = result;
        if (this.deletejobconfirmationdialogresult == 'true') {
          this.deletejob(jobid)
        }
        else {
          this.deleteprogress = false;
        }
      });
  }
  deletejob(jobid) {
    this.deleteprogress = true;
    this.ApiService.deletejob(jobid)
      .subscribe(
        data => {
          this.getpostedjobs();
        },
        error => {

        }
      )
  }
  applyjob(jobid, companyname) {
    this.applyprogress = true;
    this.ApiService.applyjob(jobid, this.userinfo.Firstname)
      .subscribe(
        data => {
          // console.log(data.data);
          this.applyprogress = false;
          this.applymessage = "Applied to " + companyname;
          this.openSnackBar(this.applymessage, this.close);
          if (!this.filters) {
            this.viewmatchingjobs();
          }
          else {
            this.applyfilters();
          }
        },
        error => {
          console.log(error);
        }
      )
  }



  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      if ((value || '').trim()) {
        this.skills.push(value.trim());
      }
      if (input) {
        input.value = '';
      }

      this.skillcontrol.setValue(null);
    }
  }

  remove(skill: string): void {
    const index = this.skills.indexOf(skill);
    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.skills.push(event.option.viewValue);
    this.skillinput.nativeElement.value = '';
    this.skillcontrol.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allskills.filter(skill => skill.toLowerCase().indexOf(filterValue) === 0);
  }
  changeSelected(parameter: string, query: string) {

    const index = this.selectedChips.indexOf(query);
    if (index >= 0) {
      this.selectedChips.splice(index, 1);
    } else {
      this.selectedChips.push(query);
    }
  }

  skillfilters(e, skill) {
    if (e.checked) {
      this.skillfilter.push(skill);
    }
    else {
      this.skillfilter = this.skillfilter.filter(m => m != skill);
    }
  }
  companyfilters(e, company) {
    if (e.checked) {
      this.companyfilter.push(company);
    }
    else {
      this.companyfilter = this.companyfilter.filter(m => m != company);
    }
  }
  applyfilters() {
    this.nojobsmatch = false;
    if (this.skillfilter == null && this.companyfilter == null) {
      return
    }
    this.matchjobprogress = true;
    let jobfilterspayload = {
      "skillfilter": this.skillfilter,
      "companyfilter": this.companyfilter
    }
    // console.log(jobfilterspayload);
    this.ApiService.filteredjobs(jobfilterspayload)
      .subscribe(
        data => {
          this.matchjobprogress = false;
          this.filters = true;
          this.jobdata = data.data;
          if (this.jobdata[0] == 'There are no matched jobs') {
            this.nojobsmatch = true;
            this.skillfilter = [];
            this.companyfilter = [];
          }
        }
      )
  }
  clearfilters() {
    this.viewmatchingjobs();
    this.filtercheckbox = false;
    this.skillfilter = [];
    this.companyfilter = [];
    this.filters = false;
  }

  openSnackBar(message: string, action: any) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  private onSuccess() {
    this.selectedfile.pending = false;
    this.selectedfile.status = 'ok';
  }
  
  processFile(companylogo: any) {
    const file: File = companylogo.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedfile = new ImageSnippet(event.target.result, file);
      // console.log(imageInput.files[0].size/1024);
      // if(imageInput.files[0].size/1024>512){
      //   this.openSnackBar("File size exceeds 512kb","Ok");
      //   this._bottomSheetRef.dismiss(); 
      //   return
      // }
      this.image = this.selectedfile.src;
      for( let i = 0 ; i < this.image.length ; i++ ) {
        if(this.image[i] == ',') {
          this.position = i + 1;
          break;
        }
      }
      this.companylogoimage = this.image.slice(this.position);
      // console.log(this.formData);

      this.selectedfile.pending = true;
      this.onSuccess(); 
    });


    //sda
    reader.readAsDataURL(file);
  }


  getlogo(){
    this.ApiService.test()
    .subscribe(
      data => {
        // console.log(data.data);
        // console.log(data);
        this.url= this.domSanitizer.bypassSecurityTrustUrl(data.data);
        console.log(this.url);
        // this.url = data.data;
        // console.log(this.url)//mmm
      },
      error => {
        console.log(error);
      }
    )
    
  }
}
