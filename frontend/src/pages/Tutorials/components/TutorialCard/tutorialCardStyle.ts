import { styled } from 'goober'

export const CardContainer = styled('button')`
  margin: 3px;
  min-height: 240px;
  min-width: 366px;
  width: 20em;

  border-radius: .5rem;
  border: 3px solid transparent;
  overflow: hidden;
  user-select: none;
  font: inherit;
  color: inherit;
  cursor: pointer;
  padding: 0;
  text-align: left;

  padding: 6px;

  &:hover:not(:disabled), &:focus {
    border: 3px solid var(--primary);
    outline: none;
  }

  display: flex;
  flex-direction: column;
  flex-wrap: flex-start;

  background: var(--toolbar);
`

export const CardTitle = styled('div')`
  text-align: center;
  font-weight: bold;
  font-size: large;
`
