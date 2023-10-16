import React from "react";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.field}>
          <Ionicons
            style={styles.searchIcon}
            name="ios-search"
            size={20}
            color={Colors.medium}
          />
          <TextInput
            style={styles.input}
            placeholder="Restaurants, groceries, dishes "
          />
        </View>
        <Link href={"/"} asChild>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="options-outline" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "#fff",
  },
  section: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  field: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    paddingLeft: 10,
  },
  input: {
    padding: 10,
    color: Colors.medium,
  },
  button: {
    padding: 10,
  },
});

export default SearchBar;
