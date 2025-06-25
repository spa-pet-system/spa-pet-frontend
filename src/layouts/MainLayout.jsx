import Topbar from "~/components/Topbar";
import Navbar from "~/components/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full z-10">
        <Topbar />
        <Navbar />
      </div>

      {/* Nội dung trang */}
      <div>{children}</div>
    </div>
  );
}
