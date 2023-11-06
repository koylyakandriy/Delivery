import React, { useState } from "react";

import {
  FlatList,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import useBasketStore from "@/store/basketStore";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import ConfettiCannon from "react-native-confetti-cannon";
import { Link } from "expo-router";

const Basket = () => {
  const [order, setOrder] = useState(false);
  const { products, total, clearCart, reduceProduct } = useBasketStore();

  const FEES = {
    service: 2.99,
    delivery: 5.99,
  };

  const startCheckout = () => {
    setOrder(true);
    clearCart();
  };

  return (
    <>
      {order && (
        <ConfettiCannon
          count={200}
          origin={{ x: -10, y: 0 }}
          fallSpeed={2500}
          fadeOut={true}
          autoStart={true}
        />
      )}

      {order && (
        <View style={styles.orderContainer}>
          <Text style={styles.orderText}>Thank you for the order</Text>
          <Link href={"/"} asChild>
            <TouchableOpacity style={styles.orderButton}>
              <Text style={styles.buttonText}>New Order</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}

      {!order && (
        <>
          <FlatList
            data={products}
            ListHeaderComponent={() => <Text style={styles.items}>Items</Text>}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListFooterComponent={
              <View>
                <View style={styles.separator} />

                <View style={styles.total}>
                  <Text style={styles.subtotal}>Subtotal</Text>
                  <Text style={styles.price}>${total}</Text>
                </View>

                <View style={styles.total}>
                  <Text style={styles.subtotal}>Service</Text>
                  <Text style={styles.price}>${FEES.service}</Text>
                </View>

                <View style={styles.total}>
                  <Text style={styles.subtotal}>Delivery</Text>
                  <Text style={styles.price}>${FEES.delivery}</Text>
                </View>

                <View style={styles.separator} />

                <View style={styles.total}>
                  <Text style={styles.subtotal}>Order Total</Text>
                  <Text style={styles.price}>
                    ${(total + FEES.service + FEES.delivery).toFixed(2)}
                  </Text>
                </View>
              </View>
            }
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.quantity}>{item.quantity}x</Text>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>${item.price * item.quantity}</Text>
              </View>
            )}
          />

          <View style={styles.footer}>
            <SafeAreaView style={styles.safeAreaContainer} edges={["bottom"]}>
              <TouchableOpacity
                style={styles.fullButton}
                onPress={startCheckout}
              >
                <Text style={styles.buttonText}>Order now</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  items: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.gray,
  },
  total: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  row: {
    backgroundColor: Colors.white,
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    gap: 20,
  },
  quantity: { color: Colors.primary },
  name: {
    flex: 1,
    fontSize: 18,
  },
  price: {
    fontSize: 18,
  },
  subtotal: {
    color: Colors.medium,
    fontSize: 18,
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
    backgroundColor: Colors.white,
  },
  safeAreaContainer: { flex: 1, backgroundColor: Colors.white },
  fullButton: {
    backgroundColor: Colors.primary,
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  orderContainer: {
    marginTop: "50%",
    padding: 20,
    alignItems: "center",
  },
  orderText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  orderButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    width: 200,
    height: 50,
    justifyContent: "center",
  },
});

export default Basket;
