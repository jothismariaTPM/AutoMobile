import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import toast from 'react-hot-toast';

const Orders = () => {
  const { currency, axios, country, inrToAed } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading,setLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/order/seller');
      if (data?.success) {
        setOrders(Array.isArray(data.finalOrders) ? data.finalOrders : []);
      } else {
        toast.error(data?.message || 'Failed to fetch orders');
      }
    } catch (error) {
      toast.error(error?.message || 'Something went wrong');
    }finally {
      setLoading(false);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post('/api/order/status', {
        orderId,
        status: e.target.value,
      });

      if (response?.data?.success) {
        await fetchOrders();
        toast.success('Order Status Updated');
      } else {
        toast.error(response?.data?.message || 'Update failed');
      }
    } catch (error) {
      toast.error(error?.message || 'Status update error');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const convertINRtoAED = (priceINR = 0) => {
    if (!inrToAed) return priceINR;
    return (priceINR * inrToAed).toFixed(2);
  };

   // ---------- LOADING ORDERS ----------
  if (loading) {
  return (
    <div className="flex flex-col mx-auto text-center items-center justify-center gap-3">
      <div className="h-10 w-10 rounded-full border-2 border-gray-300 border-t-gray-600 animate-spin" />
      <p className="text-gray-600 text-lg">Loading Orders...</p>
    </div>
  )};

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>

        {orders.length === 0 && (
          <p className="text-center text-gray-500">No orders found</p>
        )}

        {orders.map((order) => (
          <div
            key={order?._id}
            className="flex flex-col md:items-center md:flex-row gap-5 justify-between p-10 rounded-md border border-gray-300"
          >
            {/* ITEMS ✅ */}
            <div className="flex gap-5 max-w-80">
              <img
                className="w-12 h-12 object-cover"
                src={assets.parcel_icon}
                alt="boxIcon"
              />

              <div className='ml-2'>
                {Array.isArray(order?.items) && order.items.length > 0 ? (
                  order.items.map((item) => (
                    <p key={item?._id} className="font-medium max-w-[14vw] line-clamp-10 pb-2">
                      • {item?.product?.name || 'Product not available'}
                      <span className="text-primary ">
                        {' '}x {item?.quantity || 0}
                      </span>
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No items</p>
                )}
              </div>
            </div>

            {/* ADDRESS */}
            <div className="text-sm md:text-base text-black/60">
              <p className="font-medium mb-1">
                {order?.address?.firstName || ''} {order?.address?.lastName || ''}
              </p>
              <p>{order?.address?.street || '-'}</p>
              <p>
                {order?.address?.city || '-'}, {order?.address?.state || '-'}{' '}
                {order?.address?.zipcode || ''}
              </p>
              <p>{order?.address?.country || '-'}</p>
              <p>{order?.address?.phone || '-'}</p>
            </div>

            {/* AMOUNT */}
            <p className="font-medium text-lg my-auto">
              {order?.address?.country?.toLowerCase() === 'united arab emirates' ||
              order?.address?.country === 'AE' ||
              order?.address?.country === 'UAE'
                ? `AED ${convertINRtoAED(order?.amount)}`
                : `₹${order?.amount || 0}`}
            </p>

            {/* PAYMENT */}
            <div className="flex flex-col text-sm md:text-base text-black/60">
              <p>
                Method:{' '}
                {order?.payment?.payment_type
                  ? order.payment.payment_type.toUpperCase()
                  : 'N/A'}
              </p>
              <p>
                Date:{' '}
                {order?.createdAt
                  ? new Date(order.createdAt).toLocaleDateString()
                  : 'N/A'}
              </p>
              <p>
                Payment:{' '}
                {order?.payment?.payment_status === 'completed'
                  ? 'Completed'
                  : 'Pending'}
              </p>
            </div>

            {/* STATUS */}
            <select
              onChange={(e) => statusHandler(e, order?._id)}
              value={order?.status || 'Processing'}
              className="border border-gray-400 rounded-xl p-2"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out of delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
