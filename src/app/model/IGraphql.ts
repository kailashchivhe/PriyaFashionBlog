import { IEdges } from './IEdges';

export interface IGraphql
{
    user:IUser;
}

export interface IUser{
    edge_owner_to_timeline_media:IEdgeOwnerMedia;
}

export interface IEdgeOwnerMedia{
    edges:IEdges[];
}