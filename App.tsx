import React from "react";
import Content from "./src";
import { NativeBaseProvider, StorageManager, ColorMode } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

// From https://docs.nativebase.io/color-mode#persisting-the-color-mode
const colorModeManager: StorageManager = {
  get: async () => {
    try {
      const val = await AsyncStorage.getItem("@color-mode");
      return val === "dark" ? "dark" : "light";
    } catch (e) {
      return "light";
    }
  },
  set: async (value: ColorMode) => {
    try {
      if (value) {
        await AsyncStorage.setItem("@color-mode", value);
      }
    } catch (e) {
      console.error(e);
    }
  },
};

export default function App(): React.ReactElement {
  return (
    <NativeBaseProvider colorModeManager={colorModeManager}>
      <Content />
    </NativeBaseProvider>
  );
}
