import { Stack, useNavigation } from "expo-router";
import CustomHeader from "@/components/CustomHeader";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Colors from "@/constants/Colors";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

const RootLayoutNav = () => {
  const navigation = useNavigation();

  return (
    <BottomSheetModalProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ header: () => <CustomHeader /> }}
        />
        <Stack.Screen
          name="(modal)/filter"
          options={{
            presentation: "modal",
            headerTitle: "Filter",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: Colors.lightGray,
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="close-outline"
                  size={28}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="(modal)/location-search"
          options={{
            presentation: "fullScreenModal",
            headerTitle: "Select location",
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="close-outline"
                  size={28}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="(modal)/dish"
          options={{
            presentation: "modal",
            headerTitle: "",
            headerTransparent: true,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.dishCloseButton}
              >
                <Ionicons
                  name="close-outline"
                  size={28}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  dishCloseButton: {
    backgroundColor: Colors.white,
    padding: 6,
    borderRadius: 20,
  },
});

export default RootLayoutNav;
