import { Injectable } from '@angular/core';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
@Injectable({
  providedIn: 'root',
})
export class MediaPluginService {
  private filePath: string;
  private folderName: string;
  constructor(private media: Media, private file: File) {
    this.folderName = '/carrot';
    this.filePath = this.file.applicationDirectory;
  }

  /**
   * @description : 폴더 생성
   */
  createDir() {
    return this.file
      .checkDir(this.filePath, this.folderName)
      .then(() => {
        console.log('MediaPluginService Directory  exist');
        return false;
      })
      .catch(() => {
        console.log('MediaPluginService Directory doesnt exist');
        return true;
      });
  }

  /**
   * @description : 파일 생성
   */
  makeFile() {
    this.file
      .createFile(this.file.applicationDirectory, 'test.mp3', true)
      .then(() => {})
      .catch((err) => {
        console.error('file create error : ', err);
      });
  }
}
