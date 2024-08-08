import { JsonPipe, KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ColumnDefinition } from './models/table.types';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [JsonPipe, KeyValuePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> {
  tableData = input.required<T[] | undefined>();
  columns = input.required<ColumnDefinition<T>[]>();

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
}
