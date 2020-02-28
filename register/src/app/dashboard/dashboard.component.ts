import { Component, OnInit } from '@angular/core';
import { freeApiService} from '../services/freeapi.service'
import { Router } from '@angular/router';
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
  lstcomments: lstcomments;
  id:any;
  editname:any;
  editaddress:any;
  editemail:any;
  editgender:any;
  editcourse:any;
  // const gender=[{'male':false}];
  constructor(private _freeApiService: freeApiService,private route:Router) { }
  ngOnInit(): void {
   this.id= localStorage.getItem('id')
    this._freeApiService.getcomments(this.id)
    .subscribe
    (
      data=>{
       
        console.log(data);    
        this.lstcomments = data.result;
           
      }
    )
  }
  logout(){
    localStorage.clear();
    this.route.navigate(['']);
  }
  edit(){
    console.log("hi"+this.lstcomments.Name);
      this.editname=this.lstcomments.Name;
      this.editaddress=this.lstcomments.Address;
      this.editgender=this.lstcomments.Gender
      this.editemail=this.lstcomments.Email;
      this.editcourse=this.lstcomments.Course;

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
  let updatedata={
    "Id":this.id,
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
      this.lstcomments.Id=this.id;
      this.lstcomments.Name=this.editname;
      this.lstcomments.Address=this.editaddress;
      this.lstcomments.Email=this.editemail;
      this.lstcomments.Gender=this.editgender;
      this.lstcomments.Course=this.editcourse;
    }
  )
}
}
interface lstcomments {
  Id: number;
  Name: string;
  Address: string;
  Email: string;
  Password: string;
  Telephone: number;
  Gender: string;
  Course: string;
}
