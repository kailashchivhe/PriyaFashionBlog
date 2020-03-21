
export interface HeaderImageCallback{
    allImagesReceived( images:string[] );
    contentSpecificHeader( image: string );
}