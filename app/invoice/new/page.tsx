"use client";

import React, { useState } from "react";
import { addInvoice } from "@/app/db";
import Sidebar from "@/app/components/Sidebar";
import CancelIcon from "@/app/icons/CancelIcon";
import Input from "@/app/components/Input";

interface Item {
  itemName: string;
  quantity: number;
  rate: number;
  amount: number;
}

const NewInvoice: React.FC = () => {
  const [companyName, setCompanyName] = useState<string>("");
  const [companyAddress, setCompanyAddress] = useState<string>("");
  const [logo, setLogo] = useState<string | null>(null);
  const [dateIssued, setDateIssued] = useState<string>("");
  const [paymentTerms, setPaymentTerms] = useState<string>("");
  const [items, setItems] = useState<Item[]>([
    { itemName: "", quantity: 1, rate: 0, amount: 0 },
  ]);
  const [currency, setCurrency] = useState<string>("USD");
  const [notes, setNotes] = useState<string>("");
  const [billTo, setBillTo] = useState<string>("");
  const [status, setStatus] = useState<"draft" | "pending" | "paid">("draft");
  const [invoiceNumber, setInvoiceNumber] = useState<string>(
    Date.now().toString()
  );

  const [tax, setTax] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [shippingFee, setShippingFee] = useState<number>(0);

  const calculateSubtotal = () => {
    return items.reduce((acc, item) => acc + item.amount, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + tax + shippingFee - discount;
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleItemChange = (
    index: number,
    field: keyof Item,
    value: string | number
  ) => {
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        const newItem = { ...item, [field]: value };
        newItem.amount = newItem.quantity * newItem.rate;
        return newItem;
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    setItems([...items, { itemName: "", quantity: 1, rate: 0, amount: 0 }]);
  };

  const handleDeleteItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    const invoice = {
      companyName,
      companyAddress,
      date: new Date().toISOString(),
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
      subtotal: calculateSubtotal(),
      total: calculateTotal(),
    };
    await addInvoice(invoice);
    alert("Invoice saved!");
  };

  return (
    <main className="bg-[#F8FBFF] flex">
      <div className="bg-white">
        <Sidebar />
      </div>
      <div className="grid sm:grid-cols-2">
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
            {/* <div>
              <label className="mb-1.5 block text-[15px] text-gray-700">Company Name</label>
              <input
                type="text"
                name="companyName"
                className="border py-2.5 px-3 rounded w-full placeholder:text-sm"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div> */}
            <div className="w-full max-w-xs">
              <Input
                label="Company Name"
                placeholder="Company Name"
                value={companyName}
                inputName="companyName"
                onChange={setCompanyName}
                type="text"
              />
            </div>
            <div>
              <label className="mb-1.5 block">Bill To</label>
              <input
                type="text"
                name="billTo"
                className="border py-2.5 px-3 rounded w-full"
                placeholder="Bill To"
                value={billTo}
                onChange={(e) => setBillTo(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1.5 block">Company Address</label>
              <input
                type="text"
                name="companyAddress"
                className="border py-2.5 px-3 rounded w-full"
                placeholder="Company Address"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1.5 block">Date Issued</label>
              <input
                type="date"
                name="dateIssued"
                className="border py-2.5 px-3 rounded w-full"
                placeholder="Date Issued"
                value={dateIssued}
                onChange={(e) => setDateIssued(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1.5 block">Payment Terms</label>
              <input
                type="date"
                name="paymentTerms"
                className="border py-2.5 px-3 rounded w-full"
                placeholder="Payment Terms"
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1.5 block">Currency</label>
              <input
                type="text"
                name="currency"
                className="border py-2.5 px-3 rounded w-full"
                placeholder="Currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1.5 block">Status</label>
              <select
                name="status"
                className="border py-2.5 px-3 rounded w-full"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "draft" | "pending" | "paid")
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
            {items.map((item, index) => (
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
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <div>
              <span className="block">
              SubTotal: {calculateSubtotal()}
              </span>
            <div>
              <label className="mb-1.5 block">Tax</label>
              <input
                type="number"
                name="tax"
                className="border py-2.5 px-3 rounded w-full"
                placeholder="Tax"
                value={tax}
                onChange={(e) => setTax(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="mb-1.5 block">Discount</label>
              <input
                type="number"
                name="discount"
                className="border py-2.5 px-3 rounded w-full"
                placeholder="Discount"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="mb-1.5 block">Shipping Fee</label>
              <input
                type="number"
                name="shippingFee"
                className="border py-2.5 px-3 rounded w-full"
                placeholder="Shipping Fee"
                value={shippingFee}
                onChange={(e) => setShippingFee(Number(e.target.value))}
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
                <span className="text-xs text-[#969AA0] font-medium">
                  Invoice No
                </span>
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
                <p className="text-sm text-[#1E1E1E]">
                  Date Issued: {dateIssued}
                </p>
                <p className="text-sm text-[#1E1E1E]">
                  Payment Terms: {paymentTerms}
                </p>
              </div>
            </div>

            <div className="border rounded-lg mt-8">
              <div className="flex w-full bg-[#3A7AF6] items-center py-2 px-3 sm:px-5 rounded-tl-lg rounded-tr-lg">
                <span className="block sm:w-2/5 text-sm text-white">Item</span>
                <span className="block sm:w-1/5 text-sm text-white">Rate</span>
                <span className="block sm:w-1/5 text-sm text-white">
                  Quantity
                </span>
                <span className="block sm:w-1/5 text-sm text-white">
                  Amount
                </span>
              </div>
              <ul>
                {items.map((item, index) => (
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
                    $8,000.00
                  </span>
                </div>
                <div className="sm:w-[250px] grid grid-cols-2 py-0.5">
                  <span className="text-sm text-[#9A9899]">Tax</span>
                  <span className="text-[#060A17] font-semibold text-sm">
                    $0.00
                  </span>
                </div>
                <div className="sm:w-[250px] grid grid-cols-2 py-0.5">
                  <span className="text-sm text-[#9A9899]">Discount</span>
                  <span className="text-[#060A17] font-semibold text-sm">
                    $0.00
                  </span>
                </div>
                <div className="sm:w-[250px] grid grid-cols-2 py-0.5">
                  <span className="text-sm text-[#9A9899]">Shipping Fee</span>
                  <span className="text-[#060A17] font-semibold text-sm">
                    $0.00
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
        </div>
      </div>
    </main>
  );
};

export default NewInvoice;
