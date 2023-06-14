import { FC, memo } from 'react';
import PlainText from '../PlainText';

import * as Atom from './atoms';

interface Props {
  data: any,
}

// ::
const BlockQuote: FC<Props> = ({ data }) => {
  const content = data.quote;

  return (
    <Atom.Container>
      <div><PlainText text={content?.rich_text} />;</div>
    </Atom.Container>
  );
};

export default memo(BlockQuote);

