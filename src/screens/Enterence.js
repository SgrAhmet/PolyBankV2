import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import colors from '../Colors';

const Enterence = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Enterence</Text>
      <TouchableOpacity onPress={() => navigation.navigate("OnlineEnterence")}><Text>Go To Online</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Main")}><Text>Go To Offline</Text></TouchableOpacity>
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
});

export default Enterence;