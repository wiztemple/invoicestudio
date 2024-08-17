import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-screen h-[60px] fixed top-0 z-50 flex justify-between items-center bg-white border-b border-b-[#D8DEE8] sm:px-6">
      <Link href="/" className="text-[#0EA654] font-bold text-xl flex items-center gap-2">
        <Image src={'/logo.svg'} width={40} height={22} alt="invoicestudio" />
        InvoiceStudio
      </Link>
      <span className="text-slate-800">Anything</span>
    </header>
  )
}

export default Header;
