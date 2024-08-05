// import { openDB } from 'idb';

// export interface Item {
//   itemName: string;
//   quantity: number;
//   rate: number;
//   amount: number;
// }

// export interface Invoice {
//   id?: number;
//   companyName: string;
//   companyAddress: string;
//   date: string;
//   logo: string | null;
//   dateIssued: string;
//   paymentTerms: string;
//   items: Item[];
//   currency: string;
//   notes: string;
//   billTo: string;
//   status: 'draft' | 'pending' | 'paid';
//   invoiceNumber: string;
// }

// const dbPromise = typeof window !== 'undefined' && openDB('invoiceDB', 1, {
//   upgrade(db) {
//     if (!db.objectStoreNames.contains('invoices')) {
//       db.createObjectStore('invoices', { keyPath: 'id', autoIncrement: true });
//     }
//   },
// });

// export const addInvoice = async (invoice: Invoice) => {
//   if (!dbPromise) return;
//   const db = await dbPromise;
//   await db.add('invoices', invoice);
// };

// export const updateInvoice = async (invoice: Invoice) => {
//   if (!dbPromise) return;
//   const db = await dbPromise;
//   await db.put('invoices', invoice);
// };

// export const getInvoices = async (): Promise<Invoice[]> => {
//   if (!dbPromise) return [];
//   const db = await dbPromise;
//   return db.getAll('invoices');
// };

// export const getInvoice = async (id: number): Promise<Invoice | undefined> => {
//   if (!dbPromise) return undefined;
//   const db = await dbPromise;
//   return db.get('invoices', id);
// };

// export const deleteInvoice = async (id: number): Promise<void> => {
//   if (!dbPromise) return;
//   const db = await dbPromise;
//   await db.delete('invoices', id);
// };

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
  date: string;
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
