import { FC, Fragment, memo } from 'react';
import { nanoid } from 'nanoid';

import PlainText from '../PlainText';

import * as Atom from './atoms';

interface Props {
  data: any,
}

// ::
const BlockListItem: FC<Props> = ({ data }) => {
  const itemData = data[data.type];
  const content =itemData.rich_text;

  if (content?.length === 0) return null;

  return (
    <Atom.ListItem
      isDone={data.type === 'to_do' && itemData.checked}
    >
      {'- '}
      {content.map((item: any) => {
        return <Fragment key={nanoid()}><PlainText text={item} /></Fragment>;
      })}
    </Atom.ListItem>
  );
};

export default memo(BlockListItem);
