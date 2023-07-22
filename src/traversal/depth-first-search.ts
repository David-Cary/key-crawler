import { type AnyObject } from '../value-types'
import { type KeyValueVertex } from '../vertices/value-vertices'
import { ValueVertexFactory } from '../vertices/vertex-factory'
import { type TraversalState, createRootState, type TraversalStrategy } from './strategy'

/**
 * Types of search order execution.  Primarily used by depth first searches.
 * @enum {string}
 */
export enum SearchOrder {
  PREORDER = 'preorder',
  POSTORDER = 'postorder'
}

/**
 * Performs a depth first search on the target graph.  This means recursively processing descendants before moving on their parent's siblings.
 * @class
 * @implements {TraversalStrategy}
 * @property {SearchOrder} order - signals what search order should be used by the traversal
 */
export class DepthFirstSearch implements TraversalStrategy {
  order: SearchOrder

  constructor (order = SearchOrder.PREORDER) {
    this.order = order
  }

  traverse (
    root: AnyObject,
    callback?: (state: TraversalState) => void,
    converter?: ValueVertexFactory
  ): TraversalState {
    const state = createRootState(root)
    this.extendTraversal(state, callback, converter)
    state.completed = true
    return state
  }

  extendTraversal (
    state: TraversalState,
    callback?: (state: TraversalState) => void,
    converter: ValueVertexFactory = new ValueVertexFactory()
  ): void {
    if (state.completed) {
      return
    }
    const targetValue = state.route.target
    if (typeof targetValue === 'object' && targetValue !== null) {
      const targetObject = targetValue as AnyObject
      if (state.visited.includes(targetObject)) {
        return
      }
      state.visited.push(targetObject)
      if (this.order === SearchOrder.PREORDER && callback != null) {
        callback(state)
        if (state.completed) {
          return
        }
      }
      if (state.skipIteration === true) {
        state.skipIteration = false
      } else {
        const vertex = converter.createVertex(targetObject)
        if ('keyProvider' in vertex) {
          const keyedVertex = vertex as KeyValueVertex
          state.route.vertices.push(keyedVertex)
          for (const key of keyedVertex.keyProvider) {
            state.route.path.push(key)
            state.route.target = keyedVertex.getKeyValue(key)
            this.extendTraversal(state, callback, converter)
            if (state.completed) {
              return
            }
            state.route.path.pop()
          }
          state.route.vertices.pop()
          state.route.target = targetObject
        }
      }
      if (this.order === SearchOrder.POSTORDER && callback != null) {
        callback(state)
      }
    } else if (callback != null) {
      callback(state)
    }
  }
}
