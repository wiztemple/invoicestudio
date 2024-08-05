import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full flex justify-between items-center bg-white h-[60px] border-b border-b-[#D8DEE8] sm:px-6">
      <Link href="/" className="text-blue-700">InvoiceStudio</Link>
      <span className="text-slate-800">Anything</span>
    </header>
  )
}

export default Header;
