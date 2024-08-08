import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableComponent } from '@features/table/table.component';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom, of } from 'rxjs';
import { mockTableData } from './utils/mockdata';
import { ColumnDefinition, Product } from '@features/table/models/table.types';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'TableTalk';

  tableQuery = injectQuery(() => ({
    queryKey: ['table-data'],
    queryFn: () =>
      lastValueFrom(
        // this.#http.get<ApiResponse>('https://dummyjson.com/c/1617-ea5f-4a78-8c54')
        of(mockTableData)
      ),
  }));
  columns: ColumnDefinition<Product>[] = [
    {
      field: 'name',
      headerName: 'Product',
      valueFormatter: ({ name }) => {
        return name + ' ss';
      },
      valueGetter: (value) => {
        return value.name + ' gg';
      },
    },
    {
      field: 'price',
      headerName: 'Price',
      valueFormatter: ({ price }) => {
        return price.toString();
      },
      valueGetter: (value) => {
        return value.price * 10;
      },
    },
    {
      field: 'category',
      headerName: 'Category',
      valueFormatter: ({ category }) => {
        return category;
      },
      valueGetter: (value) => {
        return value.price * 10;
      },
    },
    {
      field: 'stock',
      headerName: 'Stock',
      valueFormatter: ({ stock }) => {
        return stock.toString();
      },
      valueGetter: (value) => {
        return value.price * 10;
      },
    },
    {
      field: 'rating',
      headerName: 'Rating',
      valueFormatter: ({ rating }) => {
        return rating.toString();
      },
      valueGetter: (value) => {
        console.log('Val', value.price * 10);
        return value.price * 10;
      },
    },
    {
      field: 'date_added',
      headerName: 'Date Added',
      valueFormatter: ({ date_added }) => {
        return date_added.toString();
      },
      valueGetter: (value) => {
        return value.price * 10;
      },
    },
  ];
}
