import {Injectable} from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders}  from '@angular/common/http';
import { Observable } from 'rxjs';
import { login } from './login';
@Injectable()
export class freeApiService
{
    token:any;
    constructor(private httpclient: HttpClient){}
    
    getcomments(id):Observable<any>{
        id=JSON.parse(id);
return this.httpclient.get("http://localhost/slimapp/public/index.php/api/users/"+id);
}
getcommentsbyparameter(login_Name,login_Password):Observable<any>{
    // let login_Name= new HttpParams().set('login_Name',name)
    // let login_Password= new HttpParams().set('login_Password',password)
    let arr = {
        "login_Name":login_Name,
        "login_Password":login_Password
    }
    return this.httpclient.post("http://localhost/slimapp/public/index.php/api/users", arr);
}
delete(id):Observable<any>{
    
const httpHeaders =new HttpHeaders({
        'Authorization': localStorage.getItem('token') 
    });

    
    return this.httpclient.delete("http://localhost/slimapp/public/index.php/api/users/"+id,{headers:httpHeaders});
}
update(id):Observable<any>{
    this.token=localStorage.getItem('token');
    //let header = { headers: new HttpHeaders({'Authorization':  this.token})}
    return this.httpclient.put("http://localhost/slimapp/public/index.php/api/users/",id);
}
}