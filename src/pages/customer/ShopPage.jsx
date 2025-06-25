import MainLayout from "~/layouts/MainLayout";
import background from "~/assets/backgr-xanhvang-expanded.png";

export default function ShopPage() {
    return (
        <MainLayout>
            <div
                className="w-full h-[600px] bg-cover bg-center flex flex-col md:flex-row items-center px-6 md:px-28 pt-[60px]"
                style={{ backgroundImage: `url(${background})` }}
            >
                <div className="flex-1 text-white">
                    <div className="mb-2">
                        <h3>All Products</h3>
                    </div>
                    <div className="mb-4">
                        <h1 className="text-5xl font-black leading-tight">Save 50% Off</h1>
                    </div>
                    <div className="mb-8">
                        <p>Happy Pet - Happy You</p>
                    </div>
                    <button className="bg-white hover:bg-orange-300 text-black px-10 py-2 rounded-sm">
                        Shop Now
                    </button>
                </div>


            </div>
        </MainLayout>
    );
}
