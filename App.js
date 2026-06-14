import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function App() {

  const [gbp, setGbp] = useState(null);
  const [xau, setXau] = useState(null);

  const API = "https://signal-engine-sfx9.onrender.com";

  const fetchSignals = async () => {
    try {
      const res1 = await fetch(API + "/signals/gbpusd");
      const data1 = await res1.json();

      const res2 = await fetch(API + "/signals/xauusd");
      const data2 = await res2.json();

      setGbp(data1);
      setXau(data2);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSignals();
    const interval = setInterval(fetchSignals, 60000);
    return () => clearInterval(interval);
  }, []);

  const SignalCard = ({ title, data }) => (
    <View style={styles.card}>

      <Text style={styles.pair}>{title}</Text>

      <Text style={[
        styles.signal,
        data?.signal === "BUY" && styles.buy,
        data?.signal === "SELL" && styles.sell,
        data?.signal === "NO TRADE" && styles.noTrade,
      ]}>
        {data?.signal || "Loading..."}
      </Text>

      <Text>Confidence: {data?.confidence || 0}%</Text>

      <Text>Price: {data?.price}</Text>

      <Text>SL: {data?.stop_loss || "-"}</Text>

      <Text>TP: {data?.take_profit || "-"}</Text>

    </View>
  );

  return (
    <View style={styles.container}>

      <Text style={styles.title}>FOREX AI DASHBOARD</Text>

      <TouchableOpacity style={styles.button} onPress={fetchSignals}>
        <Text style={styles.buttonText}>REFRESH SIGNALS</Text>
      </TouchableOpacity>

      <SignalCard title="GBP/USD" data={gbp} />
      <SignalCard title="XAU/USD" data={xau} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20
  },
  title: {
    color: "white",
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center"
  },
  button: {
    backgroundColor: "#38bdf8",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15
  },
  buttonText: {
    textAlign: "center",
    color: "black",
    fontWeight: "bold"
  },
  card: {
    backgroundColor: "#1e293b",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10
  },
  pair: {
    color: "#38bdf8",
    fontSize: 18,
    marginBottom: 5
  },
  signal: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5
  },
  buy: { color: "#22c55e" },
  sell: { color: "#ef4444" },
  noTrade: { color: "#facc15" }
});
