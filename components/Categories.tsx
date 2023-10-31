import React from "react";

import { ScrollView, View, StyleSheet, Image, Text } from "react-native";
import { categories } from "@/assets/data/home";
import Colors from "@/constants/Colors";

const Categories = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ padding: 6 }}
    >
      {categories.map((category, index) => (
        <View key={index} style={styles.categoryCard}>
          <Image source={category.img} />
          <Text style={styles.categoryText}>{category.text}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    backgroundColor: Colors.white,
    width: 100,
    height: 100,
    marginEnd: 10,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    borderRadius: 4,
  },
  categoryText: {
    padding: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Categories;
