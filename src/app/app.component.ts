import { Component, OnInit } from '@angular/core';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { Platform } from '@ionic/angular';
import {
  LocalNotifications,
  ELocalNotificationTriggerUnit,
} from '@awesome-cordova-plugins/local-notifications/ngx';
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

      const isIos: boolean = await this.platform.is('ios');

      if (isIos) {
        this.fcm.requestPushPermission({
          ios9Support: {
            timeout: 10,
            interval: 0.3,
          },
        });
        this.testLocalNoti();
      }

      try {
        const payload = await this.fcm.getInitialPushPayload();

        if (payload) {
          this.router.navigate(['list-detail', { id: 1 }]);
        }
      } catch (error) {}
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
    console.log('data : ', data);

    this.localNotifications.schedule({
      id: 1,

      text: data.body,
      trigger: {
        firstAt: new Date(new Date().getTime() + 1000),
        every: ELocalNotificationTriggerUnit.MINUTE,
      },
      foreground: true,
    });
  }

  testLocalNoti() {
    this.localNotifications.schedule({
      id: 0,
      text: 'textssss',

      trigger: {
        at: new Date(new Date().getTime() + 1000),
        every: ELocalNotificationTriggerUnit.MINUTE,
      },
      foreground: true,
    });

    this.localNotifications.clearAll();
  }

  localNotiClickEvent() {
    this.localNotifications.on('click').subscribe(() => {
      this.router.navigate(['list-detail', { id: 1 }]);
    });
  }
}
