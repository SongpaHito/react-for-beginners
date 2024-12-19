import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(null);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const onChangeMoney = (event) => {
    setMoney(event.target.value);
  };

  const onSelectCoin = (event) => {
    const coinId = event.target.value;
    const coin = coins.find((coin) => coin.id === coinId);
    setSelectedCoin(coin);
  };
  return (
    /*
    <div>
      <h1>The Coins ({coins.length})</h1>
      {loading ? <strong>Loading...</strong> : null}
      <ul>
        {coins.map((coin) => (
          <li key={coin.id}>
            {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
          </li>
        ))}
      </ul>
    </div>
    */
    <div>
      <h1>The Coins ({coins.length})</h1>
      {loading ? <strong>Loading...</strong> : null}

      <div>
        <label htmlFor="moneyInput">Enter your money (USD): </label>
        <input
          id="moneyInput"
          type="number"
          placeholder="Enter your money"
          value={money}
          onChange={onChangeMoney}
        />
      </div>

      <div>
        <label htmlFor="coinSelect">Select a coin: </label>
        <select id="coinSelect" onChange={onSelectCoin}>
          <option value="">Select a coin</option>
          {coins.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      </div>

      <div>
        {money && selectedCoin ? (
          <p>
            With ${money}, you can buy{" "}
            <strong>
              {(money / selectedCoin.quotes.USD.price).toFixed(6)}
            </strong>{" "}
            {selectedCoin.symbol}.
          </p>
        ) : (
          <p>Please enter your money and select a coin.</p>
        )}
      </div>
    </div>
  );
}

export default App;
