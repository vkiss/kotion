import { FC, Fragment, memo, useId } from 'react';

import PlainText from '../PlainText';

import * as Atom from './atoms';

interface Props {
  data: any,
}

// ::
const BlockListItem: FC<Props> = ({ data }) => {
  const itemData = data[data.type];
  const content = itemData.rich_text;
  const id = useId();

  if (content?.length === 0) return null;

  return (
    <Atom.ListItem
      isDone={data.type === 'to_do' && itemData.checked}
    >
      {'- '}
      {content.map((item: any, index: number) => {
        return <Fragment key={`${id}-kotion-block-list-item-${JSON.stringify(item)}-${index}`}><PlainText text={item} /></Fragment>;
      })}
    </Atom.ListItem>
  );
};

export default memo(BlockListItem);
