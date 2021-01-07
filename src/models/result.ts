type Ok<O> = { tag: "ok"; val: O };
type Err<E> = { tag: "err"; err: E };
export type Result<O, E> = Ok<O> | Err<E>;

export function newErr<O, E>(err: E): Result<O, E> {
  const errInstance: Err<E> = { tag: "err", err };
  return errInstance;
}

export function newOk<O, E>(val: O): Result<O, E> {
  const okInstance: Ok<O> = { tag: "ok", val };
  return okInstance;
}

export function match<T, O, E>(input: Result<O, E>, ok: (ok: O) => T, err: (err: E) => T) {
  switch (input.tag) {
    case "ok":
      return ok(input.val);
    case "err":
      return err(input.err);
    default:
      throw new Error("Unreachable");
  }
}
