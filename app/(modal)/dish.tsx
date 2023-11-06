import React from "react";

import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getDishById } from "@/assets/data/restaurant";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeInRight,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import useBasketStore from "@/store/basketStore";

const Dish = () => {
  const { id } = useLocalSearchParams();
  const item = getDishById(Number(id))!;
  const router = useRouter();
  const {addProduct} = useBasketStore()

  const addToCart = () => {
    addProduct(item)
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).then(
      () =>router.back()
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer} edges={["bottom"]}>
      <View style={styles.container}>
        <Animated.Image
          source={item?.img}
          style={styles.image}
          entering={FadeIn.duration(500).delay(150)}
        />
        <View style={styles.view}>
          <Animated.Text
            style={styles.name}
            entering={FadeInLeft.duration(500).delay(150)}
          >
            {item?.name}
          </Animated.Text>
          <Animated.Text
            style={styles.info}
            entering={FadeInRight.duration(500).delay(150)}
          >
            {item?.info}
          </Animated.Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.fullButton} onPress={addToCart}>
            <Text style={styles.buttonText}>Add for ${item?.price}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: { flex: 1, backgroundColor: Colors.white },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  image: {
    width: "100%",
    height: 300,
  },
  view: {
    padding: 20,
  },
  name: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  info: {
    fontSize: 16,
    color: Colors.medium,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    elevation: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    paddingTop: 20,
  },
  fullButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Dish;
