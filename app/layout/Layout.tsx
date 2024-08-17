import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-linear-gradient">
      <Header />
      <Sidebar />
      <main className="sm:ml-[120px] p-4 h-screen overflow-auto">
        <div className="">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
