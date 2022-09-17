import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public getChildSendData: string;
  constructor(private router: Router) {}

  ngOnInit() {
    console.log('home ngOninit');
    this.getChildSendData = '';
  }

  /** method */
  onChildData($event: any) {
    console.log('$event : ', $event);
    this.getChildSendData = $event;
  }

  moveRouter(path: string) {
    this.router.navigate([path]);
  }

  moveDetailRouter() {
    this.router.navigate(['list-detail', { id: 1 }]);
  }
}
