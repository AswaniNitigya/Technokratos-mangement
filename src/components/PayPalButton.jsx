import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function PayPalButton({ amount, onSuccess, onError }) {
  return (
    <PayPalScriptProvider 
      options={{ 
        "client-id": "AYVVzoAFVll5VemfLnUuekzepqiFHuG5jU9v-msMnHvEe_-iAkesEYYvjvJ0oz-Q0NVTbZgnut3jNfFv", 
        currency: "USD"
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount,
              },
            }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(function(details) {
            onSuccess(details);
          });
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
}