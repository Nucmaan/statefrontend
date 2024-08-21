import React, { useEffect, useRef, useState } from "react";
import SideBar from "./SideBar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useParams } from "react-router-dom";
import api from "../api";
import { useSnackbar } from "notistack";

function RenterInvoice() {
  const [invoiceInfo, setInvoiceInfo] = useState(null);
  const { id } = useParams();
  const pdfRef = useRef();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchBillInfo = async () => {
      try {
        const response = await api.get(`/api/MyHome2U/bills/GetSingleBill/${id}`);
        setInvoiceInfo(response.data.bill);
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Server error";
        enqueueSnackbar(errorMessage, { variant: "error" });
      }
    };
    fetchBillInfo();
  }, [id, enqueueSnackbar]);

  const downloadInvoice = () => {
    const input = pdfRef.current;
    const downloadButton = document.getElementById("downloadButton");

    downloadButton.style.display = "none";

    const isMobile = window.innerWidth <= 768;
    const scale = isMobile ? 2 : 2.5;  // Adjust scale

    html2canvas(input, {
        backgroundColor: "#ffffff",
        scale: scale,
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight,
    }).then((canvas) => {
        const imageData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("portrait", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        while (heightLeft > 0) {
            pdf.addImage(imageData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
            if (heightLeft > 0) {
                position -= pdfHeight;
                pdf.addPage();
            }
        }

        pdf.save("invoice.pdf");

        downloadButton.style.display = "block";
    });
};


  if (!invoiceInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-1 bg-black">
        <SideBar />
        <div className="flex-1 bg-white p-6 lg:p-10">
          <div className="max-w-full mx-auto p-8 rounded-lg shadow-lg" style={{ backgroundColor: "white" }} ref={pdfRef}>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 border-b pb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900">INVOICE</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Date: {new Date(invoiceInfo.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-6 lg:mt-0 lg:text-right">
                <h1 className="text-3xl font-semibold text-gray-800">MyHome2U</h1>
                <p className="text-sm text-gray-600 mt-1">+601113323658</p>
                <p className="text-sm text-gray-600">123 KL CITY</p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mb-10">
              <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Billed To:</h2>
                <p className="text-gray-800">{invoiceInfo.user.name}</p>
                <p className="text-gray-800">{invoiceInfo.user.email}</p>
                <p className="text-gray-800">{invoiceInfo.user.phone}</p>
              </div>
              <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Invoice Details:</h2>
                <p className="text-gray-800">Invoice Number: #{invoiceInfo._id}</p>
                <p className="text-gray-800">Due Date: {new Date(invoiceInfo.dueDate).toLocaleDateString()}</p>
              </div>
              <div className="w-full lg:w-1/3 text-left lg:text-right">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Owner Information:</h2>
                <p className="text-gray-800">{invoiceInfo.owner.name}</p>
                <p className="text-gray-800">{invoiceInfo.owner.email}</p>
                <p className="text-gray-800">{invoiceInfo.owner.phone}</p>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-300 pb-2">Payment Summary</h2>
              <div className="flex justify-between text-gray-800">
                <p>Rent Amount:</p>
                <p className="font-semibold">${invoiceInfo.amount}</p>
              </div>
              <div className="flex justify-between text-gray-800">
                <p>Utilities:</p>
                <p className="font-semibold">${invoiceInfo.utilities}</p>
              </div>
              <div className="flex justify-between text-gray-800 border-t border-gray-300 mt-4 pt-2 font-bold">
                <p>Total:</p>
                <p>${invoiceInfo.total}</p>
              </div>
              <div className="flex justify-between text-gray-800 mt-2">
                <p>Payment Status:</p>
                <p className="font-semibold text-green-600">{invoiceInfo.status}</p>
              </div>
              <div className="flex justify-between text-gray-800 mt-2">
                <p>Payment Method:</p>
                <p className="font-semibold">{invoiceInfo.paymentMethod}</p>
              </div>
              <div className="flex justify-between text-gray-800 mt-2">
                <p>Payment Date:</p>
                <p className="font-semibold">{new Date(invoiceInfo.paymentDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="text-center border-t border-gray-300 pt-4">
              <p className="text-gray-500 text-sm italic mb-4">
                Note: This is a computer-generated document. No signature is required.
              </p>
              <button
                id="downloadButton"
                onClick={downloadInvoice}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none transition-colors duration-200"
              >
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RenterInvoice;
