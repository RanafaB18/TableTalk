import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, HostListener, input } from '@angular/core';
import { ColumnDefinition, Sort } from '@features/table/models/table.types';
import { ClickOutsideDirective } from 'app/directives/click-outside.directive';

@Component({
  selector: '[app-table-head]',
  standalone: true,
  imports: [ClickOutsideDirective],
  templateUrl: './table-head.component.html',
  styleUrl: './table-head.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms ease-in')
      ]),
      transition(':leave', [
        animate('150ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class TableHeadComponent<T> {
  column = input.required<ColumnDefinition<T>>();
  sort = input.required<Sort>();
  selectedColumn = input<ColumnDefinition<T>>()
  
  isHovered: boolean = false;

  @HostListener('mouseenter') onMouseEnter() {
    this.isHovered = true;
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.isHovered = false;
  }
}
