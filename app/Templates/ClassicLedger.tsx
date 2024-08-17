"use client";

import React from "react";
import { Invoice } from "../db";

const ClassicLedger: React.FC<Invoice> = ({
  companyName,
  companyAddress,
  logo,
  dateIssued,
  paymentTerms,
  items,
  currency,
  notes,
  billTo,
  status,
  invoiceNumber,
  tax,
  discount,
  shippingFee,
  subtotal,
  total,
}) => {
  return (
    <div className="bg-white shadow-sm p-8 rounded-md border border-[#EAEDF0]">
      <div className="flex justify-between w-full items-center">
        {logo ? (
          <img
            src={logo}
            alt="Company Logo"
            className="mb-4 w-20 h-20 object-cover"
          />
        ) : (
          <span className="block text-[#3A7AF6] font-semibold text-xl">
            Logo Here
          </span>
        )}
        <div className="flex flex-col">
          <span className="text-xs text-[#969AA0] font-medium">Invoice No</span>
          <span className="text-xs text-[#3A7AF6] font-medium block mt-0.5">
            {invoiceNumber}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-x-3 pt-8 pb-10">
        <span className="block text-[10px] text-[#9A9899]">SUMMARY</span>
        <span className="w-full h-[1px] bg-[#F0EDEF] block"></span>
      </div>
      <div className="grid sm:grid-cols-3">
        <div>
          <h2 className="text-sm font-semibold text-gray-800">
            {companyName || "Company Name"}
          </h2>
          <p className="text-sm text-[#64676D] pt-2">Address</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-800">
            {billTo || "Bill To"}
          </h2>
          <h3 className="text-xs text-[#64676D]">
            {companyAddress || "Address"}
          </h3>
        </div>
        <div>
          <p className="text-sm text-[#1E1E1E]">Date Issued: {dateIssued}</p>
          <p className="text-sm text-[#1E1E1E]">
            Payment Terms: {paymentTerms}
          </p>
        </div>
      </div>

      <div className="border rounded-lg mt-8">
        <div className="flex w-full bg-[#3A7AF6] items-center py-2 px-3 sm:px-5 rounded-tl-lg rounded-tr-lg">
          <span className="block sm:w-2/5 text-sm text-white">Item</span>
          <span className="block sm:w-1/5 text-sm text-white">Rate</span>
          <span className="block sm:w-1/5 text-sm text-white">Quantity</span>
          <span className="block sm:w-1/5 text-sm text-white">Amount</span>
        </div>
        <ul>
          {items?.map((item, index) => (
            <li
              key={index}
              className="list-none flex items-center h-10 border-b border-b-[#EAEDF0] last-of-type:border-b-0 sm:px-5 px-3"
            >
              <span className="block sm:w-2/5 text-sm text-[#060A17] font-light">
                {item.itemName}
              </span>
              <span className="block sm:w-1/5 text-sm text-[#060A17] font-medium">
                {item.rate}
              </span>
              <span className="block sm:w-1/5 text-sm text-[#060A17] font-medium">
                {item.quantity}
              </span>
              <span className="block sm:w-1/5 text-sm text-[#060A17] font-medium">
                {item.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-end border-b border-b-[#EAEDF0] pb-8">
        <div className="pt-3">
          <div className="sm:w-[250px] grid grid-cols-2 py-0.5">
            <span className="text-sm text-[#9A9899]">SubTotal</span>
            <span className="text-[#060A17] font-semibold text-sm">
              {subtotal}
            </span>
          </div>
          <div className="sm:w-[250px] grid grid-cols-2 py-0.5">
            <span className="text-sm text-[#9A9899]">Tax</span>
            <span className="text-[#060A17] font-semibold text-sm">{tax}</span>
          </div>
          <div className="sm:w-[250px] grid grid-cols-2 py-0.5">
            <span className="text-sm text-[#9A9899]">Discount</span>
            <span className="text-[#060A17] font-semibold text-sm">
              {discount}
            </span>
          </div>
          <div className="sm:w-[250px] grid grid-cols-2 py-0.5">
            <span className="text-sm text-[#9A9899]">Shipping Fee</span>
            <span className="text-[#060A17] font-semibold text-sm">
              {shippingFee}
            </span>
          </div>
        </div>
      </div>

      <p>Status: {status}</p>
      <p>Currency: {currency}</p>
      <div className="bg-[#F7F7F7] rounded-lg p-5">
        <p>Notes: {notes}</p>
      </div>
    </div>
  );
};

export default ClassicLedger;
