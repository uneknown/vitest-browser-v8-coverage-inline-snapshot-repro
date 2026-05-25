import { mkdir, readFile, writeFile } from 'node:fs/promises'

const functionCount = 100_000
const calledFunctionCount = 200

const helpers = Array.from(
  { length: functionCount },
  (_, index) => `function f${index}(value: number) { return value + ${index} }`,
).join('\n')

const calls = Array.from(
  { length: calledFunctionCount },
  (_, index) => `  value = f${index}(value)`,
).join('\n')

const template = await readFile('src/inline-snapshot.template.ts', 'utf8')
const test = template
  .replace('__HELPERS__', helpers)
  .replace('__CALLS__', calls)

await mkdir('src', { recursive: true })
await writeFile('src/inline-snapshot.generated.test.ts', test)
