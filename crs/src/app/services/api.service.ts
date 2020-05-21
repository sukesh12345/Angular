import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  id: any = localStorage.getItem('id');;
  jobid:any;
  status:any;
  url = "http://localhost/crs/public/crsapi.php";
  httpHeaders = new HttpHeaders({
    'Authorization':localStorage.getItem('token')
  });
  constructor(private httpclient: HttpClient) { }
  register(registerpayload) {    //user registration
    return this.httpclient.post(this.url+"/register", registerpayload);
  }
  login(loginpayload) {         //user login
    return this.httpclient.post(this.url+"/api/users", loginpayload);
  }
  getuser(): Observable<any> {    //get user 'dashboard'
    return this.httpclient.get(this.url+"/api/users/" + this.id, { headers:this.httpHeaders });
  }
  update(updatepayload): Observable<any> {    //update user info
    return this.httpclient.put(this.url+"/api/users/" + this.id, updatepayload, { headers: this.httpHeaders });
  }
  getpostedjobs(): Observable<any> {   //get jobs posted by the recruiter
    return this.httpclient.get(this.url+"/api/users/" + this.id + "/jobs", { headers:this.httpHeaders });
  }
  viewapplications(jobid,status): Observable<any> {     //applications of a job
    return this.httpclient.get(this.url+"/api/users/" + this.id + "/jobs/applications/" + jobid+"/"+status, { headers: this.httpHeaders })
  }
  addjob(addjobpayload): Observable<any> {          //post a new (by recruiter)
    return this.httpclient.post(this.url+"/api/users/" + this.id + "/addjob", addjobpayload, { headers: this.httpHeaders });
  }
  viewappliedjobs(status):Observable<any>{        //view applied jobs(by student)
    return this.httpclient.get(this.url+"/api/users/" + this.id + "/appliedjobs/"+status, { headers: this.httpHeaders })
  }
  retriveapplication(jobid):Observable<any>{     //retrieve application (by student)
    return this.httpclient.delete(this.url+"/api/users/" + this.id + "/appliedjobs/"+jobid, { headers: this.httpHeaders })
  }
  deletejob(jobid):Observable<any>{             //delete a posted job(by recruiter)
    return this.httpclient.delete(this.url+"/api/users/"+jobid,{ headers: this.httpHeaders })
  }
  getmatchingjobs():Observable<any>{          //get matching jobs for a student based on skills added
    return this.httpclient.get(this.url+"/api/users/" + this.id +"/matchingjobs/", { headers: this.httpHeaders });
  }
  applyjob(jobid,Firstname):Observable<any>{          //apply job by student
    let applyjobpayload = {
      "Firstname":Firstname
    }
    return this.httpclient.post(this.url+"/api/users/" + this.id +"/matchingjobs/applyjob/"+jobid,applyjobpayload, { headers: this.httpHeaders });
  }
  getstatesname():Observable<any>{        //get state names for autocomplete
    return this.httpclient.get(this.url+"/statesname");
  }
  getsrelatedkills():Observable<any>{     //get realted skills
    return this.httpclient.get(this.url+"/api/users/"+this.id+"/skills");
  }
  getsrelatedkillsofjob(jobid):Observable<any>{     //get realted skillsofjob
    return this.httpclient.get(this.url+"/api/users/"+jobid+"/skills");
  }
  getskills():Observable<any>{        //get skills for autocomplete
    return this.httpclient.get(this.url+"/allskills");
  }
  addskill(skillpayload):Observable<any>{     //add skill by the student
    return this.httpclient.post(this.url+"/api/users/"+this.id+"/addskill",skillpayload, { headers: this.httpHeaders });
  }
  removeskill(skill):Observable<any>{       //removed added skill by the user
    return this.httpclient.delete(this.url+"/api/users/"+this.id+"/removeskill/"+skill,{ headers: this.httpHeaders });
  }

  updateapplicationstatus(studentid,status):Observable<any>{  //update job applicaiton status
    this.jobid  = localStorage.getItem('jobid');
    let selectedstudentspayload = {
      "StudentId" :studentid[0],
      "JobId":this.jobid,
      "Status":status
    }
    console.log(selectedstudentspayload)
    return this.httpclient.patch(this.url+"/api/users/"+this.id+"/applications/updatestatus",selectedstudentspayload,{headers:this.httpHeaders});
  }

  companies():Observable<any>{
    return this.httpclient.get(this.url+"/companies");
  }

  filteredjobs(jobfilterspayload):Observable<any>{
   console.log(jobfilterspayload);
    return this.httpclient.post(this.url+"/api/users/"+this.id+"/filteredjobs",jobfilterspayload);
  }
  
  uploadresume(uploadpayload):Observable<any>{
   
    return this.httpclient.post(this.url+"/uploadresume/"+this.id,uploadpayload);
  }
  // addjobrequirement(tags):Observable<any>{
  //   this.id = localStorage.getItem('id');
  //   return this.httpclient.get(this.url+"/api/users/"+this.id+"/addjobrequirements/"+tags);
  // }


  
}