"use client";

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getInvoice, Invoice } from '../../db';

const InvoiceDetail: React.FC = () => {
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  const params = useParams();
  const id = params.id;


  useEffect(() => {
    if (id) {
      const fetchInvoice = async () => {
        const fetchedInvoice = await getInvoice(Number(id));
        setInvoice(fetchedInvoice || null);
      };

      fetchInvoice();
    }
  }, [id]);

  if (!invoice) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Invoice Details</h1>
      <div>
        {invoice.logo && <img src={invoice?.logo} alt="Company Logo" />}
        <h2>Company Name: {invoice?.companyName}</h2>
        <h3>Address: {invoice?.companyAddress}</h3>
        <p>Date Issued: {invoice?.dateIssued}</p>
        <p>Payment Terms: {invoice?.paymentTerms}</p>
        <p>Bill To: {invoice?.billTo}</p>
        <p>Status: {invoice?.status}</p>
        <p>Invoice Number: {invoice?.invoiceNumber}</p>
        <p>Currency: {invoice?.currency}</p>
        <p>Notes: {invoice?.notes}</p>
        <h3>Items:</h3>
        <ul>
          {invoice?.items?.map((item, index) => (
            <li key={index}>
              {item?.itemName} - Quantity: {item?.quantity} - Rate: {item?.rate} - Amount: {item?.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InvoiceDetail;
