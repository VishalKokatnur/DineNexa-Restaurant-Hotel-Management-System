
// import { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import RestaurantLayout from "../layouts/RestaurantLayout";
// import "./BillHistoryPage.css";

// function BillHistoryPage() {
//   const [bills, setBills] = useState([]);
//   const [search, setSearch] = useState("");
//   const [paymentFilter, setPaymentFilter] = useState("");
//   const [dateFilter, setDateFilter] = useState("");
//   const [selectedBill, setSelectedBill] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchBills();
//   }, []);

//   const fetchBills = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         "http://127.0.0.1:8000/api/restaurant/bills/"
//       );
//       setBills(response.data);
//     } catch (error) {
//       console.log("Error fetching bills", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatMoney = (amount) => {
//     return Number(amount || 0).toFixed(2);
//   };

//   const formatDateTime = (date) => {
//     if (!date) return "-";
//     return new Date(date).toLocaleString();
//   };

//   const formatDateOnly = (date) => {
//     if (!date) return "";
//     const d = new Date(date);
//     const year = d.getFullYear();
//     const month = String(d.getMonth() + 1).padStart(2, "0");
//     const day = String(d.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   const getBillNumber = (bill) => {
//     return bill.bill_number || bill.invoice_number || bill.id;
//   };

//   const getOrderNumber = (bill) => {
//     if (typeof bill.order === "object") {
//       return bill.order?.id || bill.order?.order_number;
//     }
//     return bill.order;
//   };

//   const getCustomerName = (bill) => {
//     return (
//       bill.customer_name ||
//       bill.customer?.name ||
//       bill.order?.customer_name ||
//       bill.name ||
//       "-"
//     );
//   };

//   const getCustomerPhone = (bill) => {
//     return (
//       bill.phone ||
//       bill.customer_phone ||
//       bill.customer?.phone ||
//       bill.order?.phone ||
//       "-"
//     );
//   };

//   const getBillItems = (bill) => {
//     return (
//       bill?.items ||
//       bill?.bill_items ||
//       bill?.order_items ||
//       bill?.order?.items ||
//       []
//     );
//   };

//   const filteredBills = useMemo(() => {
//     return bills.filter((bill) => {
//       const keyword = search.toLowerCase();

//       const billNumber = String(getBillNumber(bill)).toLowerCase();
//       const orderNumber = String(getOrderNumber(bill)).toLowerCase();
//       const customerName = String(getCustomerName(bill)).toLowerCase();
//       const phone = String(getCustomerPhone(bill)).toLowerCase();
//       const payment = String(bill.payment_method || "").toLowerCase();

//       const matchesSearch =
//         billNumber.includes(keyword) ||
//         orderNumber.includes(keyword) ||
//         customerName.includes(keyword) ||
//         phone.includes(keyword);

//       const matchesPayment =
//         paymentFilter === "" || payment === paymentFilter.toLowerCase();

//       const matchesDate =
//         dateFilter === "" || formatDateOnly(bill.created_at) === dateFilter;

//       return matchesSearch && matchesPayment && matchesDate;
//     });
//   }, [bills, search, paymentFilter, dateFilter]);

