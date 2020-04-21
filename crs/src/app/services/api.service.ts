import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  id: any;
  constructor(private httpclient: HttpClient) { }
  register(registerpayload) {
    return this.httpclient.post("http://localhost/crs/public/crsapi.php/register", registerpayload);
  }
  login(loginpayload) {
    return this.httpclient.post("http://localhost/crs/public/crsapi.php/api/users", loginpayload);
  }
  getuser(): Observable<any> {    //get user 'dashboard'

    const httpHeaders = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    this.id = localStorage.getItem('id');
    return this.httpclient.get("http://localhost/crs/public/crsapi.php/api/users/" + this.id, { headers: httpHeaders });
  }
  update(updatepayload): Observable<any> {    //update user info

    const httpHeaders = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    this.id = localStorage.getItem('id');
    return this.httpclient.put("http://localhost/crs/public/crsapi.php/api/users/" + this.id, updatepayload, { headers: httpHeaders });
  }
  getpostedjobs(): Observable<any> {   //get jobs posted by the recruiter
    const httpHeaders = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    this.id = localStorage.getItem('id');
    return this.httpclient.get("http://localhost/crs/public/crsapi.php/api/users/" + this.id + "/jobs", { headers: httpHeaders });
  }
  viewapplications(jobid): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    this.id = localStorage.getItem('id');
    return this.httpclient.get("http://localhost/crs/public/crsapi.php/api/users/" + this.id + "/jobs/applications/" + jobid, { headers: httpHeaders })
  }
  addjob(addjobpayload): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    this.id = localStorage.getItem('id');
    return this.httpclient.post("http://localhost/crs/public/crsapi.php/api/users/" + this.id + "/addjob", addjobpayload, { headers: httpHeaders });
  }
  viewappliedjobs():Observable<any>{
    const httpHeaders = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    this.id = localStorage.getItem('id');
    return this.httpclient.get("http://localhost/crs/public/crsapi.php/api/users/" + this.id + "/appliedjobs", { headers: httpHeaders })
  }
  retriveapplication(jobid):Observable<any>{
    const httpHeaders = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    this.id = localStorage.getItem('id');
    return this.httpclient.delete("http://localhost/crs/public/crsapi.php/api/users/" + this.id + "/appliedjobs/"+jobid, { headers: httpHeaders })
  }
  deletejob(jobid):Observable<any>{
    const httpHeaders = new HttpHeaders({
      'Authorization':localStorage.getItem('token')
    });
    return this.httpclient.delete("http://localhost/crs/public/crsapi.php/api/users/"+jobid,{ headers: httpHeaders })
  }
  getmatchingjobs():Observable<any>{
    const httpHeaders = new HttpHeaders({
      'Authorization':localStorage.getItem('token')
    });
    this.id = localStorage.getItem('id');
    return this.httpclient.get("http://localhost/crs/public/crsapi.php/api/users/" + this.id +"/matchingjobs/", { headers: httpHeaders });
  }
  applyjob(jobid):Observable<any>{
    const httpHeaders = new HttpHeaders({
      'Authorization':localStorage.getItem('token')
    });
    this.id = localStorage.getItem('id');
    return this.httpclient.post("http://localhost/crs/public/crsapi.php/api/users/" + this.id +"/matchingjobs/applyjob/"+jobid, { headers: httpHeaders });
  }
}