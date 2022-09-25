import { Component, OnInit } from '@angular/core';
import { MediaPluginService } from '@/app/service/media-plugin.service';
@Component({
  selector: 'app-voice-record',
  templateUrl: './voice-record.page.html',
  styleUrls: ['./voice-record.page.scss'],
})
export class VoiceRecordPage implements OnInit {
  constructor(private mediaPluginService: MediaPluginService) {}

  async ngOnInit() {
    const result = await this.mediaPluginService.createDir();
    console.log(result);
  }
}
