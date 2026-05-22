import { ChangeDetectionStrategy, Component, signal } from '@angular/core'

@Component({
  selector: 'app-root',
  template: `
    <h1>{{ title() }}</h1>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly title = signal('inline snapshot repro')
}
