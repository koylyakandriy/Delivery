import React from "react";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { restaurants } from "@/assets/data/home";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

const Restaurants = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ padding: 6 }}
    >
      {restaurants.map((restaurant, index) => (
        <Link href={"/details"} key={index} asChild>
          <TouchableOpacity>
            <View style={styles.categoryCard}>
              <Image source={restaurant.img} style={styles.imageContainer} />

              <View style={styles.categoryBox}>
                <Text style={styles.categoryText}>{restaurant.name}</Text>
                <Text style={styles.categoryRating}>
                  {restaurant.rating} {restaurant.ratings}
                </Text>
                <Text style={styles.categoryDistance}>
                  {restaurant.distance}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    backgroundColor: Colors.white,
    width: 300,
    height: 250,
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
    paddingVertical: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
  imageContainer: {
    flex: 5,
    width: undefined,
  },
  categoryBox: {
    flex: 2,
    padding: 5,
  },
  categoryRating: {
    color: Colors.green,
  },
  categoryDistance: {
    color: Colors.medium,
  },
});

export default Restaurants;
