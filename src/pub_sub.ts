export default class Result<T> {
  private ok: T | null = null;
  private err: string | null = null;

  private constructor(ok: T | null, err: string | null) {
    this.ok = ok;
    this.err = err;
  }

  public is_ok(): boolean {
    return this.ok !== null;
  }

  public unwrap(): T | string {
    if (this.is_ok()) {
      return this.ok as T;
    } else {
      return this.err as string;
    }
  }

  public static from_err(err: string) {
    return new Result(null, err);
  }

  public static from_ok<T>(ok: T) {
    return new Result(ok, null);
  }
}
