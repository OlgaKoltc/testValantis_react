import React, { useState, useEffect } from "react";
import Goods from "./Goods";
import md5 from "md5";
import "./App.css";

function App() {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [goodsPerPage] = useState(50);

  //let timestamp = getTimestamp();
  let password = "Valantis";

  const timestamp = new Date().toISOString().slice(0, 10).split("-").join("");

  const authString = md5(`${password}_${timestamp}`);
  console.log(authString);

  // function addLeadingZero(d) {
  //   return d < 10 ? "0" + d : d;
  // }
  // function getTimestamp() {
  //   const t = new Date();
  //   let yyyy = t.getUTCFullYear();
  //   let mm = addLeadingZero(t.getUTCMonth() + 1);
  //   let dd = addLeadingZero(t.getUTCDate());

  //   return `${yyyy}${mm}${dd}`;
  // }

  useEffect(() => {
    const getGoods = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://api.valantis.store:41000/", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Auth": authString },
          body: JSON.stringify({
            action: "get_ids",
            // params: { offset: Math.abs(), limit: Math.abs() },
          }),
        });
        const goods = await res.json();
        setGoods(goods);
        setLoading(false);
        console.log(goods.action);
        // res.json().then();
      } catch (err) {
        // alert("Что-то пошло не так, пожалуйста перезагрузите страницу...");
        console.log(err);
      }
    };
    getGoods();
  }, []);

  return (
    <div className="App">
      <header className="App-header"></header>
      <Goods goods={goods} loading={loading} />
    </div>
  );
}

export default App;
