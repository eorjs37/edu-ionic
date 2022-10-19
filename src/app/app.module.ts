import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
//voice record
import { Media } from '@awesome-cordova-plugins/media/ngx';
//File
import { File } from '@awesome-cordova-plugins/file/ngx';

//InAppBrowser
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

//AppLauncher
import { AppLauncher } from '@ionic-native/app-launcher/ngx';

//font-awesome
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Media,
    File,
    InAppBrowser,
    AppLauncher,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(libary: FaIconLibrary) {
    libary.addIconPacks(fas, fab, far);
  }
}
