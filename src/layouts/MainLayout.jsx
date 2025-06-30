import Topbar from "~/components/Topbar";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

// export default function MainLayout({ children }) {
//   return (
//     <div className="relative">
//       <div className="absolute top-0 left-0 w-full z-10">
//         <Topbar />
//         <Navbar />
//       </div>

//       {/* Nội dung trang */}
//       <div>{children}</div>
//     </div>
//   );
// }

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header cố định */}
      <header className="absolute top-0 left-0 w-full z-10">
        <Topbar />
        <Navbar />
      </header>

      <main className="flex-1">
        {children}
      </main>

      {/* Footer luôn ở dưới cùng */}
      <Footer />
    </div>
  );
}

