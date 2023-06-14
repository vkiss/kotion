import { FC, memo } from 'react';

// components
import CodeHighlighted from '../CodeHighlighted';

// atoms
import * as Atom from './atoms';

interface Props {
  data: any,
}

// ::
const BlockCode: FC<Props> = ({ data }) => {
  const content = data[data.type];

  return (
    <Atom.Container>
      <CodeHighlighted
        language={content.language}
        code={content.rich_text.map((item: any) => item.plain_text).join('')}
      />
    </Atom.Container>
  );
};

export default memo(BlockCode);
