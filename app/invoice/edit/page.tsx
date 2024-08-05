"use client";

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getInvoice, updateInvoice, Invoice } from '../../db';

const EditInvoice: React.FC = () => {
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

  const handleSave = async () => {
    if (invoice) {
      await updateInvoice(invoice);
      alert('Invoice updated!');
    }
  };

  const handleChange = (field: keyof Invoice, value: any) => {
    if (invoice) {
      setInvoice({ ...invoice, [field]: value });
    }
  };

  if (!invoice) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Invoice</h1>
      <input
        type="text"
        value={invoice.companyName}
        onChange={(e) => handleChange('companyName', e.target.value)}
      />
      <input
        type="text"
        value={invoice.companyAddress}
        onChange={(e) => handleChange('companyAddress', e.target.value)}
      />
      {/* Add other fields similarly */}
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditInvoice;
