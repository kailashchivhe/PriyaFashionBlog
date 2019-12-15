import { FileTypeEnum } from 'src/app/model/FileTypeEnum';
export class Upload {
    file:File;
    url:string;
    fileType:FileTypeEnum;
    basePath:string;
    constructor(file:File,fileTypeEnum:FileTypeEnum,basePath:string) {
      this.file = file;
      this.fileType = fileTypeEnum;
      this.basePath = basePath;
    }
}