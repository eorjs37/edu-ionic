import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import {
  AppLauncher,
  AppLauncherOptions,
} from '@ionic-native/app-launcher/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public getChildSendData: string;
  constructor(
    private router: Router,
    private inappBroswer: InAppBrowser,
    private appLauncher: AppLauncher
  ) {}

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

  moveYotube() {
    const options: AppLauncherOptions = {
      uri: 'instagram://',
    };
    this.appLauncher.canLaunch(options).then(
      (canLaunch: boolean) => {
        console.log('canLaunch : ', canLaunch);
        this.appLauncher.launch(options);
      },
      (no: boolean) => {
        console.log('no : ', no);
      }
    );
  }
}
