import { FC } from 'react';

export interface IReplaceBlocksOptions {
  NoContentWarning?: FC,
  replaceBlockBookmark?: TBlockStreamReplaceBlock,
  replaceBlockCallout?: TBlockStreamReplaceBlock,
  replaceBlockChildDatabase?: TBlockStreamReplaceBlock,
  replaceBlockCode?: TBlockStreamReplaceBlock,
  replaceBlockHeading?: TBlockStreamReplaceBlock,
  replaceBlockImage?: TBlockStreamReplaceBlock,
  replaceBlockListItem?: TBlockStreamReplaceBlock,
  replaceBlockParagraph?: TBlockStreamReplaceBlock,
  replaceBlockQuote?: TBlockStreamReplaceBlock,
  replaceBlockToggle?: TBlockStreamReplaceBlockWithReplacers,
}

export interface BlockStreamProps
  extends IReplaceBlocksOptions {
  blocks?: any[],
  className?: string,
}

type TBlockStreamReplaceBlock = (data: any) => any;

type TBlockStreamReplaceBlockWithReplacers = (data: any, replacers: IReplaceBlocksOptions) => any;
