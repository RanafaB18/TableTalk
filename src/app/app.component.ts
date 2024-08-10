import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TableComponent } from '@features/table/table.component';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom,  } from 'rxjs';
import { ApiResponse, ColumnDefinition, Product } from '@features/table/models/table.types';
import { HttpClient } from '@angular/common/http';
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
  #http = inject(HttpClient);
  tableQuery = injectQuery(() => ({
    queryKey: ['table-data'],
    queryFn: () =>
      lastValueFrom(
        this.#http.get<ApiResponse<Product>>('https://dummyjson.com/c/1617-ea5f-4a78-8c54')
      ),
  }));
  columns: ColumnDefinition<Product>[] = [
    {
      field: 'name',
      headerName: 'Product',
    },
    {
      field: 'price',
      headerName: 'Price',
      valueFormatter: ({ price }) => {
        return '$ ' + price.toString();
      },
    },
    {
      field: 'category',
      headerName: 'Category',
      valueFormatter: ({ category }) => {
        return category;
      },
    },
    {
      field: 'stock',
      headerName: 'Stock',
      valueFormatter: ({ stock }) => {
        return stock.toString();
      },
    },
    {
      field: 'rating',
      headerName: 'Rating',
    }
  ];
}
