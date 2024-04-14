/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const initialContext = {
  loginStatus: false,
  updateLoginStatus: () => {},
  totalSumToPay: 0,
  updateTotalSumToPay: () => {},
  cartData: [
    {
      name: "Pomidoras",
      price: 2,
      amount: 0,
    },
    {
      name: "Agurkas",
      price: 1.5,
      amount: 0,
    },
    {
      name: "Svogūnas",
      price: 5,
      amount: 0,
    },
  ],
  updateCartItemAmount: () => {},
};

export const GlobalContext = createContext(initialContext);

export function ContextWrapper(props) {
  const [loginStatus, setLoginStatus] = useState(initialContext.loginStatus);
  const [totalSumToPay, setTotalSumToPay] = useState(
    initialContext.totalSumToPay
  );
  const [cartData, setCartData] = useState(initialContext.cartData);

  function updateLoginStatus(newStatusValue) {
    setLoginStatus(newStatusValue);
  }

  function updateTotalSumToPay(sumChange) {
    setTotalSumToPay((n) => n + sumChange);
  }

  function updateCartItemAmount(name, amountChange) {
    console.log(">>>", name, amountChange);
  }

  const value = {
    loginStatus,
    updateLoginStatus,
    totalSumToPay,
    updateTotalSumToPay,
    cartData,
    updateCartItemAmount,
  };

  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
}
