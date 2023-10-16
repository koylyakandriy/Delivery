import { Stack } from "expo-router";
import CustomHeader from "@/components/CustomHeader";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

const RootLayoutNav = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ header: () => <CustomHeader /> }} />
    </Stack>
  );
};

export default RootLayoutNav;
