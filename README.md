# TableTalk

TableTalk is an Angular application that displays data in a tabular format.

## Installation
```bash
   git clone https://github.com/RanafaB18/TableTalk.git
   cd TableTalk
   npm install
```

## Using the Table component
To use the table component in your Angular application, you need to define columns of type 
**ColumnDefinition**
 and provide the data as rows. The 
**ColumnDefinition**
 interface has the following properties:
 * **field**: (required): The key or property name of the data object that should be displayed in the column. If the headerName is not specified, the field name will also be used for the column name.
* **headerName**
 (optional): The header text to display for the column.

* **valueFormatter**` (optional): When defined, it is only used to render the content of the cells.

* **valueGetter**
 (optional): Figuring out what it could be used for.

Here is an example
```typescript
import { ColumnDefinition } from 'src/features/table/models/table.types';

// Define your columns
const columns: ColumnDefinition[] = [
  { field: 'name', headerName: 'Product Name' },
  { field: 'price', headerName: 'Price', valueFormatter: (params) => `$${params.price}` },
  // Add more columns as needed
];

// Provide your data as rows
const rows = [
  { name: 'Product 1', price: 9.99 },
  { name: 'Product 2', price: 14.99 },
  // Add more rows as needed
];
```
In the example above, the 
valueFormatter function is used to format the 
price column by prepending a dollar sign ($) to the value.

Then, in your component's template, you can use the table component like this:
```typescript
    <app-table [columns]="columns" [rows]="rows"></app-table>
```

## Built with Angular