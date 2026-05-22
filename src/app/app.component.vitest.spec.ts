import { TestBed } from '@angular/core/testing'
import { describe, expect, it } from 'vitest'
import { AppComponent } from './app.component'

describe('AppComponent', () => {
  it('matches an inline snapshot', async () => {
    const fixture = TestBed.createComponent(AppComponent)

    fixture.detectChanges()
    await fixture.whenStable()

    expect(fixture.nativeElement.textContent.trim()).toMatchInlineSnapshot(`"inline snapshot repro"`)
  })
})
