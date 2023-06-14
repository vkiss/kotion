import { FC, memo } from 'react';

interface Props {
  data: any,
}

// ::
const BlockChildDatabase: FC<Props> = ({ data }) => {
  return <p>CHILD_DATABASE: {`${data?.child_database?.title}`}</p>;
};

export default memo(BlockChildDatabase);

