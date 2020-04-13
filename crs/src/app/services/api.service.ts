import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
id:any;
  constructor(private httpclient: HttpClient) { }
  register(registerpayload){
    return this.httpclient.post("http://localhost/crs/public/crsapi.php/register",registerpayload);
  }
  login(loginpayload){
    return this.httpclient.post("http://localhost/crs/public/crsapi.php/api/users",loginpayload);
  }
  getuser(): Observable<any> {    //get user 'dashboard'

        const httpHeaders = new HttpHeaders({
            'Authorization': localStorage.getItem('token')
        });
        this.id=localStorage.getItem('id');
        return this.httpclient.get("http://localhost/crs/public/crsapi.php/api/users/"+this.id,{ headers: httpHeaders });
    }
}
