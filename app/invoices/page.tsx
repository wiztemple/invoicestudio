"use client";

import React, { useEffect, useRef, useState } from "react";
import { getInvoices, deleteInvoice } from "../db";
import Link from "next/link";
import Layout from "../layout/Layout";

interface Invoice {
  id?: number;
  companyName: string;
  companyAddress: string;
  date: string;
}

const Invoices: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    const fetchInvoices = async () => {
      const allInvoices = await getInvoices();
      setInvoices(allInvoices);
    };

    fetchInvoices();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showMenu !== null &&
        dropdownRefs.current[showMenu] &&
        !dropdownRefs.current[showMenu]?.contains(event.target as Node)
      ) {
        setShowMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const handleDelete = async (id: number) => {
    await deleteInvoice(id);
    setInvoices(invoices.filter((invoice) => invoice.id !== id));
  };

  return (
    <Layout>
      <div className="w-full p-5 sm:mt-20">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-semibold">Saved Invoices</h1>
          <Link
            href="/invoice/new"
            className="block py-2 px-4 rounded bg-blue-600 text-white font-medium"
          >
            + Create Invoice
          </Link>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Invoice Number</th>
              <th className="py-2 px-4 text-left">Company Name</th>
              <th className="py-2 px-4 text-left">Company Address</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-t">
                <td className="py-2 px-4">{invoice.id}</td>
                <td className="py-2 px-4">{invoice.companyName}</td>
                <td className="py-2 px-4">{invoice.companyAddress}</td>
                <td className="py-2 px-4">
                  {invoice.date
                    ? new Date(invoice.date).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="py-2 px-4 relative">
                  <button
                    className="text-gray-600 hover:text-gray-900"
                    onClick={() =>
                      setShowMenu(
                        showMenu === invoice.id ? null : invoice.id ?? null
                      )
                    }
                  >
                    &hellip;
                  </button>
                  {showMenu === invoice.id && (
                    <div
                      ref={(el: HTMLDivElement | null) => {
                        if (invoice.id !== undefined) {
                          dropdownRefs.current[invoice.id] = el;
                        }
                      }}
                      className="absolute right-0 bg-white border rounded shadow-lg mt-2 z-10"
                    >
                      <Link
                        href={`/invoices/${invoice.id}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowMenu(null)}
                      >
                        View
                      </Link>
                      <Link
                        href={`/invoice/edit/${invoice.id}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowMenu(null)}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          handleDelete(invoice.id!);
                          setShowMenu(null);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          // Implement download functionality here
                          setShowMenu(null);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Download
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Invoices;
