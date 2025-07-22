import React from "react";
import { Link } from "react-router-dom";

export default function ServiceCard({ service, onClick, onClickDetail }) {
  return (
    <div
      className="bg-white rounded-2xl shadow-md p-6 mt-10 flex flex-col md:flex-row gap-8"
    >
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-[28px] font-bold mb-4 flex items-center gap-2">
          {/* {service.icon && <span>{service.icon}</span>} */}
          {service.name.toUpperCase()}
        </h2>
        <p className="mb-2">{service.description}</p>
        <p className="mb-2">{service.detail}</p>
        <button
          className="mt-2 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-orange-300 transition-all w-max"
          onClick={() => onClick(service)}
        >
          Get Appointment
        </button>

        <Link to={`/service/${service.slug}`}>
          <button
            className="mt-2 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-orange-300 transition-all w-max"
          >
            Detail
          </button>
        </Link>

      </div>
      <div className="flex-1 flex items-center justify-center">
        <img
          src={service.image}
          alt={service.name}
          className="rounded-xl shadow-lg max-w-xs w-full object-cover h-[400px]"
        />
      </div>
    </div>
  );
}
