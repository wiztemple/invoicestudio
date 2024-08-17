import Image from "next/image";
import Link from "next/link";
import Layout from "./layout/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="sm:p-24 flex items-center h-full">
        <div>
          <h1 className="text-5xl font-semibold text-[#637D5A]">
            Seamless <span className="italic text-[#0EA654]">Invoicing</span> &{" "}
            <span className="italic text-[#0EA654]">Quoting</span> – <br /> From
            Draft to Delivery in Minutes!
          </h1>
          <h3 className="text-[#446838] py-3">
            Get from draft to delivery without the hassle. Our platform is
            designed to make invoicing <br />
            and quoting as fast and seamless as possible.
          </h3>

          <div className="flex pt-8 gap-5">
            <Link
              href="/invoice/new"
              className="flex justify-center items-center h-[164px] w-[200px] shadow-sm bg-white rounded-[5px] text-gray-800"
            >
              + Create Invoice
            </Link>
            <Link
              href="/invoice/new"
              className="flex justify-center items-center h-[164px] w-[200px] shadow-sm bg-white rounded-[5px] text-gray-800"
            >
              + Create Quotation
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
