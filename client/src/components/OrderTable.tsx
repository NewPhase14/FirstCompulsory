import React from "react";
import { useAtom } from "jotai";
import { OrderAtom } from "../atoms/OrderAtom.tsx";
import { http } from "../http.ts";
import toast from "react-hot-toast";

// Helper function to format the date
const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0]; // Extract only the date part
};

export default function OrderTable() {
    const [orders, setOrders] = useAtom(OrderAtom);

    const handleConfirm = async (data) => {
        const updatedOrder = {
            id: data.id,
            status: "completed",
            totalAmount: data.totalAmount,
            orderDate: data.orderDate,
            deliveryDate: data.deliveryDate,
            customerId: data.customerId,
        };

        try {
            const response = await http.api.orderUpdateOrder(updatedOrder);
            if (response && response.data) {
                setOrders((prev) => prev.map((order) => (order.id === data.id ? response.data : order)));
                toast.success("Order updated successfully!");
            } else {
                throw new Error("Failed to update order.");
            }
        } catch (error) {
            toast.error("Failed to update order.");
            console.error(error);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="overflow-x-auto pt-32">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-left text-gray-600">Order ID</th>
                        <th className="px-6 py-4 text-left text-gray-600">Date</th>
                        <th className="px-6 py-4 text-left text-gray-600">Status</th>
                        <th className="px-6 py-4 text-left text-gray-600">Total Amount</th>
                        <th className="px-6 py-4 text-left text-gray-600">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-100 transition">
                                <td className="px-6 py-4 text-gray-800">{`#${order.id}`}</td>
                                <td className="px-6 py-4 text-gray-800">{formatDate(order.orderDate)}</td>
                                <td className="px-6 py-4 text-gray-800">
                                    <div className={`badge ${order.status!.toLowerCase() === "completed" ? "bg-green-600 text-white" : "bg-yellow-500 text-white"}`}>
                                        {order.status}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-800">{order.totalAmount} $</td>
                                <td className="px-6 py-4 flex gap-2">
                                    {order.status!.toLowerCase() === "pending" && (
                                        <button
                                            className="btn btn-outline btn-xs text-green-600 hover:bg-green-600 hover:text-white transition"
                                            onClick={() => handleConfirm(order)}
                                        >
                                            Mark as Completed
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="text-center text-gray-500" colSpan={5}>
                                No orders available.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
