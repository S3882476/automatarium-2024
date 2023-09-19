import { useState } from 'react';
import { useEvent } from '/src/hooks';
import { useProjectStore, usePDAVisualiserStore, useTMSimResultStore } from '/src/stores';
import { ContentContainer, StackContainer, StackItem, CloseStackButton } from './stackVisualiserStyle'

const PDAStackVisualiser = () => {
  // Opens and closes the stack tab within the visualiser
  const [showStackTab, setShowStackTab] = useState(true)
  // Opens and closes the entire stack visualiser component
  const [showStackVisualiser, setShowStackVisualiser] = useState(true)

  const traceIDx = useTMSimResultStore((s) => s.traceIDx)
  const stackInfo = usePDAVisualiserStore((s) => s.stack)
  const projectType = useProjectStore((s) => s.project.config.type)

  // Stack
  const stack: { element: string, key: number }[] = []
  let currentStack

  // Stores stack variables
  if (stackInfo?.trace) {
    if (stackInfo.trace[traceIDx]) {
      currentStack = stackInfo.trace[traceIDx].currentStack
      for (let i = 0; i < currentStack.length; i++) {
        stack.push({ element: currentStack[i], key: i })
      }
    }
  }

  // Displays the stack
  function displayStack() {
    return stack
      .slice(0)
      .reverse()
      .map((x) => {
        return <StackItem key={x.key}>{x.element}</StackItem>
      })
  }

  useEvent('stackVisualiser:toggle', e => {
    setShowStackVisualiser(e.detail.state)
  })

  return (
    projectType === 'PDA' && showStackVisualiser && (
      <ContentContainer>
        Display Stack{' '}
        <CloseStackButton onClick={() => setShowStackTab((e) => !e)}>
          {showStackTab ? '-' : '+'}
        </CloseStackButton>
        {showStackTab
          ? (
            <StackContainer>
              <h3>Stack</h3>
              <StackContainer>
                {displayStack()}
              </StackContainer>
            </StackContainer>
          )
          : null}
      </ContentContainer>
    )
  )
}

export default PDAStackVisualiser