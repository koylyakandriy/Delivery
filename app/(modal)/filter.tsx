import React, { useEffect, useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "@/constants/Colors";
import { useNavigation } from "expo-router";
import filters from "@/assets/data/filter.json";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Category {
  name: string;
  count: number;
  checked?: boolean;
}

const ItemBox = () => {
  return (
    <>
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="arrow-down-outline" size={20} color={Colors.medium} />
          <Text style={styles.itemText}>Sort</Text>
          <Ionicons name={"chevron-forward"} size={20} color={Colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Ionicons name="fast-food-outline" size={20} color={Colors.medium} />
          <Text style={styles.itemText}>Hygiene rating</Text>
          <Ionicons name={"chevron-forward"} size={20} color={Colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Ionicons name="pricetag-outline" size={20} color={Colors.medium} />
          <Text style={styles.itemText}>Offers</Text>
          <Ionicons name={"chevron-forward"} size={20} color={Colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Ionicons name="nutrition-outline" size={20} color={Colors.medium} />
          <Text style={styles.itemText}>Dietary</Text>
          <Ionicons name={"chevron-forward"} size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>Category</Text>
    </>
  );
};

const Filter = () => {
  const [items, setItems] = useState<Category[]>(filters);
  const [selectedItems, setSelectedItems] = useState<Category[]>([]);

  const navigation = useNavigation();
  const flexWidth = useSharedValue(0);
  const scale = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    width: flexWidth.value,
    opacity: flexWidth.value > 0 ? 1 : 0,
  }));

  const animatedTextStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    const hasSelected = selectedItems.length > 0;
    const itemSelected = items.filter((item) => item.checked);
    const newSelectedItems = itemSelected.length > 0;

    if (hasSelected !== newSelectedItems) {
      flexWidth.value = withTiming(newSelectedItems ? 150 : 0);
      scale.value = withTiming(newSelectedItems ? 1 : 0);
    }

    setSelectedItems(itemSelected);
  }, [items]);

  const handleClearAll = () => {
    const updateItems = items.map((item) => {
      item.checked = false;

      return item;
    });

    setItems(updateItems);
  };

  const handleOnPress = (index: number) => {
    const isChecked = items[index].checked;

    const updatedItems = items.map((item) => {
      if (item.name === items[index].name) {
        item.checked = !isChecked;
      }

      return item;
    });

    setItems(updatedItems);
  };

  const renderItem: ListRenderItem<Category> = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.rowItemText}>
        {item.name} ({item.count})
      </Text>

      <BouncyCheckbox
        size={25}
        disableBuiltInState
        fillColor={Colors.primary}
        unfillColor={Colors.white}
        iconStyle={{ borderColor: Colors.primary, borderRadius: 4 }}
        innerIconStyle={{ borderColor: Colors.primary, borderRadius: 4 }}
        isChecked={item.checked}
        onPress={() => handleOnPress(index)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        ListHeaderComponent={ItemBox}
      />

      <View style={{ height: 55 }} />

      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <Animated.View style={[animatedStyles, styles.outlineButton]}>
            <TouchableOpacity onPress={handleClearAll}>
              <Animated.Text
                style={[animatedTextStyles, styles.outlineButtonText]}
              >
                Clear All
              </Animated.Text>
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity
            style={styles.fullButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.lightGray,
  },
  footer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
    height: 75,
    padding: 10,
    elevation: 10,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: -10,
    },
  },
  fullButton: {
    flex: 1,
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
  itemContainer: {
    backgroundColor: Colors.white,
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  item: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingVertical: 8,
    borderColor: Colors.gray,
    borderBottomWidth: 1,
  },
  itemText: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: Colors.white,
  },
  rowItemText: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },
  outlineButton: {
    borderColor: Colors.primary,
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  outlineButtonText: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Filter;
