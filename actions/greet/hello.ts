import type { WindforceContext } from "windforce-client";
import { makeGreeting } from "../../lib/greeting";

// Declared in schemas/greet.hello.input.json — the console renders a typed
// form from it. The platform does not validate input yet; narrow it yourself.
interface HelloInput {
  name?: string;
  shout?: boolean;
}

export async function hello(ctx: WindforceContext) {
  const input = (ctx.input ?? {}) as HelloInput;
  const name = typeof input.name === "string" && input.name.trim() !== "" ? input.name.trim() : "windforce";
  ctx.logger.info("greeting", name);

  return {
    greeting: makeGreeting(name, input.shout ?? false),
    action: ctx.action,
    trigger: ctx.trigger.kind,
    actor: ctx.actor.email,
  };
}
