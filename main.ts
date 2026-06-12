// Entrypoint = assembly only. Each action handler lives in its own file;
// createApp dispatches on ctx.action. The "windforce-client" SDK is injected
// by the worker at run time — no package.json needed for it.
import { createApp } from "windforce-client";
import { bump } from "./actions/counter/bump";
import { echo } from "./actions/greet/echo";
import { hello } from "./actions/greet/hello";

export const main = createApp({
  actions: {
    "greet.hello": hello,
    "greet.echo": echo,
    "counter.bump": bump,
  },
});
