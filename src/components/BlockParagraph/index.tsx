import { FC, memo } from 'react';
import PlainText from '../PlainText';

interface Props {
  data: any,
}

// ::
const BlockParagraph: FC<Props> = ({ data }) => {
  const content = data.paragraph.rich_text;

  if (content?.length === 0) return null;

  return (
    <p>
      <PlainText text={content} />
    </p>
  );
};

export default memo(BlockParagraph);
