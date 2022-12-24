import { Component, OnInit } from '@angular/core';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { Platform } from '@ionic/angular';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private fcm: FCM,
    private platform: Platform,
    private router: Router,
    private localNotifications: LocalNotifications
  ) {}

  ngOnInit(): void {
    this.platform.ready().then(async () => {
      await this.getToken();

      await this.localNotifications.on('trigger').subscribe((data) => {
        console.log(data);
      });
      // await this.localNotifications.getAllScheduled().then((list) => {
      //   console.log(list);
      // });
    });
  }

  getToken() {
    this.fcm.getToken().then((token) => {
      console.log('deviceId : ', token);
      //fcm 이벤트 감시
      this.fcmOnNoti();
      //localNoti 이벤트 감시
      this.localNotiClickEvent();
    });
  }

  fcmOnNoti() {
    this.fcm.onNotification().subscribe(
      (data) => {
        this.localNoti(data);
      },
      (error) => {
        console.error('fcm onNotification error : ', error);
      }
    );
  }

  localNoti(data) {
    this.localNotifications.schedule({
      text: data.body,
      trigger: { at: new Date(new Date().getTime() + 1000) },
    });
  }

  localNotiClickEvent() {
    this.localNotifications.on('click').subscribe(() => {
      this.router.navigate(['list-detail', { id: 1 }]);
    });
  }
}
