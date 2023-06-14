import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;
  cursor: text;
`;

export const LanguageTag = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  text-transform: uppercase;
  font-size: 10px;
  background-color: rgba(0, 0, 0, .15);
  padding: 2px 4px;
  cursor: default;
  pointer-events: none;
`;
