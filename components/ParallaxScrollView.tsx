import React, { useLayoutEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SectionList,
} from "react-native";
import ParallaxScrollViewUI from "react-native-parallax-scroll-view";
import Colors from "@/constants/Colors";
import { restaurant } from "@/assets/data/restaurant";
import { Link, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const ParallaxScrollView = () => {
  const navigation = useNavigation();

  const DATA = restaurant.food.map((item, index) => ({
    title: item.category,
    data: item.meals,
    index,
  }));

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
    <ParallaxScrollViewUI
      backgroundColor={Colors.white}
      contentBackgroundColor={Colors.lightGray}
      // style={{ flex: 1 }}
      // contentBackgroundColor="pink"
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
      // renderForeground={() => (
      //   <View
      //     style={{
      //       height: 300,
      //       flex: 1,
      //       alignItems: "center",
      //       justifyContent: "center",
      //     }}
      //   >
      //     <Text>Hello World!</Text>
      //   </View>
      // )}
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
            <Link href={"/"} asChild>
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
});

export default ParallaxScrollView;
