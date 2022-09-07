import React, { useRef, useEffect, useState } from "react";

export default function Paypal(total) {

  const [Total,setTotal]=useState(0);
  
  
  const paypal = useRef();

  useEffect(() => {
    setTotal(total);
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Purchase amount",
                amount: {
                  currency_code: "USD",
                  value: Number(`${Object.values(total)}`),
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);
  console.log(Object.values(total))
  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}