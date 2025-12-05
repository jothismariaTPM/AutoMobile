// OrderStatusBar.jsx
import React from "react";
import { CheckCircle, Package, Truck, MapPin, Home } from "lucide-react";

const steps = [
  { key: "order_placed", label: "Order Placed", icon: <Package size={22} /> },
  { key: "processing", label: "Processing", icon: <CheckCircle size={22} /> },
  { key: "shipped", label: "Shipped", icon: <Truck size={22} /> },
  { key: "out_for_delivery", label: "Out for Delivery", icon: <MapPin size={22} /> },
  { key: "delivered", label: "Delivered", icon: <Home size={22} /> },
];

const ICON_SIZE = 40;

export default function OrderStatusBar({ status }) {

  const normalizeStatus = (status) => {
    if (!status) return "order_placed";
    const s = status.toLowerCase();
    if (s.includes("order placed")) return "order_placed";
    if (s.includes("processing")) return "processing";
    if (s.includes("shipped")) return "shipped";
    if (s.includes("out of delivery") || s.includes("out_for_delivery"))
      return "out_for_delivery";
    if (s.includes("delivered")) return "delivered";
    return "order_placed";
  };

  const normalized = normalizeStatus(status);
  const index = steps.findIndex((s) => s.key === normalized);

  return (
    <div className="relative mt-6 mb-10">

      {/* Background line */}
      <div
        className="absolute top-[28px] bg-gray-300 h-1"
        style={{
          left: `${ICON_SIZE / 2}px`,
          right: `${ICON_SIZE / 2}px`
        }}
      />

      {/* Filled line */}
      <div
        className="absolute top-[28px] bg-primary-dull h-1 transition-all duration-500"
        style={{
          left: `${ICON_SIZE / 2}px`,
          width: `calc(${index / (steps.length - 1) * 100}% - ${ICON_SIZE / 2}px)`
        }}
      />

      {/* Step icons */}
      <div className="flex justify-between relative z-10">
        {steps.map((step, i) => {
          const isCompleted = i <= index;
          return (
            <div key={step.key} className="flex flex-col items-center">
              <div
                className={`
                  w-12 h-12 flex items-center justify-center rounded-full border-2 mt-2
                  ${isCompleted
                    ? "bg-primary text-white border-green-600 shadow-md"
                    : "bg-white text-gray-400 border-gray-300"}
                `}
              >
                {step.icon}
              </div>
              <p className={`mt-2 text-sm font-semibold ${isCompleted ? "text-green-600" : "text-gray-300"}`}>
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
