import { Fragment, ReactElement } from 'react';

// types
import { IReplaceBlocksOptions } from './types';

// block
import BlockBookmark from '../BlockBookmark';
import BlockCallout from '../BlockCallout';
import BlockChildDatabase from '../BlockChildDatabase';
import BlockCode from '../BlockCode';
import BlockColumnList from '../BlockColumnList';
import BlockDivider from '../BlockDivider';
import BlockHeading from '../BlockHeading';
import BlockImage from '../BlockImage';
import BlockListItem from '../BlockListItem';
import BlockParagraph from '../BlockParagraph';
import BlockQuote from '../BlockQuote';
import BlockToggle from '../BlockToggle';

interface Props {
  block: any,
  replacers: IReplaceBlocksOptions,
}

export const getBlockFront = ({
  block,
  replacers,
}: Props): ReactElement => {
  const {
    replaceBlockBookmark,
    replaceBlockCallout,
    replaceBlockChildDatabase,
    replaceBlockCode,
    replaceBlockHeading,
    replaceBlockImage,
    replaceBlockListItem,
    replaceBlockParagraph,
    replaceBlockQuote,
    replaceBlockToggle,
  } = replacers;

  if (!block) return <></>;

  switch (block.type) {
  case 'bookmark':
  case 'embed':
    return replaceBlockBookmark ? <Fragment>{replaceBlockBookmark(block)}</Fragment> : <BlockBookmark data={block} />;
  case 'callout':
    return replaceBlockCallout ? <Fragment>{replaceBlockCallout(block)}</Fragment> : <BlockCallout data={block} />;
  case 'child_database':
    return replaceBlockChildDatabase ? <Fragment>{replaceBlockChildDatabase(block)}</Fragment> : <BlockChildDatabase data={block} />;
  case 'code':
    return replaceBlockCode ? <Fragment>{replaceBlockCode(block)}</Fragment> : <BlockCode data={block} />;
  case 'column_list':
    return <BlockColumnList data={block} />;
  case 'divider':
    return <BlockDivider />;
  case 'heading_1':
  case 'heading_2':
  case 'heading_3':
    return replaceBlockHeading ? <Fragment>{replaceBlockHeading(block)}</Fragment> : <BlockHeading data={block} />;
  case 'image':
    return replaceBlockImage ? <Fragment>{replaceBlockImage(block)}</Fragment> : <BlockImage data={block} />;
  case 'numbered_list_item':
  case 'bulleted_list_item':
  case 'to_do':
    return replaceBlockListItem ? <Fragment>{replaceBlockListItem(block)}</Fragment> : <BlockListItem data={block} />;
  case 'paragraph':
    return replaceBlockParagraph ? <Fragment>{replaceBlockParagraph(block)}</Fragment> : <BlockParagraph data={block} />;
  case 'quote':
    return replaceBlockQuote ? <Fragment>{replaceBlockQuote(block)}</Fragment> : <BlockQuote data={block} />;
  case 'toggle':
    return replaceBlockToggle ? <Fragment>{replaceBlockToggle(block, replacers)}</Fragment> : <BlockToggle data={block} replacers={replacers} />;
  case 'table_of_contents':
  case undefined:
    return <></>;
  default:
    console.log('>> blockinfo', block.type, block);
    return <div>Block: {block.type}</div>;
  }
};
