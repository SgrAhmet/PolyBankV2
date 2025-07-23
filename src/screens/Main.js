import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import Icon6 from "react-native-vector-icons/FontAwesome6";
import Icon5 from "react-native-vector-icons/FontAwesome5";
import IconIon from "react-native-vector-icons/Ionicons";
import colors from "../Colors";
import PlayerListItem from "../PlayerListItem";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import x from "../"

const Main = () => {
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [newGamerName, setNewGamerName] = useState("");
  const [selecteds, setSelecteds] = useState({
    pozitif: null,
    negatif: null,
  });
  const [moneyQuantity, setMoneyQuantity] = useState("");
  const [gamers, setGamers] = useState([
    {
      name: "Banka",
      money: "∞",
    },
  ]);

  const [history, setHistory] = useState([]);

  const [moneybills, setMoneybills] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  const setAsyncItem = async () => {
    try {
      await AsyncStorage.setItem("offlineGamers", JSON.stringify(gamers));
      await AsyncStorage.setItem("offlineHistory", JSON.stringify(history));
    } catch (error) {
      // Error saving data
    }
  };

  const getAsyncItem = async () => {
    try {
      const offlineGamers = await AsyncStorage.getItem("offlineGamers");
      const offlineHistory = await AsyncStorage.getItem("offlineHistory");
      const offlineMoneyBills = await AsyncStorage.getItem("offlineMoneyBills");

      if (offlineGamers != null && offlineHistory != null) {
        setGamers(JSON.parse(offlineGamers));
        setHistory(JSON.parse(offlineHistory));
      }

      if (offlineMoneyBills != null) {
        setMoneybills(JSON.parse(offlineMoneyBills));
      } else {
        setMoneybills([10, 20, 50, 100, 200, 500, 1000, 5000]);
      }
    } catch (error) {
      // Error retrieving data
      console.log("Erorrrrs");
    }
  };

  useEffect(() => {
    getAsyncItem();
  }, []);

  // const consoleAsyncStorage =async()=>{

  //   const data1 =await AsyncStorage.getItem("offlineGamers")
  //   const data2 =await AsyncStorage.getItem("offlineGamers")

  //   if (data1 !== null && data2 !== null) {

  //     console.log(JSON.parse(data1));
  //     console.log(JSON.parse(data2));

  //   }
  // }

  useEffect(() => {
    setAsyncItem();
    // consoleAsyncStorage()
  }, [gamers, history]);

  const addNewGamer = () => {
    if (newGamerName.trim() != "") {
      setGamers([...gamers, { name: newGamerName, money: 0 }]);
      setHistory([
        { pozitif: newGamerName, negatif: "Banka", quantity: "newGamer" },
        ...history,
      ]);
      setNewGamerName("");
    }

    // setAsyncItem()
  };

  const handleMoneyBill = (e) => {
    setMoneyQuantity(Number(moneyQuantity) + e);
  };

  const [sound, setSound] = useState();

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../soundEffect2.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  };

  const transferMoney = () => {
    
    if (moneyQuantity > 0 && selecteds.pozitif != selecteds.negatif) {
      if (selecteds.pozitif != null && selecteds.negatif != null) {
        const updatedGamers = gamers.map((player, index) => {
          if (player.name === "Banka") {
            return player; // "Banka" oyuncusunun parasını değiştirme, olduğu gibi bırak
          }

          if (index === selecteds.pozitif) {
            return {
              ...player,
              money: Number(player.money) + moneyQuantity, // Pozitif oyuncunun parasını artır
            };
          }

          if (index === selecteds.negatif) {
            return {
              ...player,
              money: Number(player.money) - moneyQuantity, // Negatif oyuncunun parasını azalt
            };
          }

          return player; // Diğer oyuncular için değişiklik yapma
        });

        setGamers(updatedGamers);
        setMoneyQuantity(""); // Para miktarını sıfırla

        playSound();
      }
      let historyItem = {
        pozitif: gamers[selecteds.pozitif].name,
        negatif: gamers[selecteds.negatif].name,
        quantity: moneyQuantity,
      };
      setHistory([historyItem, ...history]);

      // setAsyncItem()
    } else {
      // console.log("Error");
    }
  };

  const handleHistory = () => {
    setModalVisible(true);
    // getAsyncItem()
  };

  const resetGame = () => {
    // console.log("Game Reset");

    setGamers([
      {
        name: "Banka",
        money: "∞",
      },
    ]);
    setHistory([]);
    setMoneybills([10, 20, 50, 100, 200, 500, 1000, 5000]);
  };
  const handleReset = () => {
    Alert.alert(
      "Oyunu Sıfırlamak",
      "Oyunu Sıfırlamak İstediğinizden Emin Misiniz ?",
      [
        {
          text: "Hayır",
          // onPress: () => console.log('Cancel Pressed'),
          style: "cancel",
        },
        { text: "Evet", onPress: resetGame },
      ]
    );
  };

  useEffect(() => {
    if (moneybills.length > 0) {
      setAsyncMoneyBills();
    }
  }, [moneybills]);

  const setAsyncMoneyBills = async () => {
    try {
      await AsyncStorage.setItem(
        "offlineMoneyBills",
        JSON.stringify(moneybills)
      );
      // console.log("offlineMoneyBills Değişti")
      // console.log(moneybills);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLongMoneyBill = (e) => {



    if(moneyQuantity != ""){

    console.log(moneyQuantity);
    let newMoneyBills = [...moneybills];
    newMoneyBills[moneybills.indexOf(e)] = Number(moneyQuantity);
    setMoneybills(newMoneyBills);
    }


  };


  return (
    <View style={styles.container}>
      {/* ====== Banner ====== */}
      <View style={styles.banner}>
        <Text style={styles.h1Text}>PolyBank V2</Text>
        <View style={styles.bannerBtnArea}>
          <TouchableOpacity onPress={() => handleHistory()}>
            <Icon5 name="history" size={26} color={colors.white} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSelecteds({
                pozitif: null,
                negatif: null,
              });
              setMoneyQuantity("");
            }}
            onLongPress={handleReset}
          >
            <Icon5 name="undo-alt" size={24} color={colors.white} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsEditVisible(!isEditVisible)}>
            <Icon6
              name="pencil"
              size={24}
              color={isEditVisible ? colors.lightGreen : colors.white}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* {========= Modal =========} */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {/* Dış kutu (card görünümü) */}
          <View style={styles.modalCard}>
            {/* İçerik scrollable */}
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              {history.map((e, i) => {
                if (e.quantity == "newGamer" || e.quantity == "deleteGamer") {
                  return (
                    <View style={styles.modalItem} key={i}>
                      <Text>{e.negatif}</Text>

                      <IconIon
                        name={
                          e.quantity == "newGamer"
                            ? "person-add"
                            : "person-remove"
                        }
                        size={32}
                        color={colors.darkGreen}
                      />

                      <Text>{e.pozitif}</Text>
                    </View>
                  );
                } else {
                  return (
                    <View style={styles.modalItem} key={i}>
                      <Text>{e.negatif}</Text>
                      <Text>{e.quantity} ₩</Text>
                      <Icon5
                        name="long-arrow-alt-right"
                        size={32}
                        color={colors.darkGreen}
                      />
                      <Text>{e.pozitif}</Text>
                    </View>
                  );
                }
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ====== ScrollView ile içeriği kaydırılabilir hale getiriyoruz ====== */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.moneyArea}>
          <View style={styles.moneyInputArea}>
            <TextInput
              style={styles.input}
              // keyboardType="numeric"
              placeholder="Para Miktarını Gir..."
              value={moneyQuantity.toString()}
              onChangeText={(text) => {
                // Virgülü noktaya çevir ama silme!
                const fixedText = text.replace(",", ".");
                // Sadece rakam ve tek bir nokta içersin
                const valid = fixedText.match(/^(\d+(\.\d*)?)?$/);
                if (valid || fixedText === "") {
                  setMoneyQuantity(fixedText);
                }
              }}
              keyboardType="decimal-pad"
            />
            <TouchableOpacity onPress={transferMoney}>
              <Icon6
                name="money-bill-transfer"
                size={32}
                color={colors.darkGreen}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.moneyBillArea}>
            <View style={styles.moneyBillRow}>
              {moneybills?.slice(0, 4).map((e) => {
                return (
                  <TouchableOpacity
                    key={Math.ceil(Math.random() * 100000)}
                    style={styles.moneyBill}
                    onPress={() => handleMoneyBill(e)}
                    onLongPress={() => handleLongMoneyBill(e)}
                  >
                    <Text style={styles.h4Text}>{e}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.moneyBillRow}>
              {moneybills.slice(4, 8).map((e) => {
                return (
                  <TouchableOpacity
                    key={Math.ceil(Math.random() * 100000)}
                    style={styles.moneyBill}
                    onPress={() => handleMoneyBill(e)}
                    onLongPress={() => handleLongMoneyBill(e)}
                  >
                    <Text style={styles.h4Text}>{e}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* ====== Player List ====== */}

        {/* ====== Edit Area (Görünürlüğü state ile kontrol ediliyor) ====== */}
        {isEditVisible && (
          <View style={styles.editArea}>
            <TextInput
              style={styles.input}
              value={newGamerName}
              onChangeText={(text) => setNewGamerName(text)}
              placeholder="İsim gir..."
            />
            <TouchableOpacity onPress={addNewGamer}>
              <Icon5 name="user-plus" size={32} color={colors.darkGreen} />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.playerArea}>
          {gamers.map((player, i) => {
            return (
              <PlayerListItem
                key={i}
                index={i}
                name={player.name}
                money={player.money}
                selecteds={selecteds}
                setSelecteds={setSelecteds}
                gamers={gamers}
                setGamers={setGamers}
                isEditVisible={isEditVisible}
                history={history}
                setHistory={setHistory}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    width: "100%",
    gap: 5,
  },
  scrollContainer: {
    // backgroundColor:"red",
    paddingBottom: 20, // Kaydırma sorunu olmaması için ekstra boşluk bırak
  },
  banner: {
    backgroundColor: colors.darkGreen,
    width: "100%",
    height: "12%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 35,
    paddingLeft: 30,
    paddingRight: 30,
  },
  bannerBtnArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
  },
  h1Text: {
    fontSize: 28,
    color: colors.white,
    fontWeight: "900",
  },
  playerArea: {
    // backgroundColor: "blue",
    flexDirection: "column",
    gap: 10,
  },
  editArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    zIndex: 999,
  },
  input: {
    width: "60%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    fontSize: 20,
  },
  moneyArea: {
    // backgroundColor: "red",
    height: 200,
    width: "100%",
  },
  moneyInputArea: {
    // backgroundColor:"white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  moneyBillArea: {
    // backgroundColor: "red",
    padding: 10,
    height: "60%",
    display: "flex",
  },
  moneyBillRow: {
    // backgroundColor:"green",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  moneyBill: {
    backgroundColor: colors.lightGreen,
    // padding: 10,
    // paddingHorizontal: 20,
    width: "20%",
    height: "80%",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  h4Text: {
    fontSize: 25,
  },
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20, // Kaydırma sorunu olmaması için ekstra boşluk bırak
  },
  modalCard: {
    backgroundColor: colors.white,
    width: "90%",
    maxHeight: "80%",
    borderRadius: 20,
    padding: 20,
  },
  modalItem: {
    backgroundColor: colors.red,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 12,
    gap: 20,
    padding: 10,
    marginBottom: 16,
  },
});

export default Main;