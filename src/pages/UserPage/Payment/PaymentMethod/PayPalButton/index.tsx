import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

interface PayPalButtonProps {
  totalAmount: number;
  onSuccess: () => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({
  totalAmount,
  onSuccess,
}) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "Aa2fHDgJGQUvHxuSx1E6Z7_tnkXOAEXxNU-DCcxHWfQvKldUQMhoRSndsJnmtrE2igLiZvuR4-qhNRYw",
        currency: "USD",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical", shape: "rect" }}
        createOrder={(_, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: totalAmount.toFixed(2),
                },
              },
            ],
          });
        }}
        onApprove={async (_, actions) => {
          await actions.order?.capture();
          onSuccess();
        }}
        onError={(err) => {
          console.error("PayPal Error:", err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
