import { Component, OnInit } from '@angular/core';
import { _ParseAST } from '@angular/compiler';
import { freeApiService } from '../services/freeapi.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  nameerror:string;
  passworderror:string;
  credential_error_msg:any;
  id:any;
  username:string;
  userpassword:string;
  list=false;
  constructor(private _freeApiService: freeApiService,private _router:Router) { }

  ngOnInit(): void {
  }
  loginName(name){
    this.credential_error_msg='';
      if(name=="")
      {
        this.nameerror='field required';
      }
     else
     {
       this.nameerror='';
     }
  }
  loginPassword(password){   
    this.credential_error_msg='';
    // console.log("pass"+password);
    if(password=="")
    {
      this.passworderror='field required';
    }
    else
    {
      this.passworderror='';
    }
  }
  login(name,password){
    
   
    //this.username = '';
    
    if(name!=""&&password!=""){
      
    this._freeApiService.getcommentsbyparameter(name,password)
      .subscribe
      (
        data => {
          this.loginresponse(data);
         
        },
        error=>{
            this.credential_error_msg='Invalid credentials';      
        }
      )      
    }
  }
  loginresponse(data){
    this.list=true;
          //his.lstcomments = data.result;
          //console.log(this.lstcomments);
          console.log("here"+(data.token));
          console.log("data"+data.data);
          localStorage.setItem('id',data.data);
          localStorage.setItem('token',data.token);
          // localStorage.setItem('id',JSON.parse(data.data).status);
          // this.id=localStorage.getItem('id');
          // console.log("here"+this.id)
          this.username='';
          this._router.navigate(["profile"]);
          }
  register(){
    this._router.navigate(["register"]);
  }
}

