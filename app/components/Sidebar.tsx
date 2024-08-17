import Link from "next/link";
import InvoiceIcon from "../icons/InvoiceIcon";
import TemplateIcon from "../icons/TemplateIcon";
import LayoutIcon from "../icons/LayoutIcon";
import ColorIcon from "../icons/ColorIcon";

const Sidebar = () => {
  return (
    <aside className="h-screen w-[120px] fixed top-0 left-0 border-r border-r-[#D8DEE8] pt-20 px-2 transition-transform -translate-x-full bg-snow-100 sm:translate-x-0">
      <button className="px-5 py-3 bg-transparent block w-full rounded-lg hover:bg-[#F0F4FC] hover:text-[#2168F2]">
        <Link
          href="/invoices"
          className="flex flex-col items-center hover:stroke-current"
        >
          <InvoiceIcon />
          Invoices
        </Link>
      </button>
      <button className="px-5 py-3 bg-transparent flex flex-col items-center hover:stroke-current w-full rounded-lg hover:bg-[#F0F4FC] hover:text-[#2168F2]">
        <TemplateIcon />
        Template
      </button>
      <button className="px-5 py-3 bg-transparent flex flex-col items-center hover:stroke-current w-full rounded-lg hover:bg-[#F0F4FC] hover:text-[#2168F2]">
        <LayoutIcon />
        Layout
      </button>
      <button className="px-5 py-3 bg-transparent flex flex-col items-center hover:stroke-current w-full rounded-lg hover:bg-[#F0F4FC] hover:text-[#2168F2]">
        <ColorIcon />
        Color
      </button>
    </aside>
  );
};

export default Sidebar;
