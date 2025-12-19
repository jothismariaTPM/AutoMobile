import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import OrderStatusBar from "../components/OrderStatusBar";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios, country, inrToAed, backend } = useAppContext();

  const [loading,setLoading] = useState(true)

  const fetchMyOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/order/user');
      if (data?.success && Array.isArray(data?.orders)) {
        setMyOrders(data.orders);
      } else {
        setMyOrders([]);
      }
    } catch (error) {
      toast.error(error?.message || 'Failed to fetch orders');
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const convertINRtoAED = (priceINR = 0) => {
    if (!inrToAed) return priceINR;
    return Number((priceINR * inrToAed).toFixed(2));
  };

   // ---------- LOADING ORDERS ----------
  if (loading) {
  return (
    <div className="mt-20 flex flex-col items-center text-center justify-center gap-3">
      <div className="h-10 w-10 rounded-full border-2 border-gray-300 border-t-gray-600 animate-spin" />
      <p className="text-gray-600 text-lg">Loading Orders...</p>
    </div>
  )};


  return (
    <div className="mt-16 pb-16">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-medium uppercase">My orders</p>
        <div className="w-16 h-0.5 bg-primary rounded-full" />
      </div>

      {myOrders.length === 0 && (
        <p className="text-center text-gray-400">No orders found</p>
      )}

      {myOrders.map((order) => (
        <div
          key={order?._id}
          className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-6xl"
        >
          {/* ORDER STATUS */}
          <OrderStatusBar status={order?.status || 'Processing'} />

          <p className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col">
            <span>OrderId : {order?._id || 'N/A'}</span>

            <span>
              Payment :
              {order?.payment?.payment_type
                ? ` ${order.payment.payment_type.toUpperCase()}`
                : ' N/A'}
            </span>

            <div className="flex flex-col mt-1">
              <span>
                Total Amount :
                {country === 'AE'
                  ? ` AED ${convertINRtoAED(order?.amount)}`
                  : ` ₹${order?.amount || 0}`}
              </span>
              <span className="text-xs text-center font-extralight">
                (Inclusive all the taxes)
              </span>
            </div>
          </p>

          {/* ITEMS */}
          {Array.isArray(order?.items) && order.items.length > 0 ? (
            order.items.map((item) => (
              <div
                key={item?._id}
                className={`relative bg-white text-gray-500/70 ${
                  order.items.length > 1 ? 'border-b' : ''
                } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-6xl`}
              >
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <img
                      src={
                        item?.product?.image?.[0]
                          ? `${backend}${item.product.image[0]}`
                          : '/placeholder.png'
                      }
                      alt={item?.product?.name || 'No Product'}
                      className="w-14 h-14 object-cover"
                    />
                  </div>

                  <div className="ml-4">
                    <h2 className="text-lg font-medium text-gray-800 max-w-xs line-clamp-3">
                      {item?.product?.name || 'Product not available'}
                    </h2>
                    
                      {item?.product?.category?.name && (
                       <p>Category: {item.product.category.name}</p>
                      )}
                  </div>
                </div>

                <div className="flex flex-col justify-center md:ml-8 mb-4 md:mb-0">
                  <p>Quantity: {item?.quantity || 1}</p>
                  <p>Status: {order?.status || 'Processing'}</p>
                  <p>
                    Date:{' '}
                    {order?.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </p>
                </div>
                
                <p className="text-primary text-lg font-medium">
                  Amount :
                  {country === 'AE'
                    ? ` AED ${
                        convertINRtoAED(item?.product?.price) *
                        (item?.quantity || 1)
                      }`
                    : ` ₹${
                        (item?.product?.price || '-') *
                        (item?.quantity || 1)
                      }`}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400 p-4">No items found</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
