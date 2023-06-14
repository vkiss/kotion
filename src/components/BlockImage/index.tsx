/* eslint-disable @next/next/no-img-element */
import { FC, memo } from 'react';

interface Props {
  data: any,
}

// ::
const BlockImage: FC<Props> = ({ data }) => {
  if (data?.image?.file?.url && Array.isArray(data?.image?.caption)) {
    return <figure>
      <img
        src={data.image.file.url}
        alt={data.image.caption.join('')}
      />
    </figure>;
  }

  console.log(':: notion lib debug > (BockImage) data.image.file.url not found', { data });

  return null;
};

export default memo(BlockImage);
