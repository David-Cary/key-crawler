import { type UntypedObject } from '../value-types'
import { type ValueVertex, PrimitiveVertex, ArrayVertex, ObjectVertex } from './value-vertices'

/**
 * These define what objects require special handling by a vertex factory.
 * @template T
 * @interface
 */
export interface VertexFactoryRule<T = unknown> {
  /**
   * Determines whether this rule applies to a given item
   * @function
   * @param {T} value - item to be evaluated
   * @returns {boolean} true if the rule should apply to the target value
   */
  checkValue: (value: T) => boolean
  /**
   * Creates a vertex to wrap the provided value
   * @function
   * @param {T} source - value to be wrapped
   * @returns {ValueVertex} resulting vertex for the provided value
   */
  createVertex: (source: T) => ValueVertex
}

/**
 * Wraps a provided value in an appropriate vertex given a certain set of rules.
 * @class
 * @property {Array<VertexFactoryRule<UntypedObject>>} objectRules - rules for any objects that require special handling, in order of descending priority
 */
export class ValueVertexFactory {
  objectRules?: Array<VertexFactoryRule<UntypedObject>>
  /**
   * @param {Array<VertexFactoryRule<UntypedObject>>} objectRules - rules to used by the factory for special object types
   */
  constructor (objectRules?: Array<VertexFactoryRule<UntypedObject>>) {
    this.objectRules = objectRules
  }

  createVertex (source: unknown): ValueVertex {
    if (typeof source === 'object' && source != null) {
      if (Array.isArray(source)) {
        return new ArrayVertex(source)
      }
      const sourceObject = source as UntypedObject
      if (this.objectRules != null) {
        for (const rule of this.objectRules) {
          if (rule.checkValue(sourceObject)) {
            return rule.createVertex(sourceObject)
          }
        }
      }
      return new ObjectVertex(sourceObject)
    }
    return new PrimitiveVertex(source)
  }
}
