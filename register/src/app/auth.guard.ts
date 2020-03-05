import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private route:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  resolve(route: ActivatedRouteSnapshot){
    //console.log("auth");
    //console.log(localStorage.getItem("id"));
    if( localStorage.getItem("token") ) {
      //console.log("authqwef");
      return true;
    }
    this.route.navigate(['']);
    return false;
  }
  
}
