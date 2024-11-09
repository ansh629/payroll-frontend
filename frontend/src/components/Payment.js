import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [amount, setAmount] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  const handlePayment = async () => {
    if (!employeeId || !amount) {
      alert('Please provide employee ID and amount');
      return;
    }

    try {
      // Call your backend to create the payment order
      const response = await axios.post('/api/payments/createOrder', {
        employeeId,
        amount,
      });

      const { orderId, razorpayKey } = response.data;

      // Initialize Razorpay
      const options = {
        key: razorpayKey, // Your Razorpay key
        amount: amount * 100, // Amount in paise (100 paise = 1 INR)
        currency: 'INR',
        name: 'SciQra Payroll System',
        description: `Payment for Employee ID: ${employeeId}`,
        order_id: orderId,
        handler: async function (response) {
          try {
            // Confirm payment with backend after successful transaction
            const paymentResponse = await axios.post('/api/payments/confirmPayment', {
              employeeId,
              paymentDetails: response,
            });
            if (paymentResponse.data.success) {
              setPaymentSuccess(true);
              setPaymentError('');
            }
          } catch (error) {
            setPaymentError('Payment confirmation failed.');
            setPaymentSuccess(false);
          }
        },
        prefill: {
          name: 'Employee Name', // Replace with dynamic data
          email: 'employee@example.com', // Replace with dynamic data
          contact: '+911234567890', // Replace with dynamic data
        },
        notes: {
          address: 'Employee address or any additional note',
        },
        theme: {
          color: '#F37254',
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      setPaymentError('Error creating payment order.');
      setPaymentSuccess(false);
    }
  };

  return (
    <div>
      <h1>Make Payment</h1>
      <input
        type="text"
        placeholder="Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button onClick={handlePayment}>Pay Now</button>

      {paymentSuccess && <p>Payment Successful!</p>}
      {paymentError && <p style={{ color: 'red' }}>{paymentError}</p>}
    </div>
  );
};

export default Payment;
