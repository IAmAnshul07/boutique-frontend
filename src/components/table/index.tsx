import React from "react";

interface Column {
  header: string;
  accessor: string;
  render?: (row: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
  handleEdit?: (row: any) => void;
  handleDelete?: (id: any) => void;
}

const Table: React.FC<TableProps> = ({ columns, data, handleEdit, handleDelete }) => {
  console.log("data ->", data);

  return (
    <div className="overflow-x-auto m-5">
      <table className="min-w-full divide-y divide-[#d3d4d7] border border-[#d3d4d7]">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th key={column.accessor} scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {column.header}
              </th>
            ))}
            {(handleEdit || handleDelete) && (
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-[#d3d4d7]">
          {data &&
            data?.map((row) => (
              <tr key={row.id}>
                {columns.map((column) => (
                  <td key={column.accessor} className="px-6 py-4 whitespace-nowrap">
                    {column.render ? column.render(row) : row[column.accessor]}
                  </td>
                ))}
                {(handleEdit || handleDelete) && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    {handleEdit && (
                      <button onClick={() => handleEdit(row)} className="btn btn-ghost btn-xs text-indigo-600 hover:text-indigo-900">
                        Edit
                      </button>
                    )}
                    {handleDelete && (
                      <button onClick={() => handleDelete(row.id)} className="btn btn-ghost btn-xs text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
