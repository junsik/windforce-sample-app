import type { WindforceContext } from "windforce-client";

// No meaningful schema ({} = any JSON): the console falls back to the raw
// JSON input editor. Returns the run context so you can see what a job gets.
export async function echo(ctx: WindforceContext) {
  return {
    ok: true,
    input: ctx.input ?? null,
    app: ctx.app,
    action: ctx.action,
    workspace: ctx.job.workspace,
    job_id: ctx.job.id,
    trigger: ctx.trigger.kind,
  };
}
