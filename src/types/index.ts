export * from './properties';

export interface INotionPagePropertiesResponse {
  object: string,
  id: string,
  created_time: string,
  last_edited_time: string,
  created_by: any,
  last_edited_by: any,
  cover: null,
  icon: null,
  parent: any,
  archived: boolean,
  properties: any,
  url: string,
}

export interface INotionPageBlocksResponse {
  object: string,
  results: any[],
  next_cursor: null,
  has_more: boolean,
  type: string,
  block: any,
}
