import { Component, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {ApiService} from '../services/api.service';
import { MatSnackBar } from '@angular/material';
import { ImageSnippet } from '../interface/interface';


@Component({
  selector: 'app-uploaad-resume-bottom-sheet',
  templateUrl: './uploaad-resume-bottom-sheet.component.html',
  styleUrls: ['./uploaad-resume-bottom-sheet.component.scss']
})
export class UploaadResumeBottomSheetComponent implements OnInit {

  constructor( private _bottomSheetRef: MatBottomSheetRef<UploaadResumeBottomSheetComponent>,private ApiService: ApiService , private _snackBar: MatSnackBar) { }
  selectedfile:ImageSnippet= null;
  upload : any;
  image: any;
  position: any;
  formData:any;
  ngOnInit() {
    this.upload=false;
  }
  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
  // onfileselected(event){
  //   this.selectedfile = <File>event.target.files[0];
    
  // }
 
  openSnackBar(message: string , action: any ) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
  private onSuccess() {
    this.selectedfile.pending = false;
    this.selectedfile.status = 'ok';
  }


  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedfile = new ImageSnippet(event.target.result, file);
      console.log(imageInput.files[0].size/1024);
      console.log(imageInput.files[0].type);
      if(imageInput.files[0].type!="application/pdf"){
        this.openSnackBar("Only pdf are allowed","Ok");
        return
      }
      this.image = this.selectedfile.src;
      for( let i = 0 ; i < this.image.length ; i++ ) {
        if(this.image[i] == ',') {
          this.position = i + 1;
          break;
        }
      }
      this.formData = this.image.slice(this.position);
      // console.log(this.formData);

      this.selectedfile.pending = true;
      this.onSuccess(); 
    });


    //sda
    reader.readAsDataURL(file);
  }
  onupload(){

    // this.upload = true;
    // const fd = new FormData();
    // fd.append('file',this.selectedfile)
    // console.log("hi"+fd);
    let uploadpayload = {
      "encoded":this.formData
    }
    this.ApiService.uploadresume(uploadpayload)
    .subscribe(
      data=>{
        console.log(data.success);
        this._bottomSheetRef.dismiss();
        this.openSnackBar("Uploaded Successfully","Ok");
        this.upload=false;
      },
      error=>{
        console.log(error);
        this.openSnackBar("Failed","Try Again");
        this.upload=false;
      }
    )
  }
}
