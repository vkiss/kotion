import { TNotionClient } from './index';

export type Params = {
  dbId: string,
  filter?: any,
  sorts?: any,
  client: TNotionClient,
}

export default async function notionPagesInDb({ client, dbId, filter, sorts }: Params) {
  const newQuery: any = {
    database_id: dbId,
  };

  if (filter) {
    newQuery.filter = filter;
  }

  if (sorts) {
    newQuery.sorts = sorts;
  }

  try {
    const myPosts = await client.databases.query(newQuery);

    return myPosts;
  } catch {
    return {
      results: [],
    };
  }
}
