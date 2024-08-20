import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  usePagination,
} from "react-table";
import SideBar from "./SideBar";
import api from "../api";
import { useSnackbar } from "notistack";
function GlobalFilter({ globalFilter, setGlobalFilter }) {
  return (
    <div className="flex items-center bg-gray-100 p-2 rounded-lg">
      <input
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search bills..."
        className="px-4 py-2 w-full border-none bg-transparent text-gray-700 focus:outline-none"
      />
    </div>
  );
}

function RenterBills() {
  const [bills, setBills] = useState([]);
  const { user } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();

  const fetchBills = useCallback(async () => {
    try {
      const response = await api.get(
        `/api/MyHome2U/bills/getUserBills/${user._id}`
      );
      setBills(response.data.bills);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "You don't have any bills";
      enqueueSnackbar(errorMessage, { variant: "success" });
    }
  }, [user._id, enqueueSnackbar]);

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  const totalUnpaid = bills
    .filter((bill) => bill.status !== "Paid")
    .reduce((total, bill) => total + bill.total, 0);

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id", Cell: ({ row }) => row.index + 1 },
      { Header: "Description", accessor: "Description" },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: ({ value }) => `$${value.toFixed(2)}`,
      },
      {
        Header: "Utilities",
        accessor: "utilities",
        Cell: ({ value }) => `$${value.toFixed(2)}`,
      },
      {
        Header: "Total",
        accessor: "total",
        Cell: ({ value }) => `$${value.toFixed(2)}`,
      },
      {
        Header: "Due Date",
        accessor: "dueDate",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: "Payment Date",
        accessor: "paymentDate",
        Cell: ({ value }) =>
          value ? new Date(value).toLocaleDateString() : "N/A",
      },
      {
        Header: "Payment Method",
        accessor: "paymentMethod",
        Cell: ({ value }) => value || "N/A",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) =>
          value === "Paid" ? (
            <span className="text-green-500 font-bold">{value}</span>
          ) : (
            <span className="text-yellow-500 font-bold">{value}</span>
          ),
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) =>
          row.original.status !== "Paid" && (
            <Link to={`/user/Bills/Pay-Now/${row.original._id}`}>
              <button className="p-2 py-2 px-4 rounded-lg text-white text-sm bg-yellow-500 hover:bg-yellow-600 md:uppercase md:flex md:items-center">
                <i className="fas fa-credit-card mr-2"></i> Pay Now
              </button>
            </Link>
          ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setGlobalFilter,
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
    <div className="flex min-h-screen bg-white">
      <SideBar />
      <div className="overflow-x-auto w-full p-4 md:p-8">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              All Billing
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Total Outstanding Balance:{" "}
              <span
                className={`font-bold ${
                  totalUnpaid !== 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                ${totalUnpaid.toFixed(2)}
              </span>
            </p>
          </div>
          <GlobalFilter
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>
        {bills.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table
              {...getTableProps()}
              className="min-w-full bg-white border border-gray-200"
            >
              <thead className="bg-indigo-500 text-white">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        className="py-3 px-4 text-left text-white font-medium"
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="divide-y divide-gray-200"
              >
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} className="bg-gray-100 hover:bg-indigo-50 transition-colors">
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          className="py-4 px-4 text-gray-800"
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className={`bg-blue-500 text-white py-2 px-4 rounded-lg ${
                  !canPreviousPage
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-600"
                }`}
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>
              </span>
              <button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className={`bg-blue-500 text-white py-2 px-4 rounded-lg ${
                  !canNextPage
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-600"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-6">
            You don't have any bills at the moment.
          </div>
        )}
      </div>
    </div>
  );
}

export default RenterBills;
