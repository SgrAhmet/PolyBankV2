import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import colors from '../Colors';
import Icon6 from "react-native-vector-icons/FontAwesome6";

const Enterence = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate("OnlineEnterence")}>
      <Icon6
                name="gear"
                size={48}
                color={colors.darkGreen}
              />
        </TouchableOpacity> */}

      <Text>Enterence</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("OnlineEnterence")}><Text>Go To Online</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Main")}><Text>Go To Offline</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  button:{
    backgroundColor:colors.brown,
    padding:10,
    borderRadius:10,
    margin:10
  },
  settingsButton:{
    // backgroundColor:"red",
    // display:"flex",
    position:"absolute",
    top:80,
    right:30
  }
});

export default Enterence;