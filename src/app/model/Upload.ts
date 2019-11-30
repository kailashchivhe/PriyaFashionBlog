import { FileTypeEnum } from 'src/app/model/FileTypeEnum';
export class Upload {
    file:File;
    url:string;
    fileType:FileTypeEnum;
    constructor(file:File,fileTypeEnum:FileTypeEnum) {
      this.file = file;
      this.fileType = fileTypeEnum;
    }
}