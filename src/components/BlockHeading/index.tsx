import { FC, memo } from 'react';
import PlainText from '../PlainText';

interface Props {
  data: any,
}

// ::
const BlockHeading: FC<Props> = ({ data }) => {
  const content = data[data.type]?.rich_text;

  switch(data?.type?.replace('heading_', 'h')) {
  case 'h3':
    return <h3><PlainText text={content} /></h3>;
  case 'h2':
    return <h2><PlainText text={content} /></h2>;
  case 'h1':
    return <h1><PlainText text={content} /></h1>;
  default:
    return null;
  }
};

export default memo(BlockHeading);
