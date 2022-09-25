import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoiceRecordPageRoutingModule } from './voice-record-routing.module';

import { VoiceRecordPage } from './voice-record.page';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoiceRecordPageRoutingModule,
    FontAwesomeModule,
  ],
  declarations: [VoiceRecordPage],
})
export class VoiceRecordPageModule {}
