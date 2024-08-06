import { NoStepTM, TMState } from './TMSearch'
import { TMExecutionResult, TMExecutionTrace } from './graph'
import { Node } from './interfaces/graph'
import { breadthFirstSearch } from './search'
import { buildProblem, newTape } from './utils'
import { TMProjectGraph } from 'frontend/src/types/ProjectTypes'
import { Preferences } from 'frontend/src/stores/usePreferencesStore'

export const generateTrace = (node: Node<TMState>): TMExecutionTrace[] => {
  const trace: TMExecutionTrace[] = []
  while (node.parent) {
    trace.push({
      to: node.state.id,
      tape: node.state.tape,
      read: node.state.read,
      write: node.state.write,
      direction: node.state.direction
    })
    node = node.parent
  }
  trace.push({
    to: node.state.id,
    tape: node.state.tape,
    read: null,
    write: null,
    direction: null
  })
  return trace.reverse()
}

export const simulateTM = (
  graph: TMProjectGraph,
  input: string,
  preferences: Preferences
): TMExecutionResult => {
  let problem = buildProblem(graph, input)
  if (!preferences.pauseTM) {
    problem = new NoStepTM(problem)
  }

  if (!problem) {
    return {
      accepted: false,
      tape: newTape(input),
      trace: []
    }
  }
  const result = breadthFirstSearch(problem)
  if (!result) {
    return {
      trace: [{ to: 0, read: null, tape: null, write: null, direction: null }],
      accepted: false,
      tape: newTape(input)
    }
  }
  return {
    accepted: result.state.isFinal,
    tape: result.state.tape,
    trace: generateTrace(result)
  }
}
