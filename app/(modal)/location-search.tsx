import React, { useState } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView from "react-native-maps";
import Colors from "@/constants/Colors";
import { useNavigation } from "expo-router";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";

const LocationSearch = () => {
  const [location, setLocation] = useState({
    latitude: 48.92275862204645,
    longitude: 24.71039805634455,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails
        onPress={(data, details) => {
          const point = details?.geometry.location;

          if (!point) return;

          setLocation({
            ...location,
            latitude: point.lat,
            longitude: point.lng,
          });
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          language: "en",
        }}
        renderLeftButton={() => (
          <View style={styles.boxIcon}>
            <Ionicons name="search-outline" size={24} color={Colors.medium} />
          </View>
        )}
        styles={{
          container: { flex: 0 },
          textInputContainer: {
            padding: 8,
            backgroundColor: Colors.white,
          },
          textInput: {
            backgroundColor: Colors.gray,
            paddingLeft: 35,
            borderRadius: 10,
          },
        }}
      />

      <MapView style={styles.map} region={location} showsUserLocation />

      <View style={styles.absoluteBox}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxIcon: {
    position: "absolute",
    top: 18,
    left: 15,
    zIndex: 1,
  },
  map: {
    flex: 1,
  },
  absoluteBox: {
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default LocationSearch;
