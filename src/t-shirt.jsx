import { useState } from 'react';
import PayPalButton from './components/PayPalButton';
import './App.css';

export default function TShirtPage() {
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const tshirtPrice = "25";

  const handlePaymentSuccess = (details) => {
    console.log('Payment completed:', details);
    setPaymentCompleted(true);
  };

  const handlePaymentError = (err) => {
    console.error('Payment error:', err);
    alert('Payment failed. Please try again.');
  };

  const toggleQr = () => {
    setShowQr(!showQr);
  };

  return (
    <div className='cover'>
      <div className="tshirt-container">
        <h2>Technokratos T-Shirt</h2>
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWdjzXUTotqhzBPLEOfpJNm96pjbsFTaBc3w&s" 
          alt="Technokratos T-Shirt" 
          className="tshirt-image"
        />
        <p className="price">Price: ${tshirtPrice}</p>
        
        {!paymentCompleted ? (
          <div className="payment-container">
            <PayPalButton 
              amount={tshirtPrice}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
            
            <button className="qr-button" onClick={toggleQr}>
              {showQr ? 'Hide QR Code' : 'Show QR Code'}
            </button>
            
            {showQr && (
              <div className="qr-container">
                <p>Scan the QR code to pay:</p>
                <img 
                  src='https://i.postimg.cc/XvsfsCBL/Whats-App-Image-2025-08-02-at-10-29-31.jpg' 
                  alt="QR Code for Payment"
                  className="qr-image"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="success-message">
            <h3>Thank you for your purchase!</h3>
            <p>Your order is being processed.</p>
          </div>
        )}
      </div>
    </div>
  );
}