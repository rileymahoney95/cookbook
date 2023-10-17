import { StatusBar } from "expo-status-bar";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { ThemeProvider } from "styled-components";
import { theme } from "./src/infrastructure/theme";
import { RecipieScreen } from "./src/screens/recipie.screen";

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  const Tab = createBottomTabNavigator();

  const TAB_ICON = {
    Restaurants: "restaurant",
    Placeholder: "ios-add-circle",
    default: "code-sharp",
  };

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      const iconName = TAB_ICON[route.name] ? TAB_ICON[route.name] : TAB_ICON["default"];
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: "tomato",
    tabBarInactiveTintColor: "gray",
  });

  return (
    <>
      <ThemeProvider theme={theme}>
      <NavigationContainer>
            <Tab.Navigator screenOptions={screenOptions}>
              <Tab.Screen name="Restaurants" component={RecipieScreen} />
              <Tab.Screen name="Placeholder" component={RecipieScreen} />
              <Tab.Screen name="Placeholder2" component={RecipieScreen} />
            </Tab.Navigator>
          </NavigationContainer>
      </ThemeProvider>
      <StatusBar />
    </>
  );
}
