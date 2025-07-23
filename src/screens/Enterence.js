import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import colors from "../Colors";
import Icon5 from "react-native-vector-icons/FontAwesome5";
// import AsyncStorage from '@react-native-async-storage/async-storage';

const Enterence = ({ navigation }) => {
  // AsyncStorage.clear()

  return (
    <View style={styles.container}>
      <Text style={styles.h1Text}>PolyBank</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.brown }]}
        onPress={() => navigation.navigate("OnlineEnterence")}
      >
        <Icon5 name="globe-americas" size={24} color={colors.darkGreen} />
        <Text style={[styles.btnText, { color: colors.darkGreen }]}>
          ONLINE
        </Text>
        <Icon5 name="globe-americas" size={24} color={colors.darkGreen} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.darkGreen }]}
        onPress={() => navigation.navigate("Main")}
      >
        <Icon5 name="gamepad" size={24} color={colors.brown} />

        <Text style={[styles.btnText, { color: colors.brown }]}>OFFLINE</Text>
        <Icon5 name="gamepad" size={24} color={colors.brown} />

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGreen,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  button: {
    backgroundColor: colors.brown,
    padding: 15,
    borderRadius: 30,
    margin: 10,
    width: "80%",
    // textAlign:"center"
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.brown,
    flexDirection: "row",
    borderWidth: 1,
    gap: 20,
  },
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "monospace",
    // color:"red"
  },
  h1Text: {
    fontSize: 32,
    color: colors.brown,
    fontWeight: "900",
    fontFamily: "monospace",
    marginBottom: 50,
  },
});

export default Enterence;
