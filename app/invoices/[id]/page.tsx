"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { getInvoice, Invoice } from "../../db";
import Header from "@/app/components/Header";
import Link from "next/link";
import ClassicLedger from "@/app/Templates/ClassicLedger";
import ClassicLedgerPDF from "@/app/Templates/ClassicLedgerPDF";

const InvoiceDetail: React.FC = () => {
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  const params = useParams();
  const id = params.id;

  const invoiceRef = useRef<HTMLDivElement>(null);

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
    <div className="bg-linear-gradient sm:py-20">
      <Header />
      <div className="flex justify-between items-center w-full sm:px-10">
        <h1>Invoice Details</h1>
        <div className="flex items-center gap-3 pb-10">
          <Link
            href={`/invoice/edit/${invoice.id}`}
            className="block px-4 py-2 bg-blue-100 hover:bg-gray-100 rounded-lg text-blue-600"
          >
            Edit Invoice
          </Link>
           <PDFDownloadLink
            document={<ClassicLedgerPDF invoice={invoice} />}
            fileName={`Invoice_${invoice?.invoiceNumber}.pdf`}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg"
          >
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : 'Download Invoice'
            }
          </PDFDownloadLink>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="bg-white sm:w-[650px] w-full" ref={invoiceRef}>
          <ClassicLedger
            companyName={invoice?.companyName}
            companyAddress={invoice?.companyAddress}
            currency={invoice?.currency}
            tax={invoice?.tax}
            shippingFee={invoice?.shippingFee}
            dateIssued={invoice?.dateIssued}
            discount={invoice?.discount}
            status={invoice?.status}
            logo={invoice?.logo}
            notes={invoice?.notes}
            paymentTerms={invoice?.paymentTerms}
            items={invoice?.items}
            invoiceNumber={invoice?.invoiceNumber}
            billTo={invoice?.billTo}
            subtotal={invoice?.subtotal}
            total={invoice?.total}
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
