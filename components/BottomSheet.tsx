import React, { forwardRef, useCallback, useMemo } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const BottomSheet = forwardRef<BottomSheetModal>((props, ref) => {
  const { dismiss } = useBottomSheetModal();
  const snapPoint = useMemo(() => ["55%"], []);

  const renderBackdrop = useCallback(
    //   TODO: fix any
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      snapPoints={snapPoint}
      ref={ref}
      overDragResistanceFactor={0}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.modalBackground}
      handleIndicatorStyle={false}
    >
      <View style={styles.contentContainer}>
        <View style={styles.toggle}>
          <TouchableOpacity style={styles.toggleActive}>
            <Text style={styles.activeText}>Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleInactive}>
            <Text style={styles.inactiveText}>Pickup</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subHeader}>Your location</Text>
        <Link href={"/"} asChild>
          <TouchableOpacity>
            <View style={styles.item}>
              <Ionicons
                name="location-outline"
                size={20}
                color={Colors.medium}
              />
              <Text style={styles.itemText}>Current Location</Text>
              <Ionicons
                name={"chevron-forward"}
                size={20}
                color={Colors.primary}
              />
            </View>
          </TouchableOpacity>
        </Link>

        <Text style={styles.subHeader}>Arrival time</Text>
        <Link href={"/"} asChild>
          <TouchableOpacity>
            <View style={styles.item}>
              <Ionicons
                name="stopwatch-outline"
                size={20}
                color={Colors.medium}
              />
              <Text style={styles.itemText}>Now</Text>
              <Ionicons
                name={"chevron-forward"}
                size={20}
                color={Colors.primary}
              />
            </View>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity style={styles.button} onPress={() => dismiss()}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: Colors.lightGray,
    borderRadius: 0,
  },
  contentContainer: {
    flex: 1,
  },
  toggle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    marginBottom: 20,
  },
  toggleActive: {
    backgroundColor: Colors.primary,
    padding: 8,
    paddingHorizontal: 30,
    borderRadius: 32,
  },
  activeText: {
    color: Colors.white,
    fontWeight: "700",
  },
  toggleInactive: {},
  inactiveText: {
    color: Colors.primary,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  subHeader: {
    fontWeight: "600",
    margin: 14,
  },
  item: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 16,
    borderColor: Colors.gray,
    borderWidth: 1,
  },
  itemText: {
    flex: 1,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "bold",
  },
});

export default BottomSheet;
