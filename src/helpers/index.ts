import { Client } from '@notionhq/client';

import pagesInDb, { type Params as ParamPagesInDb } from './notionPagesInDb';
import { notionPageContentById as notionPageContentByIdFunction } from './notionPageContentById';

const client = new Client({
  auth: process.env.NOTION_TOKEN,
});

export type TNotionClient = typeof client;

export async function notionPagesInDb(params: Omit<ParamPagesInDb, 'client'>) {
  return pagesInDb({
    ...params,
    client
  });
}

export async function notionContentInPage(PAGE_ID: string) {
  const propertiesResponse = await client.pages.retrieve({ page_id: PAGE_ID });
  const blocksResponse = await notionBlockChildren(PAGE_ID);

  return {
    properties: propertiesResponse,
    blocks: blocksResponse,
  };
}

export async function notionBlockChildren(BLOCK_ID:string) {
  const blocksResponse = await client.blocks.children.list({
    block_id: BLOCK_ID,
  });

  return blocksResponse;
}

export function notionPropertyInPage(responseObject: any, property: string): string | any[] | number | boolean | null {
  if (!responseObject?.properties) return null;

  const thisProperty = responseObject?.properties[property];

  if (!thisProperty) return null;

  if (thisProperty.type === 'title') return thisProperty.title[0]?.plain_text || null;
  if (thisProperty.type === 'select') return thisProperty.select?.name || null;
  if (thisProperty.type === 'number') return thisProperty?.number || null;
  if (thisProperty.type === 'checkbox') return thisProperty?.checkbox || null;
  if (thisProperty.type === 'multi_select') return thisProperty?.multi_select || null;
  if (thisProperty.type === 'rich_text' && thisProperty.rich_text[0]) return thisProperty.rich_text[0]?.plain_text || null;
  if (thisProperty.type === 'date') return thisProperty?.date?.start || null;
  if (thisProperty.type === 'emoji') return JSON.stringify(thisProperty) || null;
  if (thisProperty.type === 'status') return thisProperty.status.name || null;

  return null;
}

type Params = {
  notionResult: any,
}

export type NotionBlockItem = {
  object: string,
  id: string,
  parent: {
    type: string,
    page_id: string,
  },
  created_time: string,
  last_edited_time: string,
  created_by: { object: string; id: string},
  last_edited_by: { object: string; id: string},
  has_children: boolean,
  archived: boolean,
  type: string,
  toggle: { rich_text: any[]; color: string },
  children: any,
}

async function loopBeyondSecondLevelBlockDepth(blocks: NotionBlockItem[]) {
  const childrenContent: any[] = [];

  if (Array.isArray(blocks)) {
    for (const block of blocks) {
      if (block.has_children) {
        const resultBlockChildren = await notionBlockChildren(block.id);
        const children = await loopBeyondSecondLevelBlockDepth((resultBlockChildren.results as NotionBlockItem[]));

        const newblock = {
          ...block,
          children,
        };

        childrenContent.push(newblock);
      } else {
        childrenContent.push(block);
      }
    }
  }

  return childrenContent;
}

export async function notionRetrieveBlockDepth({
  notionResult
}: Params) {
  const newBlocks = await loopBeyondSecondLevelBlockDepth((notionResult.blocks as NotionBlockItem[]));

  return {
    ...notionResult,
    blocks: newBlocks,
  };
}

export const notionPageContentById = notionPageContentByIdFunction;
