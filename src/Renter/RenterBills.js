import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination } from 'react-table';
import SideBar from "./SideBar";
import Swal from "sweetalert2";
import api from "../api";


function GlobalFilter({ globalFilter, setGlobalFilter }) {
  return (
    <div className="flex items-center bg-gray-100 p-2 rounded-lg">
      <input
        value={globalFilter || ''}
        onChange={e => setGlobalFilter(e.target.value)}
        placeholder="Search bills..."
        className="px-4 py-2 w-full border-none bg-transparent text-gray-700 focus:outline-none"
      />
    </div>
  );
}

function RenterBills() {
  const [bills, setBills] = useState([]);
  const { user } = useSelector((state) => state.user);

  const fetchBills = useCallback(async () => {
    try {
      const response = await api.get(`/api/MyHome2U/bills/getUserBills/${user._id}`);
      setBills(response.data.bills);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'server error',
        text: error.response?.data?.message || 'An unexpected error occurred. Please try again later.',
        showConfirmButton: true,
      });
    }
  }, [user._id]);

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  const totalUnpaid = bills
    .filter(bill => bill.status !== "Paid")
    .reduce((total, bill) => total + bill.total, 0);

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'id', Cell: ({ row }) => row.index + 1 },
      { Header: 'Description', accessor: 'Description' },
      { Header: 'Amount', accessor: 'amount', Cell: ({ value }) => `$${value.toFixed(2)}` },
      { Header: 'Utilities', accessor: 'utilities', Cell: ({ value }) => `$${value.toFixed(2)}` },
      { Header: 'Total', accessor: 'total', Cell: ({ value }) => `$${value.toFixed(2)}` },
      { Header: 'Due Date', accessor: 'dueDate', Cell: ({ value }) => new Date(value).toLocaleDateString() },
      { Header: 'Payment Date', accessor: 'paymentDate', Cell: ({ value }) => value ? new Date(value).toLocaleDateString() : 'N/A' },
      { Header: 'Payment Method', accessor: 'paymentMethod', Cell: ({ value }) => value || 'N/A' },
      { Header: 'Status', accessor: 'status', Cell: ({ value }) => value === "Paid" ? <span className="text-green-500 font-bold">{value}</span> : <span className="text-yellow-500 font-bold">{value}</span> },
      {
        Header: 'Actions', accessor: 'actions', Cell: ({ row }) => (
          row.original.status !== "Paid" && (
            <Link to={`/user/Bills/Pay-Now/${row.original._id}`}>
              <button className="bg-yellow-500 uppercase hover:bg-yellow-600 text-white py-2 px-4 rounded-lg text-sm flex items-center">
                <i className="fas fa-credit-card mr-2"></i> Pay Now
              </button>
            </Link>
          )
        )
      },
    ], []);

  const {
    getTableProps, getTableBodyProps, headerGroups, prepareRow, page,
    nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, state, setGlobalFilter
  } = useTable(
    {
      columns,
      data: bills,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, globalFilter } = state;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex flex-1">
        <SideBar />
        <div className="flex-1 bg-white p-6 shadow-lg">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">All Billing</h1>
              <p className="text-lg text-gray-600 mt-2">
                Total Outstanding Balance: <span className={`font-bold ${totalUnpaid !== 0 ? "text-red-500" : "text-green-500"}`}>${totalUnpaid.toFixed(2)}</span>
              </p>
            </div>
            <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
          </div>

          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table {...getTableProps()} className="min-w-full">
              <thead className="bg-gray-100 border-b-2">
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())} className="py-3 px-4 text-left text-gray-700 font-medium">
                        {column.render('Header')}
                        <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
                {page.map(row => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} className="hover:bg-gray-50">
                      {row.cells.map(cell => (
                        <td {...cell.getCellProps()} className="py-4 px-4 text-gray-800">
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-6">
              <button onClick={() => previousPage()} disabled={!canPreviousPage} className={`bg-blue-500 text-white py-2 px-4 rounded-lg ${!canPreviousPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}>
                Previous
              </button>
              <span className="text-gray-700">
                Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
              </span>
              <button onClick={() => nextPage()} disabled={!canNextPage} className={`bg-blue-500 text-white py-2 px-4 rounded-lg ${!canNextPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RenterBills;
