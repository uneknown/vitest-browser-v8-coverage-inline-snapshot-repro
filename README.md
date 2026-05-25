# Vitest browser inline snapshot coverage repro

This is a plain Vitest browser-mode reproduction for slow inline snapshot
callsite resolution when V8 coverage is enabled.

```sh
npm install
npm run test
npm run test:coverage
```

Both commands run one test and print `inline snapshot took ...ms`.
The coverage run is slower because Vitest resolves inline snapshot callsites by
reading `error.stack`; with V8 coverage/profiling enabled, browser stack string
formatting can become much more expensive.

## Why is a generated file used?

The original issue was found in a small Angular component spec. The Angular
source test is small, but Angular's test builder transforms it into browser
chunks that include framework/build output and source-map metadata before
Vitest executes it.

A tiny plain Vitest source file stays tiny, so it does not naturally reproduce
the same browser stack-formatting cost. `generate-test.mjs` creates one larger
test module so the `toMatchInlineSnapshot()` call lives in a browser-loaded file
closer to Angular's transformed output.

The generated helpers are not additional tests. They are inert module content
used only to make plain Vitest hit the same class of slowdown without depending
on Angular.
