import { FC, memo } from 'react';
import PlainText from '../PlainText';

import * as Atom from './atoms';

const Icon: FC<{ icon: any }> = ({ icon }) => {
  if (icon?.type !== 'external' && icon?.type && icon[icon.type]) {
    return <>{icon[icon.type]}</>;
  }

  return null;
};

interface Props {
  data: any,
}

// ::
const BlockCallout: FC<Props> = ({ data }) => {
  const content = data.callout;

  return (
    <Atom.Container>
      <Icon icon={content.icon} />
      <div><PlainText text={content.rich_text} /></div>
    </Atom.Container>
  );
};

export default memo(BlockCallout);

