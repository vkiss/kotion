import styled from 'styled-components';

export const ListItem = styled.p<{ isDone: boolean }>`
  ${(props) => props.isDone ? 'text-decoration: line-through;' : ''}
`;
