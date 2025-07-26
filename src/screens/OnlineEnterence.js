import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Alert,
} from "react-native";
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
import { db } from "../../firebaseConfig"; // Firebase yapılandırma dosyanızın yolu

import AsyncStorage from "@react-native-async-storage/async-storage";

import { t, setLanguage,currentLang } from "../../locales/lang";

const OnlineEnterence = ({ navigation }) => {
  const [test, setTest] = useState("Waiting...");
  const [asyncRoomId, setAsyncRoomId] = useState();
  const [inputRoomId, setInputRoomId] = useState("");

  const getAsyncRoomId = async () => {
    const roomId = await AsyncStorage.getItem("asyncRoomId");

    if (roomId != null) {
      // console.log("roomId is " + roomId);
      setAsyncRoomId(roomId);
    } else {
      console.warn("RoomId is not Valid");
    }
  };

  const setAsyncRoomIdFunc = async (newRoomId) => {
    try {
      await AsyncStorage.setItem("asyncRoomId", newRoomId);

      console.log("AsyncStorage newRoomId added");
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getAsyncRoomId();
  }, []);

  const generateRoomId = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6 haneli
  };

  const createRoom = async () => {
    // console.log(asyncRoomId);

    if (!asyncRoomId) {
      let roomId;
      let roomRef;
      let exists = true;

      while (exists) {
        roomId = generateRoomId();
        roomRef = doc(db, "rooms", roomId);
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

      setAsyncRoomIdFunc(roomId);
      setAsyncRoomId(roomId);
      navigation.navigate("OnlineMain", { roomId: roomId });
    } else {
      // console.log("varsa");
      navigation.navigate("OnlineMain", {
        roomId: asyncRoomId,
        spectator: false,
      });
    }
  };

  const EnterRoom = async () => {
    // console.log(inputRoomId.trim().length)
    if (
      inputRoomId.trim() == "" ||
      inputRoomId.trim().length < 6 ||
      inputRoomId.trim().length > 6
    ) {
      Alert.alert(
        t("invalidRoomId"),
        t("pleaseEnterValidRoomId")
      );
    } else {
      // console.log("jglkdfjhgkdnghkjfkjnk");
      try {
        let exists = true;
        let roomRef = doc(db, "rooms", inputRoomId);
        const docSnap = await getDoc(roomRef);
        exists = docSnap.exists();
        console.log("Oda ID:", inputRoomId, "| Var mı?", exists); // Bu satırı ekle

        if (exists) {
          navigation.navigate("OnlineMain", {
            roomId: inputRoomId,
            spectator: true,
          });
          setInputRoomId("");
        } else {
          Alert.alert(
            t("cantFindRoomId"),
            t("pleaseEnterValidRoomId")
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };


  return (
    <View style={styles.container}>
      {/* <Text>OnlineEnterence - {test} </Text> */}
      <Text style={styles.h1Text}>{t("yourRoomId")}:{asyncRoomId == undefined ?t("notCreatedYet"): asyncRoomId } </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.darkGreen }]}
        onPress={() => createRoom()}
      >
        <Text style={[styles.btnText, { color: colors.brown }]}>
          {t("createRoom")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: colors.brown,
            borderTopRightRadius:20,
            borderTopLeftRadius:20,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
        ]}
        onPress={() => EnterRoom()}
      >
        <Text style={[styles.btnText, { color: colors.darkGreen }]}>
        {t("enterRoom")}
        </Text>
      </TouchableOpacity>

      <TextInput
        style={styles.textInput}
        placeholder={t("enterRoomId")}
        keyboardType="numeric"
        maxLength={6}
        caretHidden={true}
        value={inputRoomId}
        placeholderTextColor= {colors.lightBrown}
        onChangeText={(text) => setInputRoomId(text)}
      />
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
    marginTop: 10,
    width: "80%",
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
  textInput: {
    width: "80%",
    color:colors.brown,
    borderColor: colors.brown,
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
    textAlign:"center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  h1Text: {
    fontSize: 20,
    color: colors.white,
    fontWeight: "900",
    fontFamily: "monospace",
    // marginBottom: 50,
  },
});

export default OnlineEnterence;
