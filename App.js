import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

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

  return (
    <View style={styles.container}>

      <Text style={styles.title}>FOREX AI DASHBOARD</Text>

      {/* GBP/USD */}
      <View style={styles.card}>
        <Text style={styles.pair}>GBP/USD</Text>
        <Text>Signal: {gbp?.signal}</Text>
        <Text>Confidence: {gbp?.confidence}%</Text>
        <Text>Price: {gbp?.price}</Text>
        <Text>SL: {gbp?.stop_loss}</Text>
        <Text>TP: {gbp?.take_profit}</Text>
      </View>

      {/* XAU/USD */}
      <View style={styles.card}>
        <Text style={styles.pair}>XAU/USD</Text>
        <Text>Signal: {xau?.signal}</Text>
        <Text>Confidence: {xau?.confidence}%</Text>
        <Text>Price: {xau?.price}</Text>
        <Text>SL: {xau?.stop_loss}</Text>
        <Text>TP: {xau?.take_profit}</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  title: {
    color: "white",
    fontSize: 22,
    marginBottom: 20
  },
  card: {
    backgroundColor: "#1e293b",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    width: "100%"
  },
  pair: {
    color: "#38bdf8",
    fontSize: 18,
    marginBottom: 5
  }
});
