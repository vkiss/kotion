import { FC, Fragment, memo, useId, useMemo } from 'react';

import * as Atom from './atoms';

type Props = {
  text: TextObject | TextObject[],
}

type TextObject = {
  type: string,
  text: {
    content: string,
    link: string | null,
  },
  annotations: {
    bold: boolean,
    italic: boolean,
    strikethrough: boolean,
    underline: boolean,
    code: boolean,
    color: string,
  },
  plain_text: string,
  href: string | null,
}

// ::
const PlainText: FC<{ text: TextObject }> = ({ text }) => {
  const textContentId = useId();
  const textContent = useMemo(() => `${text.plain_text}`.split('\n').map((text: string, index: number) => {
    if (text === '') return null;

    return (
      <Fragment key={`${textContentId}-${index}`}>
        {index > 0 && <br />}
        {text}
      </Fragment>
    );
  }), [text.plain_text, textContentId]);

  if (text.href) {
    return <a className="visitor-link" href={text.href} target="_blank" rel="noreferrer">{textContent}</a>;
  }

  const bgColor = String(text.annotations?.color).split('_')[1] === 'background' ? String(text.annotations?.color).split('_')[0] : undefined;

  if (bgColor) return <Atom.HighlightBg color={bgColor}>{textContent}</Atom.HighlightBg>;

  if (text.annotations?.bold) return <strong>{textContent}</strong>;
  if (text.annotations?.underline) return <u>{textContent}</u>;
  if (text.annotations?.strikethrough) return <s>{textContent}</s>;
  if (text.annotations?.code) return <Atom.Code>{textContent}</Atom.Code>;

  return <>{textContent}</>;
};

const Container: FC<Props> = ({ text }) => {
  const id = useId();
  if (!text) return null;

  if (Array.isArray(text)) {
    return <>
      {text.map((t, i) => <PlainText key={`${id}-${t.plain_text}-${i}`} text={t} />)}
    </>;
  }

  return <PlainText text={text} />;
};

export default memo(Container);
