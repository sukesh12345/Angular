import { Component, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {ApiService} from '../services/api.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-uploaad-resume-bottom-sheet',
  templateUrl: './uploaad-resume-bottom-sheet.component.html',
  styleUrls: ['./uploaad-resume-bottom-sheet.component.scss']
})
export class UploaadResumeBottomSheetComponent implements OnInit {

  constructor( private _bottomSheetRef: MatBottomSheetRef<UploaadResumeBottomSheetComponent>,private ApiService: ApiService , private _snackBar: MatSnackBar) { }
  selectedfile:File= null;
  ngOnInit() {
  }
  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
  onfileselected(event){
    this.selectedfile = <File>event.target.files[0];
  }
  onupload(){
    const fd = new FormData();
    fd.append('file',this.selectedfile,this.selectedfile.name)
    console.log("hi"+fd);
    this.ApiService.uploadresume(fd)
    .subscribe(
      data=>{
        console.log(data.data);
        this._bottomSheetRef.dismiss();
        this.openSnackBar("Uploaded Successfully","Ok");
      },
      error=>{
        console.log(error);
        this.openSnackBar("Failed","Try Again");
      }
    )
  }
  openSnackBar(message: string , action: any ) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
