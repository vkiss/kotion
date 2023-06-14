import { FC, memo, useState } from 'react';
import { getBlockFront } from '../BlockStream/getBlockFront';
import { IReplaceBlocksOptions } from '../BlockStream/types';
import PlainText from '../PlainText';

import * as Atom from './atoms';
import { NotionBlockItem } from '../../helpers';

interface Props {
  data: any,
  replacers: IReplaceBlocksOptions,
}

const hasChildren = (data: any) => {
  return data.has_children && data.children && Array.isArray(data.children);
};

const Loop: FC<Props> = ({data, replacers}) => {
  if (hasChildren(data)) {
    return (
      <Atom.ChildrenContainer>
        {data.children.map((childBlock: NotionBlockItem) => {
          return (
            <>
              {getBlockFront({
                block: childBlock,
                replacers,
              })}
            </>
          );
        })}
      </Atom.ChildrenContainer>
    );
  }

  const content = data.toggle?.rich_text;

  return <PlainText text={content} />;
};

// ::
const BlockToggle: FC<Omit<Props, 'ref'>> = ({ data, replacers }) => {
  const [isOpen, setIsOpen] = useState(false);
  const content = data.toggle?.rich_text;

  if (content?.length === 0) return null;

  if (!data.has_children) {
    return <PlainText text={content} />;
  }

  return (
    <div>
      <span
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        style={{ cursor: 'pointer' }}
      >
        {`(${isOpen ? '-' : '+'}) `}
        <PlainText text={content} />
      </span>
      {isOpen && Loop({ data, replacers })}
    </div>
  );
};

export default memo(BlockToggle);
