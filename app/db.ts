

import { openDB } from 'idb';

export interface Item {
  itemName: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id?: number;
  companyName: string;
  companyAddress: string;
  date?: string;
  logo: string | null;
  dateIssued: string;
  paymentTerms: string;
  items: Item[];
  currency: string;
  notes: string;
  billTo: string;
  status: 'draft' | 'pending' | 'paid';
  invoiceNumber: string;
  tax: number;
  discount: number;
  shippingFee: number;
  subtotal: number;
  total: number;
}

const dbPromise = typeof window !== 'undefined' && openDB('invoiceDB', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('invoices')) {
      db.createObjectStore('invoices', { keyPath: 'id', autoIncrement: true });
    }
  },
});

export const addInvoice = async (invoice: Invoice) => {
  if (!dbPromise) return;
  const db = await dbPromise;
  await db.add('invoices', invoice);
};

export const updateInvoice = async (invoice: Invoice) => {
  if (!dbPromise) return;
  const db = await dbPromise;
  await db.put('invoices', invoice);
};

export const getInvoices = async (): Promise<Invoice[]> => {
  if (!dbPromise) return [];
  const db = await dbPromise;
  return db.getAll('invoices');
};

export const getInvoice = async (id: number): Promise<Invoice | undefined> => {
  if (!dbPromise) return undefined;
  const db = await dbPromise;
  return db.get('invoices', id);
};

export const deleteInvoice = async (id: number): Promise<void> => {
  if (!dbPromise) return;
  const db = await dbPromise;
  await db.delete('invoices', id);
};

export const getOrCreateInvoiceNumber = async (): Promise<string> => {
  if (!dbPromise) return generateInvoiceNumber();
  const db = await dbPromise;
  
  // Check if we have a stored invoice number
  const storedNumber = await db.get('invoices', 'currentInvoiceNumber');
  
  if (storedNumber) {
    return storedNumber.value;
  } else {
    const newNumber = generateInvoiceNumber();
    await db.put('invoices', { id: 'currentInvoiceNumber', value: newNumber });
    return newNumber;
  }
};

export const resetInvoiceNumber = async (): Promise<string> => {
  if (!dbPromise) return generateInvoiceNumber();
  const db = await dbPromise;
  
  const newNumber = generateInvoiceNumber();
  await db.put('invoices', { id: 'currentInvoiceNumber', value: newNumber });
  return newNumber;
};

const generateInvoiceNumber = (): string => {
  const randomDigits = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `INV-${randomDigits}`;
};