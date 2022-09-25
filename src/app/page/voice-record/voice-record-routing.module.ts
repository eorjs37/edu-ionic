import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoiceRecordPage } from './voice-record.page';

const routes: Routes = [
  {
    path: '',
    component: VoiceRecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoiceRecordPageRoutingModule {}
