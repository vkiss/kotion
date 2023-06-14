import { notionBlockChildren, notionContentInPage, notionPagesInDb } from '.';

export async function notionPageContentById (id: string) {
  const response = await notionContentInPage(`${id}`);

  const promises = response.blocks.results.map(async (item: any) => {
    if (item.type === 'column_list') {
      const content = await notionBlockChildren(item.id);

      return {
        ...item,
        column_list: content,
      };
    }

    if (item.type === 'child_database') {
      const content = await notionPagesInDb(item.id);

      return {
        ...item,
        child_database: {
          ...item.child_database,
          ...content
        }
      };
    }

    if (item.has_children) {
      const content = await notionBlockChildren(item.id);

      return {
        ...item,
        children: {
          ...content.results
        }
      };
    }

    return item;
  });

  const promisesResult = await Promise.all(promises);

  return {
    properties: response.properties,
    blocks: promisesResult,
  };
}
