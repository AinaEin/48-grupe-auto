/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const initialContext = {
  loginStatus: false,
  updateLoginStatus: () => {},
  totalSumToPay: 0,
  updateTotalSumToPay: () => {},
  cartData: [],
  updateCartItemAmount: () => {},
};

export const GlobalContext = createContext(initialContext);

export function ContextWrapper(props) {
  const [loginStatus, setLoginStatus] = useState(initialContext.loginStatus);
  const [totalSumToPay, setTotalSumToPay] = useState(
    initialContext.totalSumToPay
  );
  const [cartData, setCartData] = useState(initialContext.cartData);

  useEffect(() => {
    if (loginStatus === true) {
      fetch("http://localhost:4821/api/cart-details")
        .then((res) => res.json())
        .then((dataObj) => setCartData(dataObj.data))
        .catch(console.error);
    }
  }, [loginStatus]);

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
