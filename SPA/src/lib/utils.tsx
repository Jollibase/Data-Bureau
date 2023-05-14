import { camelCase, snakeCase, isArray, transform, isObject } from 'lodash'

export const camelize = (obj: Record<string, unknown>) =>
  transform(
    obj,
    (result: Record<string, unknown>, value: unknown, key: string, target) => {
      const camelKey = isArray(target) ? key : camelCase(key)
      result[camelKey] = isObject(value)
        ? camelize(value as Record<string, unknown>)
        : value
    },
  )

export const snakify = (obj: Record<string, unknown>) => {
  return transform(
    obj,
    (result: Record<string, unknown>, value: unknown, key: string, target) => {
      const camelKey = isArray(target) ? key : snakeCase(key)
      result[camelKey] = isObject(value)
        ? snakify(value as Record<string, unknown>)
        : value
    },
  )
}
