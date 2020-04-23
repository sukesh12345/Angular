import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../services/api.service';



@Component({
  selector: 'app-add-skills',
  templateUrl: './add-skills.component.html',
  styleUrls: ['./add-skills.component.scss']
})


export class AddSkillsComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  addskillcontrol = new FormControl();
  filteredskills: Observable<string[]>;
  skills: string[] = [];
  allskills: string[] = [];
  skillstack: string[] = [];
  skilladdprogress : any;

  @ViewChild('skillInput', { static: false }) skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
  
  // te: any = [{}];
  // i: any;
  selectedChips: any[] = [];


  constructor(private ApiService: ApiService) {
    this.filteredskills = this.addskillcontrol.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filter(skill) : this.allskills.slice()));
  }

  ngOnInit() {
    this.skilladdprogress = false;
    this.ApiService.getskills()
      .subscribe(
        data => {
          this.allskills = data.data;
        }
      )
      this.getskills();
  }
  getskills(){
    this.skilladdprogress = true;
    this.ApiService.getsrelatedkills()
      .subscribe(
        data=>{
          this.skillstack=data.data;
          this.skilladdprogress = false;
        },
        error=>{
            this.skillstack = [];
            this.skilladdprogress = false;
        }
      )
  }

  add(event: MatChipInputEvent): void {

    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      if ((value || '').trim()) {
        this.skills.push(value.trim());
      }

      if (input) {
        input.value = '';
      }

      this.addskillcontrol.setValue(null);
    }
  }

  remove(skill: string): void {
    console.log(skill);
    this.skilladdprogress = true;
    this.ApiService.removeskill(skill)
    .subscribe(
      data=>{
        this.getskills();
        console.log(data.data);
      },
      error=>{
        this.getskills();
        console.log("hi"+error.error);
      }
    )
    const index = this.skills.indexOf(skill);
    if (index >= 0) {
      this.skills.splice(index, 1);
    }

  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.skilladdprogress = true;
    let skillpayload = {
      "skill": event.option.value
    }
    console.log(skillpayload);
    this.ApiService.addskill(skillpayload)
      .subscribe(
        data => {
          console.log(data.data);
          this.getskills();
        },
        error => {
          console.log(error)
        });
    this.skills.push(event.option.viewValue);
    this.skillInput.nativeElement.value = '';
    this.addskillcontrol.setValue(null);


  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allskills.filter(skill => skill.toLowerCase().indexOf(filterValue) === 0);
  }
  changeSelected(parameter: string, query: string) {

    const index = this.selectedChips.indexOf(query);
    if (index >= 0) {
      this.selectedChips.splice(index, 1);
    } else {
      this.selectedChips.push(query);
    }
    console.log('this.selectedChips: ' + this.selectedChips);
  }
}
