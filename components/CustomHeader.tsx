import React, { useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import SearchBar from "@/components/SearchBar";
import BottomSheet from "@/components/BottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const CustomHeader = () => {
  const bottomSheetRed = useRef<BottomSheetModal>(null);
  const openModal = () => {
    bottomSheetRed.current?.present();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <BottomSheet ref={bottomSheetRed} />
      <View style={styles.container}>
        <TouchableOpacity onPress={openModal}>
          <Image
            style={styles.logo}
            source={require("@/assets/images/pngegg.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.titleContainer} onPress={openModal}>
          <Text style={styles.title}>Delivery * Now</Text>
          <View style={styles.location}>
            <Text style={styles.subTitle}>Lviv</Text>
            <Ionicons name="chevron-down" size={20} color={Colors.primary} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name={"person-outline"} size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <SearchBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    height: 60,
    backgroundColor: Colors.white,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  logo: {
    width: 30,
    height: 30,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: Colors.medium,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  location: {
    flexDirection: "row",
  },
  profileButton: {
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 50,
  },
});

export default CustomHeader;
