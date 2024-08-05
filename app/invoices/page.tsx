// "use client";

// import React, { useEffect, useState } from 'react';
// import { getInvoices } from '../db';
// import Link from 'next/link';

// interface Invoice {
//   id?: number;
//   companyName: string;
//   companyAddress: string;
//   date: string;
// }

// const Invoices: React.FC = () => {
//   const [invoices, setInvoices] = useState<Invoice[]>([]);

//   useEffect(() => {
//     const fetchInvoices = async () => {
//       const allInvoices = await getInvoices();
//       setInvoices(allInvoices);
//     };

//     fetchInvoices();
//   }, []);

//   return (
//     <div>
//       <div className="flex justify-between">
//         <h1>Saved Invoices</h1>
//         <Link href="/invoices/new" className="block py-2 px-4 rounded bg-blue-600 text-white font-medium">
//           + Create Invoice
//         </Link>
//       </div>
//       <ul>
//         {invoices.map((invoice) => (
//           <li key={invoice.id}>
//             <Link href={`/invoices/${invoice.id}`}>
//               {invoice.companyName} - {invoice.companyAddress} - {invoice.date}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Invoices;
"use client";

import React, { useEffect, useState } from "react";
import { getInvoices, deleteInvoice } from "../db";
import Link from "next/link";
import Sidebar from "../components/Sidebar";

interface Invoice {
  id?: number;
  companyName: string;
  companyAddress: string;
  date: string;
}

const Invoices: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      const allInvoices = await getInvoices();
      setInvoices(allInvoices);
    };

    fetchInvoices();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteInvoice(id);
    setInvoices(invoices.filter((invoice) => invoice.id !== id));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-5">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold">Saved Invoices</h1>
          <Link
            href="/invoice/new"
            className="block py-2 px-4 rounded bg-blue-600 text-white font-medium"
          >
            + Create Invoice
          </Link>
        </div>
        <ul>
          {invoices.map((invoice) => (
            <li key={invoice.id} className="flex justify-between items-center">
              <span>
                {invoice.companyName} - {invoice.companyAddress} -{" "}
                {invoice.date}
              </span>
              <div>
                <Link href={`/invoices/${invoice.id}`}>View Details</Link>
                <Link
                  href={`/invoice/edit/${invoice.id}`}
                  className="block py-1 px-2 rounded bg-yellow-600 text-white font-medium mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(invoice.id!)}
                  className="block py-1 px-2 rounded bg-red-600 text-white font-medium"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Invoices;
