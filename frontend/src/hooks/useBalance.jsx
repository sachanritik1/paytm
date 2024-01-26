import { useSetRecoilState } from "recoil";
import { balanceAtom } from "../store/atoms/balance";
import { useEffect } from "react";

export function useBalance() {
  const setBalance = useSetRecoilState(balanceAtom);
  async function fetchBalance() {
    try {
      const res = await fetch("http://localhost/api/v1/accounts/balance", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      setBalance(json.data.balance);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchBalance();
  }, []);
}
