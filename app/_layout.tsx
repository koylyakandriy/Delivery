import { Stack } from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

const RootLayoutNav = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{}} />
    </Stack>
  );
};

export default RootLayoutNav;
