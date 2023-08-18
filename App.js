import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text } from "react-native";

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

  return (
    <>
      <ThemeProvider theme={theme}>
        <RecipieScreen />
      </ThemeProvider>
      <StatusBar />
    </>
  );
}
