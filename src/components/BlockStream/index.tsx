import { FC, Fragment, memo, useMemo } from 'react';
import { nanoid } from 'nanoid';

// types
import { BlockStreamProps } from './types';

// atoms
import * as Atom from './atoms';
import { getBlockFront } from './getBlockFront';

// ::
const BlockStream: FC<BlockStreamProps> = ({
  blocks,
  className,
  NoContentWarning,
  replaceBlockBookmark,
  replaceBlockCallout,
  replaceBlockChildDatabase,
  replaceBlockCode,
  replaceBlockHeading,
  replaceBlockListItem,
  replaceBlockParagraph,
  replaceBlockQuote,
  replaceBlockToggle,
}) => {
  const replacers = useMemo(() => ({
    replaceBlockBookmark,
    replaceBlockCallout,
    replaceBlockChildDatabase,
    replaceBlockCode,
    replaceBlockHeading,
    replaceBlockListItem,
    replaceBlockParagraph,
    replaceBlockQuote,
    replaceBlockToggle,
  }), [replaceBlockBookmark, replaceBlockCallout, replaceBlockChildDatabase, replaceBlockCode, replaceBlockHeading, replaceBlockListItem, replaceBlockParagraph, replaceBlockQuote, replaceBlockToggle]);

  if (!blocks) {
    return (
      <p>BlockStream recebeu \'blocks\' como undefined. Se essa mensagem não faz sentido para você, ignore.</p>
    );
  }

  if (!Array.isArray(blocks) || blocks?.length === 0) {
    return <div className={className}>{NoContentWarning ? <NoContentWarning /> : '(Não há conteúdo nesta página)'}</div>;
  }

  return (
    <div className={className}>
      {blocks.map(( block: any ) => {
        if (block.archived) return null;

        return (<Fragment key={nanoid()}>
          {getBlockFront({
            block,
            replacers,
          })}
          {block.children && block.type !== 'toggle' && Object.keys(block.children).map((childIndex: any) => {
            return (<Atom.ChildrenContainer key={nanoid()}>
              {getBlockFront({
                block: block.children[childIndex],
                replacers,
              })}
            </Atom.ChildrenContainer>);
          })}
        </Fragment>);
      })}
    </div>
  );
};

export default memo(BlockStream);
