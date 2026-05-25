import { expect, it } from 'vitest'

__HELPERS__

it('matches an inline snapshot in browser mode', () => {
  let value = 0
__CALLS__

  const started = performance.now()
  expect(value).toMatchInlineSnapshot('19900')
  console.log(`inline snapshot took ${Math.round(performance.now() - started)}ms`)
})