//   const handleViewBill = async (bill) => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/api/restaurant/bills/${bill.id}/`
//       );
//       setSelectedBill(response.data);
//     } catch (error) {
//       console.log("Bill detail API not found, showing list data", error);
//       setSelectedBill(bill);
//     }
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   const clearFilters = () => {
//     setSearch("");
//     setPaymentFilter("");
//     setDateFilter("");
//   };

//   return (
//     <RestaurantLayout>
//       <div className="bill-history-page">
//         <div className="bill-header">
//           <div>
//             <h1>Bill History</h1>
//             <p>Search, view, and reprint saved restaurant bills.</p>
//           </div>

//           <button className="refresh-btn" onClick={fetchBills}>
//             Refresh
//           </button>
//         </div>

//         <div className="bill-filter-card">
//           <div className="filter-group search-box">
//             <label>Search Bill</label>
//             <input
//               type="text"
//               placeholder="Search by bill no, order no, customer, phone..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>

//           <div className="filter-group">
//             <label>Payment Method</label>
//             <select
//               value={paymentFilter}
//               onChange={(e) => setPaymentFilter(e.target.value)}
//             >
//               <option value="">All Payments</option>
//               <option value="Cash">Cash</option>
//               <option value="UPI">UPI</option>
//               <option value="Card">Card</option>
//               <option value="Online">Online</option>
//             </select>
//           </div>

//           <div className="filter-group">
//             <label>Date</label>
//             <input
//               type="date"
//               value={dateFilter}
//               onChange={(e) => setDateFilter(e.target.value)}
//             />
//           </div>

//           <button className="clear-btn" onClick={clearFilters}>
//             Clear
//           </button>
//         </div>

//         <div className="bill-summary-row">
//           <div className="summary-card">
//             <h3>{filteredBills.length}</h3>
//             <p>Total Bills</p>
//           </div>

//           <div className="summary-card">
//             <h3>
//               ₹
//               {formatMoney(
//                 filteredBills.reduce(
//                   (sum, bill) => sum + Number(bill.final_amount || 0),
//                   0
//                 )
//               )}
//             </h3>
//             <p>Total Revenue</p>
//           </div>
//         </div>

//         <div className="bill-table-card">
//           {loading ? (
//             <div className="empty-box">Loading bills...</div>
//           ) : filteredBills.length === 0 ? (
//             <div className="empty-box">No bills found.</div>
//           ) : (
//             <table className="bill-table">
//               <thead>
//                 <tr>
//                   <th>Bill No</th>
//                   <th>Order</th>
//                   <th>Customer</th>
//                   <th>Phone</th>
//                   <th>Total</th>
//                   <th>Discount</th>
//                   <th>GST</th>
//                   <th>Final Amount</th>
//                   <th>Payment</th>
//                   <th>Status</th>
//                   <th>Date</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filteredBills.map((bill) => (
//                   <tr key={bill.id}>
//                     <td>#{getBillNumber(bill)}</td>
//                     <td>Order #{getOrderNumber(bill)}</td>
//                     <td>{getCustomerName(bill)}</td>
//                     <td>{getCustomerPhone(bill)}</td>
//                     <td>₹{formatMoney(bill.total_amount)}</td>
//                     <td>₹{formatMoney(bill.discount)}</td>
//                     <td>₹{formatMoney(bill.tax_amount)}</td>
//                     <td className="final-price">
//                       ₹{formatMoney(bill.final_amount)}
//                     </td>
//                     <td>{bill.payment_method}</td>
//                     <td>
//                       <span className="paid-badge">
//                         {bill.payment_status || "Paid"}
//                       </span>
//                     </td>
//                     <td>{formatDateTime(bill.created_at)}</td>
//                     <td>
//                       <button
//                         className="view-btn"
//                         onClick={() => handleViewBill(bill)}
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>

//         {selectedBill && (
//           <div className="modal-overlay">
//             <div className="bill-modal">
//               <div className="modal-actions no-print">
//                 <button className="print-btn" onClick={handlePrint}>
//                   Print Bill
//                 </button>
//                 <button
//                   className="close-btn"
//                   onClick={() => setSelectedBill(null)}
//                 >
//                   Close
//                 </button>
//               </div>

//               <div className="invoice-box">
//                 <div className="invoice-top">
//                   <div>
//                     <h2>SmartDine Pro</h2>
//                     <p>Hotel & Restaurant Management System</p>
//                     <p>GSTIN: 29ABCDE1234F1Z5</p>
//                   </div>

//                   <div className="invoice-meta">
//                     <h3>GST Invoice</h3>
//                     <p>Bill No: #{getBillNumber(selectedBill)}</p>
//                     <p>Order No: #{getOrderNumber(selectedBill)}</p>
//                     <p>Date: {formatDateTime(selectedBill.created_at)}</p>
//                   </div>
//                 </div>

//                 <div className="customer-info">
//                   <div>
//                     <strong>Customer Name</strong>
//                     <p>{getCustomerName(selectedBill)}</p>
//                   </div>

//                   <div>
//                     <strong>Phone</strong>
//                     <p>{getCustomerPhone(selectedBill)}</p>
//                   </div>

//                   <div>
//                     <strong>Payment</strong>
//                     <p>{selectedBill.payment_method}</p>
//                   </div>

//                   <div>
//                     <strong>Status</strong>
//                     <p>{selectedBill.payment_status || "Paid"}</p>
//                   </div>
//                 </div>

//                 <table className="invoice-table">
//                   <thead>
//                     <tr>
//                       <th>Item</th>
//                       <th>Qty</th>
//                       <th>Price</th>
//                       <th>Subtotal</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {getBillItems(selectedBill).length > 0 ? (
//                       getBillItems(selectedBill).map((item, index) => {
//                         const itemName =
//                           item.menu_item_name ||
//                           item.item_name ||
//                           item.menu_item?.name ||
//                           item.product_name ||
//                           item.name ||
//                           "Item";

//                         const quantity = item.quantity || item.qty || 1;
//                         const price =
//                           item.price ||
//                           item.rate ||
//                           item.unit_price ||
//                           item.menu_item_price ||
//                           0;

//                         const subtotal =
//                           item.subtotal || item.total || Number(price) * quantity;

//                         return (
//                           <tr key={index}>
//                             <td>{itemName}</td>
//                             <td>{quantity}</td>
//                             <td>₹{formatMoney(price)}</td>
//                             <td>₹{formatMoney(subtotal)}</td>
//                           </tr>
//                         );
//                       })
//                     ) : (
//                       <tr>
//                         <td colSpan="4" className="no-items">
//                           Item details not available from API.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>

//                 <div className="invoice-total">
//                   <div>
//                     <span>Total Amount</span>
//                     <strong>₹{formatMoney(selectedBill.total_amount)}</strong>
//                   </div>

//                   <div>
//                     <span>Discount</span>
//                     <strong>₹{formatMoney(selectedBill.discount)}</strong>
//                   </div>

//                   <div>
//                     <span>GST</span>
//                     <strong>₹{formatMoney(selectedBill.tax_amount)}</strong>
//                   </div>

//                   <div className="grand-total">
//                     <span>Grand Total</span>
//                     <strong>₹{formatMoney(selectedBill.final_amount)}</strong>
//                   </div>
//                 </div>

//                 <div className="invoice-footer">
//                   <p>Thank you for visiting SmartDine Pro.</p>
//                   <p>Please visit again!</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </RestaurantLayout>
//   );
// }

// export default BillHistoryPage;

import { useEffect, useState } from "react";
import axios from "axios";
import RestaurantLayout from "../layouts/RestaurantLayout";
import "./DashboardPage.css";
import "./BillHistoryPage.css";

function BillHistoryPage() {
  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [date, setDate] = useState("");
  const [selectedBill, setSelectedBill] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (search.trim()) params.append("search", search.trim());
      if (paymentMethod) params.append("payment_method", paymentMethod);
      if (date) params.append("date", date);

      const response = await axios.get(
        `http://127.0.0.1:8000/api/restaurant/bills/?${params.toString()}`
      );

      setBills(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log("Bills fetch error", error);
      alert("Failed to load bills");
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setPaymentMethod("");
    setDate("");

    setTimeout(() => {
      fetchBills();
    }, 100);
  };

  const formatMoney = (amount) => {
    return `₹${Number(amount || 0).toFixed(2)}`;
  };

  const formatDateTime = (value) => {
    if (!value) return "-";

    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
      return value;
    }

    return parsedDate.toLocaleString();
  };

  const totalRevenue = bills.reduce((sum, bill) => {
    return sum + Number(bill.final_amount || bill.total_amount || 0);
  }, 0);

  const printBill = () => {
    window.print();
  };

  return (
    <RestaurantLayout>
      <div className="bill-history-page">
        <div className="bill-hero no-print">
          <div>
            <span className="bill-section-label">Restaurant Billing Desk</span>
            <h1>Bill History</h1>
            <p>Search, view, filter and reprint saved restaurant invoices.</p>
          </div>

          <button className="bill-refresh-btn" onClick={fetchBills}>
            Refresh
          </button>
        </div>

        <div className="bill-filter-panel no-print">
          <div className="bill-filter-field search-field">
            <label>Search Bill</label>
            <input
              type="text"
              placeholder="Search by bill no, order no, customer, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="bill-filter-field">
            <label>Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">All Payments</option>
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
              <option value="Online">Online</option>
            </select>
          </div>

          <div className="bill-filter-field">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <button className="bill-apply-btn" onClick={fetchBills}>
            Apply
          </button>

          <button className="bill-clear-btn" onClick={clearFilters}>
            Clear
          </button>
        </div>

        <div className="bill-summary-grid no-print">
          <div className="bill-summary-card">
            <span>BL</span>
            <h2>{bills.length}</h2>
            <p>Total Bills</p>
          </div>

          <div className="bill-summary-card">
            <span>₹</span>
            <h2>{formatMoney(totalRevenue)}</h2>
            <p>Total Revenue</p>
          </div>
        </div>

        <div className="bill-table-panel">
          <div className="bill-table-header no-print">
            <div>
              <h2>Saved Invoices</h2>
              <p>All generated bills from the restaurant billing counter.</p>
            </div>
          </div>

          {loading ? (
            <div className="bill-empty-box">Loading bills...</div>
          ) : bills.length === 0 ? (
            <div className="bill-empty-box">No bills found.</div>
          ) : (
            <table className="bill-premium-table">
              <thead>
                <tr>
                  <th>Bill No</th>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Total</th>
                  <th>Discount</th>
                  <th>GST</th>
                  <th>Final Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th className="no-print">Action</th>
                </tr>
              </thead>

              <tbody>
                {bills.map((bill) => (
                  <tr key={bill.id}>
                    <td>#{bill.bill_number || bill.id}</td>
                    <td>Order #{bill.order || "-"}</td>
                    <td>{bill.customer_name || "Walk-in Customer"}</td>
                    <td>{bill.phone || "-"}</td>
                    <td>{formatMoney(bill.total_amount)}</td>
                    <td>{formatMoney(bill.discount)}</td>
                    <td>{formatMoney(bill.tax_amount)}</td>
                    <td className="bill-green-price">
                      {formatMoney(bill.final_amount || bill.total_amount)}
                    </td>
                    <td>{bill.payment_method || "-"}</td>
                    <td>
                      <span className="bill-paid-badge">
                        {bill.payment_status || "Paid"}
                      </span>
                    </td>
                    <td>{formatDateTime(bill.created_at)}</td>
                    <td className="no-print">
                      <button
                        className="bill-view-btn"
                        onClick={() => setSelectedBill(bill)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {selectedBill && (
          <div className="bill-modal-overlay no-print">
            <div className="bill-modal">
              <button
                className="bill-modal-close"
                onClick={() => setSelectedBill(null)}
              >
                ×
              </button>

              <div className="invoice-box" id="invoice">
                <div className="invoice-header">
                  <h1>SmartDine Pro</h1>
                  <p>Premium Restaurant Management</p>
                  <p>GSTIN: 29ABCDE1234F1Z5</p>
                  <h2>GST TAX INVOICE</h2>
                </div>

                <div className="invoice-details">
                  <div>
                    <p>
                      <strong>Bill No:</strong> #
                      {selectedBill.bill_number || selectedBill.id}
                    </p>
                    <p>
                      <strong>Order:</strong> Order #
                      {selectedBill.order || "-"}
                    </p>
                    <p>
                      <strong>Customer:</strong>{" "}
                      {selectedBill.customer_name || "Walk-in Customer"}
                    </p>
                    <p>
                      <strong>Phone:</strong> {selectedBill.phone || "-"}
                    </p>
                  </div>

                  <div>
                    <p>
                      <strong>Payment:</strong>{" "}
                      {selectedBill.payment_method || "-"}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      {selectedBill.payment_status || "Paid"}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {formatDateTime(selectedBill.created_at)}
                    </p>
                  </div>
                </div>

                <div className="bill-total-box">
                  <p>
                    Subtotal:{" "}
                    <strong>{formatMoney(selectedBill.total_amount)}</strong>
                  </p>
                  <p>
                    GST:{" "}
                    <strong>{formatMoney(selectedBill.tax_amount)}</strong>
                  </p>
                  <p>
                    Discount:{" "}
                    <strong>{formatMoney(selectedBill.discount)}</strong>
                  </p>
                  <h2>
                    Grand Total:{" "}
                    {formatMoney(
                      selectedBill.final_amount || selectedBill.total_amount
                    )}
                  </h2>
                </div>

                <div className="invoice-footer">
                  <p>Thank You! Visit Again</p>
                  <p>This is a computer-generated invoice.</p>
                </div>
              </div>

              <div className="bill-modal-actions">
                <button onClick={printBill}>Print Bill</button>
                <button onClick={() => setSelectedBill(null)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </RestaurantLayout>
  );
}

export default BillHistoryPage;