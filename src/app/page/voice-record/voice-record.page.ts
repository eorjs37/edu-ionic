import { Component, OnInit } from '@angular/core';
import { MediaPluginService } from '@/app/service/media-plugin.service';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-voice-record',
  templateUrl: './voice-record.page.html',
  styleUrls: ['./voice-record.page.scss'],
})
export class VoiceRecordPage implements OnInit {
  public fileList = [];

  private index: number;
  constructor(
    private mediaPluginService: MediaPluginService,
    private plt: Platform
  ) {
    this.index = 0;
  }

  ngOnInit() {
    this.plt.ready().then(async () => {
      await this.mediaPluginService.checkDir();

      this.loadFiles();
    });
  }

  async onMakeFile() {
    console.log('onMakeFile');

    await this.mediaPluginService.makeFile(`test${this.index}`);
    this.index++;
    this.loadFiles();
  }

  onStartRecord() {
    this.mediaPluginService.startRecrod();
  }

  onStopRecord() {
    this.mediaPluginService.stopRecord();
  }

  onPlayRecord() {
    this.mediaPluginService.playRecord();
  }

  onStopRecordFile() {
    this.mediaPluginService.stop();
  }

  loadFiles() {
    this.mediaPluginService
      .getFileList()
      .then((result) => {
        console.log('result : ', result);
        this.fileList = result;
      })
      .catch((err) => {
        console.error('getFileList error : ', err);
      });
  }

  async onDeleteFile(fileName: string) {
    await this.mediaPluginService.deleteFile(fileName);
    this.loadFiles();
  }
}
