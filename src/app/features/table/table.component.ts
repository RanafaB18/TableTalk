import { JsonPipe, KeyValuePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';
import { ColumnDefinition, Sort } from './models/table.types';
import { TableHeadComponent } from './components/table-head/table-head.component';
import { ClickOutsideDirective } from 'app/directives/click-outside.directive';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [JsonPipe, KeyValuePipe, TableHeadComponent, ClickOutsideDirective],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> {
  rows = input.required<T[] | undefined>();
  columns = input.required<ColumnDefinition<T>[]>();
  title = input<string>();

  selectedColumn = signal<ColumnDefinition<T> | undefined>(undefined);
  sort = signal<Sort>('Rand');
  
  sortableData = computed(() => this.rows());
  
  isOpen = false

  constructor() {
    effect(() => {
      if (this.selectedColumn()) {
        const field = this.selectedColumn()!.field;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.sortableData()?.sort((a: any, b: any) => {
          if (this.sort() === 'Asc') {
            return a[field] > b[field] ? 1 : -1;
          } else if (this.sort() === 'Desc') {
            return a[field] < b[field] ? 1 : -1;
          } else {
            return Math.random() > 0.5 ? 1 : -1;
          }
        })
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getCellData(column: ColumnDefinition<T>, data: any) {
    if (column.valueFormatter) {
      return column?.valueFormatter(data);
    } else if (column.valueGetter) {
      return column?.valueGetter(data);
    } else {
      return data[column.field];
    }
  }

  switchSortMetric(column: ColumnDefinition<T>) {
    if (column.field !== this.selectedColumn()?.field) {
      this.sort.set('Rand');
    }
    this.selectedColumn.set(column);
    switch (this.sort()) {
      case 'Asc': {
        this.sort.set('Desc');
        break;
      }
      case 'Desc': {
        this.sort.set('Rand');
        break;
      }
      default: {
        this.sort.set('Asc');
        break;
      }
    }
  }
}
