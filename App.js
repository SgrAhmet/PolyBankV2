import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import Main from "./src/screens/Main";
import Enterence from "./src/screens/Enterence";
import OnlineEnterence from "./src/screens/OnlineEnterence";
import OnlineMain from "./src/screens/OnlineMain";


export default function App() {
  return (
    //     <View style={styles.container}>
    //       {/* <Text>Open up App.js to start working on your app!</Text>
    //       <StatusBar style="auto" /> */}
    // <StatusBar hidden={true} />

    //       <Main/>
    //     </View>

    <NavigationContainer>
      <Stack.Navigator screenOptions={ {headerShown: false,animationEnabled:false,animation: "none"}} initialRouteName="Enterence">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Enterence" component={Enterence} />
        <Stack.Screen name="OnlineEnterence" component={OnlineEnterence} />
        <Stack.Screen name="OnlineMain" component={OnlineMain} />
      </Stack.Navigator>
    </NavigationContainer>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
