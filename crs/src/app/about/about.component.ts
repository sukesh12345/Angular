import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  scroll(el: HTMLElement) {
    console.log(el);
    el.scrollIntoView();
}
scrolltop(el: HTMLElement) {
  el.scrollIntoView();
}
}
