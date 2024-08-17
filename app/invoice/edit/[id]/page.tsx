"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getInvoice, updateInvoice, Invoice, Item } from "../../../db";
import ClassicLedger from "@/app/Templates/ClassicLedger";
import Layout from "@/app/layout/Layout";
import CancelIcon from "@/app/icons/CancelIcon";

const EditInvoice: React.FC = () => {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [items, setItems] = useState<Item[]>([
    { itemName: "", quantity: 1, rate: 0, amount: 0 },
  ]);
  const params = useParams();
  const id = params.id;
  const [logo, setLogo] = useState<string | null>(null);

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
      alert("Invoice updated!");
    }
  };

  const handleChange = (field: keyof Invoice, value: any) => {
    if (invoice) {
      setInvoice({ ...invoice, [field]: value });
    }
  };

  const calculateSubtotal = () => {
    return invoice?.items?.reduce((acc, item) => acc + item.amount, 0) || 0;
  };

  // const handleItemChange = (
  //   index: number,
  //   field: keyof Item,
  //   value: string | number
  // ) => {
  //   const updatedItems = invoice?.items?.map((item, i) => {
  //     if (i === index) {
  //       const newItem = { ...item, [field]: value };
  //       newItem.amount = newItem.quantity * newItem.rate;
  //       return newItem;
  //     }
  //     return item;
  //   });
  //   setItems(updatedItems);
  // };

  const handleItemChange = (
    index: number,
    field: keyof Item,
    value: string | number
  ) => {
    if (invoice) {
      const updatedItems = invoice.items.map((item, i) => {
        if (i === index) {
          const newItem = { ...item, [field]: value };
          newItem.amount = newItem.quantity * newItem.rate;
          return newItem;
        }
        return item;
      });
      setInvoice({ ...invoice, items: updatedItems });
    }
  };

  // const handleAddItem = () => {
  //   if (invoice) {
  //     const newItems = [
  //       ...invoice.items,
  //       { itemName: "", quantity: 1, rate: 0, amount: 0 },
  //     ];
  //     setInvoice({ ...invoice, items: newItems });
  //   }
  // };
  const handleAddItem = () => {
    if (invoice) {
      const newItems = [
        ...(invoice.items || []), // Ensure items is an array
        { itemName: "", quantity: 1, rate: 0, amount: 0 },
      ];
      setInvoice({ ...invoice, items: newItems });
    }
  };
  

  const handleDeleteItem = (index: number) => {
    if (invoice) {
      const newItems = invoice.items.filter((_, i) => i !== index);
      setInvoice({ ...invoice, items: newItems });
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newLogo = reader.result as string;
        setLogo(newLogo);
        if (invoice) {
          setInvoice({ ...invoice, logo: newLogo });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!invoice) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="grid sm:grid-cols-2 sm:mt-20">
        <div className="space-y-4 bg-white sm:p-5">
          <div className="grid sm:grid-cols-2 grid-cols-1 w-full gap-3">
            <div className="">
              <label className="mb-1.5 block text-[15px] font-medium text-gray-700">
                Logo
              </label>
              <div className="relative flex items-center gap-3 p-3 border rounded-lg cursor-pointer bg-white">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.125 13.2212V2.40875L5.2125 5.32125L4.3275 4.42375L8.75 0L13.1737 4.42375L12.2888 5.3225L9.375 2.40875V13.2212H8.125ZM2.02 17.5C1.44417 17.5 0.96375 17.3075 0.57875 16.9225C0.19375 16.5375 0.000833333 16.0567 0 15.48V12.4513H1.25V15.48C1.25 15.6725 1.33 15.8492 1.49 16.01C1.65 16.1708 1.82625 16.2508 2.01875 16.25H15.4813C15.6729 16.25 15.8492 16.17 16.01 16.01C16.1708 15.85 16.2508 15.6733 16.25 15.48V12.4513H17.5V15.48C17.5 16.0558 17.3075 16.5363 16.9225 16.9213C16.5375 17.3063 16.0567 17.4992 15.48 17.5H2.02Z"
                    fill="black"
                  />
                </svg>

                <div>
                  <span className="text-gray-700 block">Upload File</span>
                  <span className="text-gray-700 block text-xs font-thin">
                    JPG, JPEG,PNG, less than 2MB
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block">Company Name</label>
              <input
                type="text"
                name="companyName"
                className="border py-2.5 px-3 rounded w-full"
                placeholder="Company Name"
                value={invoice?.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1.5 block">Bill To</label>
              <input
                type="text"
                name="billTo"
                className="border py-2.5 px-3 rounded w-full"
                placeholder="Bill To"
                value={invoice?.billTo}
                onChange={(e) => handleChange("billTo", e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1.5 block">Company Address</label>
              <input
                type="text"
                name="companyAddress"
                className="border py-2.5 px-3 rounded w-full"
                placeholder="Company Address"
                value={invoice?.companyAddress}
                onChange={(e) => handleChange("companyAddress", e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1.5 block">Date Issued</label>
              <input
                type="date"
                name="dateIssued"
                className="border py-2.5 px-3 rounded w-full"
                placeholder="Date Issued"
                value={invoice?.dateIssued}
                onChange={(e) => handleChange("dateIssued", e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1.5 block">Payment Terms</label>
              <input
                type="date"
                name="paymentTerms"
                className="border py-2.5 px-3 rounded w-full"
                placeholder="Payment Terms"
                value={invoice?.paymentTerms}
                onChange={(e) => handleChange("paymentTerms", e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1.5 block">Currency</label>
              <input
                type="text"
                name="currency"
                className="border py-2.5 px-3 rounded w-full"
                placeholder="Currency"
                value={invoice?.currency}
                onChange={(e) => handleChange("currency", e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1.5 block">Status</label>
              <select
                name="status"
                className="border py-2.5 px-3 rounded w-full"
                value={invoice?.status}
                onChange={(e) =>
                  handleChange(
                    "status",
                    e.target.value as "draft" | "pending" | "paid"
                  )
                }
              >
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 bg-[#F8FBFF] border p-2 rounded-lg">
            <div className="flex w-full">
              <span className="block sm:w-2/5">Item</span>
              <span className="block sm:w-1/5">Rate</span>
              <span className="block sm:w-1/5">Qty</span>
              <span className="block sm:w-1/5">Amount</span>
              <span className="block">&nbsp;</span>
            </div>
            {invoice?.items?.map((item, index) => (
              <div key={index} className="flex items-center gap-3 relative">
                <input
                  type="text"
                  className="border py-2 px-3 rounded sm:w-2/5 w-full"
                  placeholder="Item Name"
                  value={item.itemName}
                  onChange={(e) =>
                    handleItemChange(index, "itemName", e.target.value)
                  }
                />
                <input
                  type="number"
                  className="border py-2 px-3 rounded sm:w-1/5 w-full"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", Number(e.target.value))
                  }
                />
                <input
                  type="number"
                  className="border py-2 px-3 rounded sm:w-1/5 w-full"
                  placeholder="Rate"
                  value={item.rate}
                  onChange={(e) =>
                    handleItemChange(index, "rate", Number(e.target.value))
                  }
                />
                <input
                  type="number"
                  className="border py-2 px-3 rounded sm:w-1/5 w-full"
                  placeholder="Amount"
                  value={item.amount}
                  readOnly
                />
                <button
                  type="button"
                  onClick={() => handleDeleteItem(index)}
                  className=""
                >
                  <CancelIcon />
                </button>
              </div>
            ))}
            <div className="flex justify-center items-center w-full">
              <button
                type="button"
                onClick={handleAddItem}
                className=" text-[#0D5EF9] font-medium flex flex-col items-center"
              >
                <span className="w-8 h-8 mb-1 flex justify-center items-center rounded-full bg-[#0D5EF9] text-white shadow">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 9C18 9.15236 17.9395 9.29848 17.8317 9.40621C17.724 9.51394 17.5779 9.57447 17.4255 9.57447H9.57447V17.4255C9.57447 17.5779 9.51394 17.724 9.40621 17.8317C9.29848 17.9395 9.15236 18 9 18C8.84764 18 8.70152 17.9395 8.59379 17.8317C8.48606 17.724 8.42553 17.5779 8.42553 17.4255V9.57447H0.574468C0.42211 9.57447 0.275991 9.51394 0.168258 9.40621C0.0605241 9.29848 0 9.15236 0 9C0 8.84764 0.0605241 8.70152 0.168258 8.59379C0.275991 8.48606 0.42211 8.42553 0.574468 8.42553H8.42553V0.574468C8.42553 0.42211 8.48606 0.275991 8.59379 0.168258C8.70152 0.0605241 8.84764 0 9 0C9.15236 0 9.29848 0.0605241 9.40621 0.168258C9.51394 0.275991 9.57447 0.42211 9.57447 0.574468V8.42553H17.4255C17.5779 8.42553 17.724 8.48606 17.8317 8.59379C17.9395 8.70152 18 8.84764 18 9Z"
                      fill="white"
                    />
                  </svg>
                </span>
                Add Item
              </button>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
            <div>
              <label className="mb-1.5 block">Notes/Payment Terms</label>
              <textarea
                name="notes"
                className="border py-2.5 px-3 rounded w-full"
                placeholder="Notes/Payment Terms"
                value={invoice?.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
              />
            </div>
            <div>
              <span className="block">SubTotal: {calculateSubtotal()}</span>
              <div>
                <label className="mb-1.5 block">Tax</label>
                <input
                  type="number"
                  name="tax"
                  className="border py-2.5 px-3 rounded w-full"
                  placeholder="Tax"
                  value={invoice?.tax}
                  onChange={(e) => handleChange("tax", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block">Discount</label>
                <input
                  type="number"
                  name="discount"
                  className="border py-2.5 px-3 rounded w-full"
                  placeholder="Discount"
                  value={invoice?.discount}
                  onChange={(e) => handleChange("discount", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block">Shipping Fee</label>
                <input
                  type="number"
                  name="shippingFee"
                  className="border py-2.5 px-3 rounded w-full"
                  placeholder="Shipping Fee"
                  value={invoice?.shippingFee}
                  onChange={(e) => handleChange("shippingFee", e.target.value)}
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Save Invoice
          </button>
        </div>
        <div className="p-5">
          <h1 className="text-slate-800 text-xl font-semibold py-4">
            Invoice Preview
          </h1>
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
            subtotal={calculateSubtotal()}
            total={
              calculateSubtotal() +
              (invoice?.tax || 0) +
              (invoice?.shippingFee || 0) -
              (invoice?.discount || 0)
            }
          />
        </div>
      </div>
    </Layout>
  );
};

export default EditInvoice;
