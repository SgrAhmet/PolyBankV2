import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import Icon6 from "react-native-vector-icons/FontAwesome6";
import Icon5 from "react-native-vector-icons/FontAwesome5";
import colors from "./Colors";
import PlayerListItem from "./PlayerListItem";
import { Audio } from "expo-av";

const Main = () => {
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [newGamerName, setNewGamerName] = useState("");
  const [selecteds, setSelecteds] = useState({
    pozitif: null,
    negatif: null,
  });
  const [moneyQuantity, setMoneyQuantity] = useState(0);
  const [gamers, setGamers] = useState([
    {
      name: "Banka",
      money: "∞",
    },
  ]);

  const addNewGamer = () => {
    setGamers([...gamers, { name: newGamerName, money: 0 }]);
    setNewGamerName("")
  };

  const handleMoneyBill = (e) => {
    setMoneyQuantity(Number(moneyQuantity) + e);
  };

  const [sound, setSound] = useState();

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./soundEffect2.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  };

  const transferMoney = () => {
    if (selecteds.pozitif != null && selecteds.negatif != null) {
      const updatedGamers = gamers.map((player, index) => {
        if (player.name === "Banka") {
          return player; // "Banka" oyuncusunun parasını değiştirme, olduğu gibi bırak
        }

        if (index === selecteds.pozitif) {
          return {
            ...player,
            money: player.money + moneyQuantity, // Pozitif oyuncunun parasını artır
          };
        }

        if (index === selecteds.negatif) {
          return {
            ...player,
            money: player.money - moneyQuantity, // Negatif oyuncunun parasını azalt
          };
        }

        return player; // Diğer oyuncular için değişiklik yapma
      });

      setGamers(updatedGamers);
      setMoneyQuantity(0); // Para miktarını sıfırla

      playSound()

    }
  };

  return (
    <View style={styles.container}>
      {/* ====== Banner ====== */}
      <View style={styles.banner}>
        <Text style={styles.h1Text}>PolyBank V2</Text>
        <View style={styles.bannerBtnArea}>
          <TouchableOpacity
            onPress={() => {
              setSelecteds({
                pozitif: null,
                negatif: null,
              });
              setMoneyQuantity(0);
            }}
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

      {/* ====== ScrollView ile içeriği kaydırılabilir hale getiriyoruz ====== */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.moneyArea}>
          <View style={styles.moneyInputArea}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Para Miktarını Gir..."
              value={moneyQuantity.toString()}
              onChangeText={(text) => setMoneyQuantity(Number(text))}
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
              {[10, 20, 50, 100].map((e) => {
                return (
                  <TouchableOpacity
                    key={e}
                    style={styles.moneyBill}
                    onPress={() => handleMoneyBill(e)}
                  >
                    <Text style={styles.h4Text}>{e}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.moneyBillRow}>
              {[200, 500, 1000, 5000].map((e) => {
                return (
                  <TouchableOpacity
                    key={e}
                    style={styles.moneyBill}
                    onPress={() => handleMoneyBill(e)}
                  >
                    <Text style={styles.h4Text}>{e}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* ====== Player List ====== */}
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
              />
            );
          })}
        </View>

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
});

export default Main;
