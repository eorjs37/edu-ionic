import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public getChildSendData: string;
  constructor() {}

  ngOnInit() {
    console.log('home ngOninit');
    this.getChildSendData = '';
  }

  /** method */
  onChildData($event: any) {
    console.log('$event : ', $event);
    this.getChildSendData = $event;
  }
}
