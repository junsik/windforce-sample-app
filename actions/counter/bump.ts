import type { WindforceContext } from "windforce-client";

interface BumpInput {
  by?: number;
}

interface CounterState {
  count: number;
  lastRunAt: string | null;
}

// Persistent state demo: the counter survives across runs. The state key is
// per-action ({app}/{action}), so this counter is isolated from other actions.
// Try wiring it to a schedule (Triggers tab, e.g. "@every 1m") and watch the
// count grow. Last write wins — do not assume locking across concurrent runs.
export async function bump(ctx: WindforceContext) {
  const input = (ctx.input ?? {}) as BumpInput;
  const by = typeof input.by === "number" && Number.isFinite(input.by) ? Math.trunc(input.by) : 1;

  const prev = ((await ctx.state.get()) ?? { count: 0, lastRunAt: null }) as CounterState;
  const next: CounterState = { count: prev.count + by, lastRunAt: new Date().toISOString() };
  await ctx.state.set(next);

  ctx.logger.info("counter", prev.count, "->", next.count);
  return { previous: prev.count, current: next.count, by, lastRunAt: prev.lastRunAt };
}
