import { Injectable } from '@angular/core';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
@Injectable({
  providedIn: 'root',
})
export class MediaPluginService {
  private filePath: string;
  private folderName: string;
  private fileMediaObject: MediaObject;
  private fileName: string;
  constructor(private media: Media, private file: File) {
    this.folderName = 'carrot';
    this.filePath = this.file.dataDirectory;
    this.fileMediaObject = null;
  }

  /**
   * @description : 폴더 체크
   */
  checkDir() {
    return this.file
      .checkDir(this.filePath, this.folderName)
      .then(() => {
        console.log('MediaPluginService Directory  exist');
        return false;
      })
      .catch(() => {
        console.log('MediaPluginService Directory doesnt exist');
        this.createDir();
        return true;
      });
  }

  /**
   * @description : 폴더 생성
   */
  createDir() {
    return this.file
      .createDir(this.filePath, this.folderName, true)
      .then((value) => {
        console.log('createDir create : ', value);
      })
      .catch((err) => {
        console.log('createDir err : ', err);
      });
  }

  /**
   * @description : getFileList
   */
  getFileList() {
    return this.file.listDir(this.filePath, this.folderName);
  }

  /**
   * @description : 파일 생성
   */
  makeFile(fileName) {
    this.fileName = fileName;
    this.file
      .createFile(
        this.filePath + '/' + this.folderName,
        `${this.fileName}.mp3`,
        true
      )
      .then(() => {
        console.log('scuccess create file ');
      })
      .catch((err) => {
        console.error('file create error : ', err);
      });
  }

  /**
   * @description : 미디어 파일  생성
   */
  startRecrod() {
    this.fileMediaObject = this.media.create(
      this.filePath + '/' + this.folderName + '/' + `${this.fileName}.mp3`
    );
    if (this.fileMediaObject) {
      //파일 녹음 시작
      this.fileMediaObject.startRecord();

      //상태 감시
      /**
       *  Media.MEDIA_NONE = 0;
       *  Media.MEDIA_STARTING = 1;
       *  Media.MEDIA_RUNNING = 2;
       *  Media.MEDIA_PAUSED = 3;
       *  Media.MEDIA_STOPPED = 4;
       */
      this.fileMediaObject.onStatusUpdate.subscribe((status) =>
        console.log('fileMediaObject status : ', status)
      );

      //파일 녹음 종료 시점
      this.fileMediaObject.onSuccess.subscribe(() =>
        console.log('fileMediaObject Action is successful')
      );

      //파일 에러 상태 감시
      this.fileMediaObject.onError.subscribe((error) =>
        console.error('fileMediaObject error : ', error)
      );
    }
  }

  /**
   * @description : 미디어 파일 종료
   */
  stopRecord() {
    if (this.fileMediaObject) {
      this.fileMediaObject.stopRecord();
    }
  }

  /**
   * @description : 파일 삭제
   */
  deleteFile(fileName) {
    this.file
      .removeFile(this.filePath + '/' + this.folderName, fileName)
      .then((value) => {
        console.log('value : ', value);
      })
      .catch((err) => {
        console.error('delete file error : ', err);
      });
  }

  /**
   * @description : play mp3
   */
  playRecord() {
    this.fileMediaObject.play();
  }

  /**
   * @description : play mp3
   */
  stop() {
    this.fileMediaObject.stop();
  }
}
