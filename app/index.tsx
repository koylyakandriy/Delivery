import React from "react";

import { ScrollView, StyleSheet, Text } from "react-native";
import Categories from "@/components/Categories";
import Restaurants from "@/components/Restaurants";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";

const Page = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Categories />
        <Text style={styles.header}>Top picks</Text>
        <Restaurants />

        <Text style={styles.header}>Offers near you</Text>
        <Restaurants />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 90,
    backgroundColor: Colors.white,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 4,
    paddingHorizontal: 16,
  },
});
export default Page;
