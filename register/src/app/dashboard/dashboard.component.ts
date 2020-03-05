import { Component, OnInit } from '@angular/core';
import { freeApiService} from '../services/freeapi.service'
import { Router } from '@angular/router';
// import {lstcomments} from '../classes/data';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
// export class RadioNgModelExample {
//   favoriteSeason: string;
//   seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
// }

export class DashboardComponent implements OnInit {
  lstcomments:lstcomments;
  id:any;
  num:any;
  editname:any;
  editaddress:any;
  editemail:any;
  editgender:any;
  editcourse:any;
  temp:any;
  list:boolean;
  // const gender=[{'male':false}];
  constructor(private _freeApiService: freeApiService,private route:Router) { }
  ngOnInit(): void {
    console.log("dashboard");
   
   
    this._freeApiService.getcomments()
    .subscribe
    (
      data=>{
        this.list=true;
        this.num = data.data;
        this.lstcomments=data.data   
      }
    )
  }
  logout(){
    localStorage.clear();
    this.route.navigate(['']);
  }
  edit(){
    
      this.editname=this.lstcomments.Name[0];
      this.editaddress=this.lstcomments.Address[0];
      this.temp = this.lstcomments.Gender[0];
      console.log(this.temp);
      this.editgender= this.lstcomments.Gender[0];
      
      this.editemail=this.lstcomments.Email[0];
      this.editcourse=this.lstcomments.Course[0];

  }
  delete()
  {
   
    this._freeApiService.delete(this.id)
    .subscribe
    (
      data=>{
        // console.log("delete"+JSON.parse(data));
        this.logout();
      },
      error=>{
        console.log(error);
      }
    )
  }
  // $Name = $vars->Name;
  // $Address = $vars->Address;
  // $Email = $vars->Email;
  // //$Password = $vars->Password;
  // //$Telephone = $vars->Telephone;
  // $gender = $vars->gender;
  // $Course = $vars->Course; 
update(){
  console.log(this.editname);
  console.log(this.lstcomments.Id);
  let updatedata={
    "Id":this.lstcomments.Id[0],
    "Name":this.editname,
    "Address":this.editaddress,
    "Email":this.editemail,
    "gender":this.editgender,
    "Course":this.editcourse
  }
  this._freeApiService.update(updatedata)
  .subscribe
  (
    data=>{
      console.log(data);
      this._freeApiService.getcomments()
    .subscribe
    (
      data=>{
        this.num = data.data;
        this.lstcomments=data.data   
      }
    )
    }
  )
}
}
interface lstcomments {
  Id: any;
  Name: string;
  Address: string;
  Email: string;
  Password: string;
  Telephone: number;
  Gender: string;
  Course: string;
}

