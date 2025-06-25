// src/components/HeroCarousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import dogImage from '~/assets/dog-homepage.jpg'

export default function HeroCarousel() {
  return (
    <Swiper
      autoplay={{ delay: 100000 }}
      loop={true}
      modules={[Autoplay]}
      className="w-full h-[600px]"
    >
      {/* Slide 1 */}
      <SwiperSlide>
        <div className="h-[600px] bg-[rgb(153,165,162)] flex flex-col md:flex-row items-center px-6 md:px-28 pt-[140px]">
          <div className="flex-1 space-y-4 h-56">
            <h1 className="text-5xl font-black leading-tight">
              Take a Good Care of Pets
            </h1>
            <p className="text-gray-700">
              We are your local dog home boarding service giving you complete
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full">
              Get Appointment
            </button>
          </div>
          <div className="flex-1 mt-10 md:mt-0">
            <img
              src={dogImage}
              alt=""
              className="w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide>
        <div className="h-[600px] bg-[#e0f7f0] flex flex-col md:flex-row items-center px-6 md:px-20 pt-[140px]">
          <div className="flex-1 space-y-4">
            <h1 className="text-5xl font-black leading-tight">
              Happy Paws, Happy Life
            </h1>
            <p className="text-gray-700">
              Your pet's comfort and happiness is our priority
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full">
              Book Now
            </button>
          </div>
          <div className="flex-1 mt-10 md:mt-0">
            <img
              src="/dog2.png"
              alt="pet"
              className="w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
