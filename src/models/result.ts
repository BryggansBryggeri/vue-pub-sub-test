export type Ok<O> = { tag: "ok"; val: O };
export type Err<E> = { tag: "err"; error: E };
export type Result<O, E> = Ok<O> | Err<E>;

export function match<T, O, E>(input: Result<O, E>, ok: (ok: O) => T, err: (err: E) => T) {
  switch (input.tag) {
    case "ok":
      return ok(input.val);
    case "err":
      return err(input.error);
    default:
      throw new Error("Unreachable");
  }
}
