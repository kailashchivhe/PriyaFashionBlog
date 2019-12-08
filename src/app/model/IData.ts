import { IGraphql } from "./IGraphql";

export interface IData
{   
    graphql:IGraphql;
    logging_page_id:string;
    show_suggested_profiles:boolean;
    show_follow_dialog:boolean;
    toast_content_on_load:any;
}