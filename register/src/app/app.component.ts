import { Component } from '@angular/core';
import { freeApiService } from './services/freeapi.service';

import { login } from './services/login';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'register';
  lstcomments: lstcomments;

  constructor(private _freeApiService: freeApiService) {

  }
  
  
  lstlogin: login[];
  ngOnInit() {


    // this._freeApiService.getcomments()
    //   .subscribe
    //   (
    //     data => {
    //       console.log(data);
    //       this.lstcomments = data.result;
    //       console.log(this.lstcomments);
    //     }
    //   )
    // this.lstcomments = {
    //   Id: 4,
    //   Name: 'hi',
    //   Address: 'eesd',
    //   Email: 'dfss',
    //   Password: 'string',
    //   Telephone: 1212,
    //   Gender: 'string',
    //   Course: 'string'
    // }
    //console.log(this.lstcomments);
    
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
