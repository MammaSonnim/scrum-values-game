// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export type TODO_ANY = any

// TODO use it for IdT?
export type Brand<T, U> = T & { __brand: U }
