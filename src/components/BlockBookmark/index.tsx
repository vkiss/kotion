import { FC, memo } from 'react';

import * as Atom from './atoms';
import Link from 'next/link';

interface Props {
  data: any,
}

// ::
const BlockCallout: FC<Props> = ({ data }) => {
  const content = data[data.type];

  return (
    <Atom.Container>
      <Link href={content.url}>{content.url}</Link>
    </Atom.Container>
  );
};

export default memo(BlockCallout);
