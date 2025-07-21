export default function Footer() {
  return (
    <footer className="bg-neutral-100 text-center text-neutral-600 dark:bg-neutral-600 dark:text-neutral-200 lg:text-left" style={{marginTop: "1000px"}}>
      {/* Thanh trên cùng - kết nối mạng xã hội */}
      <div className="flex items-center justify-center border-b-2 border-neutral-200 p-6 dark:border-neutral-500 lg:justify-between">
        <div className="mr-12 hidden lg:block">
          <span>Kết nối với chúng tôi qua mạng xã hội:</span>
        </div>
        <div className="flex justify-center gap-4">
          <a className="text-neutral-600 dark:text-neutral-200" href="#">
            <i className="fab fa-facebook-f" />
          </a>
          <a className="text-neutral-600 dark:text-neutral-200" href="#">
            <i className="fab fa-instagram" />
          </a>
          <a className="text-neutral-600 dark:text-neutral-200" href="#">
            <i className="fab fa-tiktok" />
          </a>
          <a className="text-neutral-600 dark:text-neutral-200" href="#">
            <i className="fab fa-youtube" />
          </a>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Giới thiệu */}
          <div>
            <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              Pet Spa
            </h6>
            <p>
              Chúng tôi cung cấp dịch vụ chăm sóc thú cưng chuyên nghiệp: tắm gội, cắt tỉa lông, massage thư giãn và các sản phẩm chăm sóc thú cưng chất lượng cao.
            </p>
          </div>

          {/* Dịch vụ */}
          <div>
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Dịch vụ
            </h6>
            <p className="mb-4">
              <a href="#" className="text-neutral-600 dark:text-neutral-200">Tắm gội & Vệ sinh</a>
            </p>
            <p className="mb-4">
              <a href="#" className="text-neutral-600 dark:text-neutral-200">Cắt tỉa lông</a>
            </p>
            <p className="mb-4">
              <a href="#" className="text-neutral-600 dark:text-neutral-200">Massage thư giãn</a>
            </p>
            <p>
              <a href="#" className="text-neutral-600 dark:text-neutral-200">Cửa hàng thú cưng</a>
            </p>
          </div>

          {/* Liên kết nhanh */}
          <div>
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Liên kết nhanh
            </h6>
            <p className="mb-4">
              <a href="#" className="text-neutral-600 dark:text-neutral-200">Đặt lịch</a>
            </p>
            <p className="mb-4">
              <a href="#" className="text-neutral-600 dark:text-neutral-200">Giỏ hàng</a>
            </p>
            <p className="mb-4">
              <a href="#" className="text-neutral-600 dark:text-neutral-200">Lịch sử đơn hàng</a>
            </p>
            <p>
              <a href="#" className="text-neutral-600 dark:text-neutral-200">Hỗ trợ</a>
            </p>
          </div>

          {/* Thông tin liên hệ */}
          <div>
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Liên hệ
            </h6>
            <p className="mb-4 flex items-center justify-center md:justify-start">
              🏠 123 Đường Cún Cưng, Quận Pet, TP.HCM
            </p>
            <p className="mb-4 flex items-center justify-center md:justify-start">
              📧 support@petspa.vn
            </p>
            <p className="mb-4 flex items-center justify-center md:justify-start">
              ☎️ 0909 123 456
            </p>
            <p className="flex items-center justify-center md:justify-start">
              ⏰ 8h00 - 20h00 (Thứ 2 - Chủ Nhật)
            </p>
          </div>
        </div>
      </div>

      {/* Bản quyền */}
      <div className="bg-neutral-200 p-6 text-center dark:bg-neutral-700">
        <span>© 2025 Pet Spa - All rights reserved.</span>
      </div>
    </footer>
  );
}
