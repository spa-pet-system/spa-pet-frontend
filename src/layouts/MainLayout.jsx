import Topbar from "~/components/Topbar";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import BookingFloatingButton from "~/components/BookingFloatingButton";

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
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Topbar />
        <Navbar />
      </header>

      {/* 👇 Đẩy nội dung xuống để tránh bị che */}
      <main className="flex-1 pt-[140px] bg-gray-50">
        {children}
        <BookingFloatingButton />
      </main>

      {/* Footer luôn ở dưới cùng */}
      <Footer />
    </div>
  );
}

