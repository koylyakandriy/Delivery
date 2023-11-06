import React, { useLayoutEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SectionList,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ParallaxScrollViewUI from "react-native-parallax-scroll-view";
import Colors from "@/constants/Colors";
import { restaurant } from "@/assets/data/restaurant";
import { Link, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ScrollEvent } from "react-native-reanimated/src/reanimated2/hook/useAnimatedScrollHandler";
import useBasketStore from "@/store/basketStore";

const Details = () => {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);

  const { items, total } = useBasketStore();

  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<TouchableOpacity[]>([]);

  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const DATA = restaurant.food.map((item, index) => ({
    title: item.category,
    data: item.meals,
    index,
  }));

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];

    selected.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });

    setActiveIndex(index);
  };

  const onScroll = (event: ScrollEvent) => {
    const y = event.nativeEvent.contentOffset.y;

    if (y > 420) {
      opacity.value = withTiming(1);
    } else {
      opacity.value = withTiming(0);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
      headerTinyColor: Colors.primary,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.roundButton}
        >
          <Ionicons name="arrow-back" color={Colors.primary} size={24} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="share-outline" color={Colors.primary} size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="search-outline" color={Colors.primary} size={24} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  return (
    <>
      <ParallaxScrollViewUI
        backgroundColor={Colors.white}
        contentBackgroundColor={Colors.lightGray}
        parallaxHeaderHeight={250}
        stickyHeaderHeight={70}
        renderBackground={() => (
          <Image source={restaurant.img} style={styles.backgroundImage} />
        )}
        renderStickyHeader={() => (
          <View key="sticky-header" style={styles.stickySection}>
            <Text style={styles.stickySectionText}>{restaurant.name}</Text>
          </View>
        )}
        scrollEvent={onScroll}
      >
        <View style={styles.detailsContainer}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantDescription}>
            {restaurant.delivery} •{" "}
            {restaurant.tags.map((tag, index) => (
              <React.Fragment key={index}>
                {`${tag}${index < restaurant.tags.length - 1 ? " • " : ""}`}
              </React.Fragment>
            ))}
          </Text>
          <Text style={styles.restaurantDescription}>{restaurant.about}</Text>

          <SectionList
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            sections={DATA}
            renderItem={({ item, index }) => (
              <Link
                href={{ pathname: "/(modal)/dish", params: { id: item.id } }}
                asChild
              >
                <TouchableOpacity style={styles.items}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.dish}>{item.name}</Text>
                    <Text style={styles.dishInfo}>{item.info}</Text>
                    <Text>${item.price}</Text>
                  </View>
                  <Image source={item.img} style={styles.dishImage} />
                </TouchableOpacity>
              </Link>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.sectionHeader}>{title}</Text>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            SectionSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </ParallaxScrollViewUI>
      <Animated.View style={[styles.stickySegments, animatedStyle]}>
        <View style={styles.segmentShadow}>
          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.segmentView}
          >
            {restaurant.food.map((item, index) => (
              <TouchableOpacity
                ref={(ref) => (itemsRef.current[index] = ref!)}
                key={index}
                style={
                  activeIndex === index
                    ? styles.segmentButtonActive
                    : styles.segmentButton
                }
                onPress={() => selectCategory(index)}
              >
                <Text
                  style={
                    activeIndex === index
                      ? styles.segmentTextActive
                      : styles.segmentText
                  }
                  key={index}
                >
                  {item.category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Animated.View>

      {items > 0 && (
        <View style={styles.footer}>
          <SafeAreaView style={styles.safeAreaContainer} edges={["bottom"]}>
            <View>
              <Link href="/basket" asChild>
                <TouchableOpacity style={styles.fullButton}>
                  <Text style={styles.footerItems}>{items}</Text>
                  <Text style={styles.basket}>View Basket</Text>
                  <Text style={styles.total}>${total}</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </SafeAreaView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: Colors.lightGray,
  },
  restaurantName: {
    fontSize: 30,
    margin: 16,
  },
  restaurantDescription: {
    fontSize: 14,
    marginHorizontal: 16,
    marginVertical: 8,
    lineHeight: 22,
    color: Colors.medium,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    margin: 16,
  },
  stickySection: {
    backgroundColor: Colors.white,
    marginLeft: 70,
    height: 63,
    justifyContent: "flex-end",
  },
  stickySectionText: {
    fontSize: 20,
    margin: 10,
  },
  backgroundImage: { width: "100%", height: 300 },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  bar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  items: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    padding: 16,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.gray,
  },
  dish: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dishInfo: {
    fontSize: 14,
    color: Colors.medium,
    marginVertical: 6,
  },
  dishImage: {
    height: 80,
    width: 80,
    borderRadius: 4,
  },
  stickySegments: {
    position: "absolute",
    height: 50,
    left: 0,
    right: 0,
    top: 70,
    backgroundColor: Colors.white,
    overflow: "hidden",
  },
  segmentShadow: {
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.black,
    alignSelf: "center",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  segmentView: {
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 6,
  },
  segmentButtonActive: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 50,
  },
  segmentButton: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 50,
  },
  segmentTextActive: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  segmentText: {
    color: Colors.primary,
    fontSize: 16,
  },
  safeAreaContainer: { flex: 1, backgroundColor: Colors.white },
  footer: {
    backgroundColor: Colors.white,
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
  footerItems: {
    color: Colors.white,
    backgroundColor: Colors.green,
    fontWeight: "bold",
    padding: 8,
    borderRadius: 14,
  },
  basket: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.white,
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.white,
  },
  fullButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Details;
