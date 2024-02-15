import { ReactElement } from "react";
import "./Table.css";
export interface ColumnProps<T> {
  key: string;
  title: string | ReactElement;
  render?: (column: ColumnProps<T>, item: T) => ReactElement;
}
type Props<T> = {
  columns: Array<ColumnProps<T>>;
  data?: T[];
};

const Table = <T,>({ data, columns }: Props<T>) => {
  const headers = columns.map((column, index) => {
    return (
      <th key={`headCell-${index}`} className="!z-0">
        {column.title}
      </th>
    );
  });

  const rows = !data?.length ? (
    <tr>
      <td colSpan={columns.length} className="text-center">
        No data
      </td>
    </tr>
  ) : (
    data?.map((row, index) => {
      return (
        <tr key={`row-${index}`}>
          {columns.map((column, index2) => {
            const value = column.render
              ? column.render(column, row as T)
              : (row[column.key as keyof typeof row] as string);

            return <td key={`cell-${index2}`}>{value}</td>;
          })}
        </tr>
      );
    })
  );

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead className="bg-slate-400 text-black">
          <tr>{headers}</tr>
        </thead>

        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default Table;
