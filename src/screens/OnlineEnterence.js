import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import colors from "../Colors";

import {
  collection,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firestore"; // Firebase yapılandırma dosyanızın yolu

import AsyncStorage from "@react-native-async-storage/async-storage";

const OnlineEnterence = ({ navigation }) => {
  const [test, setTest] = useState("Waiting...");
  const [asyncRoomId, setAsyncRoomId] = useState();

  const getAsyncRoomId = async () => {
    const roomId = await AsyncStorage.getItem("asyncRoomId");

    if (roomId != null) {
      console.log("roomId is " + roomId);
      setAsyncRoomId(roomId);
    } else {
      console.warn("RoomId is not Valid");
    }
  };

  const setAsyncRoomIdFunc =async(newRoomId)=>{
    try {
      await AsyncStorage.setItem(
        "asyncRoomId",newRoomId
      )
    } catch (error) {
        console.warn(error);
    }
  }

  useEffect(() => {
    getAsyncRoomId();
  }, []);

  const generateRoomId = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6 haneli
  };

  const createRoom = async () => {
    if (!asyncRoomId) {
      let roomId;
      let roomRef;
      let exists = true;

      while (exists) {
        roomId = generateRoomId();
        roomRef = doc(db, "deneme", roomId);
        const docSnap = await getDoc(roomRef);
        exists = docSnap.exists();
        console.log("Oda ID:", roomId, "| Var mı?", exists); // Bu satırı ekle
      }

      await setDoc(roomRef, {
        gamers: [
          {
            name: "Banka",
            money: "∞",
          },
        ],
        history: [],
        createdAt: Date.now(),
      });

      console.log("Oda oluşturuldu:", roomId);
      setTest("Oda: " + roomId);

      setAsyncRoomIdFunc(roomId)
      // navigation.navigate("OnlineMain" , {roomId : roomId})
      // console.log("Yoksa");
    }else{
      console.log("varsa");
      navigation.navigate("OnlineMain" , {roomId : asyncRoomId})

    }
  };
  // const addDocument = async () => {
  //   try {
  //     const ordersCollectionRef = collection(db, "deneme");
  //     await (ordersCollectionRef, { test1: "Test1" });
  //   } catch (error) {
  //     console.error("Error adding new order: ", error);
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text>OnlineEnterence - {test} </Text>
      <Text>RoomID - {asyncRoomId} </Text>
      <TouchableOpacity style={styles.button} onPress={() => createRoom()}>
        <Text>Create Room</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          console.log(Math.floor(100000 + Math.random() * 900000).toString())
        }
      >
        <Text>Enter a Room</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  button: {
    backgroundColor: colors.brown,
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
});

export default OnlineEnterence;
