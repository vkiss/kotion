import styled from 'styled-components';


export const Code = styled.span`
  display: inline;
  background: rgba(135,131,120,0.15);
  color: #EB5757;
  padding: 0.2em 0.4em;
`;


export const HighlightBg = styled.span<{ color: string }>`
  background-color: red;
`;
