import { BlogData } from "./BlogData";

export interface FirebaseCallback
{   
    onDataReceived( blogList : BlogData[] );
}