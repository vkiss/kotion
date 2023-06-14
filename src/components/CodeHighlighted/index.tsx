import { FC, memo } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import syntaxStyle from 'react-syntax-highlighter/dist/cjs/styles/hljs/nord';

import * as Atom from './atoms';

interface Props {
  code: string,
  language: string,
}

const CodeHighlighted: FC<Props> = ({ code, language }) => {
  return (
    <Atom.Container>
      <Atom.LanguageTag>{language}</Atom.LanguageTag>
      <SyntaxHighlighter
        language={language}
        style={syntaxStyle}
      >{code}</SyntaxHighlighter>
    </Atom.Container>
  );
};

export default memo(CodeHighlighted);

