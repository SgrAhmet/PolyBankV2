import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import Icon5 from "react-native-vector-icons/FontAwesome5";
import Icon6 from "react-native-vector-icons/FontAwesome6";
import Icon from "react-native-vector-icons/FontAwesome";
import IconIon from "react-native-vector-icons/Ionicons";
import colors from "./Colors";
import { t, setLanguage, currentLang } from "../locales/lang";

const PlayerListItem = ({
  index,
  name,
  money,
  selecteds,
  setSelecteds,
  gamers,
  setGamers,
  isEditVisible,
  history,
  setHistory,
  spectator,
}) => {
  const changePozitive = () => {
    // if(selecteds.negatif != index){
    setSelecteds({ ...selecteds, pozitif: index });
    // }
  };
  const changeNegative = () => {
    // if(selecteds.pozitif != index){
    setSelecteds({ ...selecteds, negatif: index });
    // }
  };

  let styleNegative = [styles.btnArea];
  if (selecteds.negatif == index) {
    styleNegative.push({ backgroundColor: colors.red });
  }

  let stylePozitive = [styles.btnArea];
  if (selecteds.pozitif == index) {
    stylePozitive.push({ backgroundColor: colors.lightGreen });
  }

  const deleteGamer = () => {
    setHistory([
      { pozitif: name, negatif: "Banka", quantity: "deleteGamer" },
      ...history,
    ]);
    setGamers((prev) => prev.filter((_, i) => i !== index));
  };

  let styleDelete = [styles.deleteBtn, { display: "none" }];
  if (isEditVisible) {
    styleDelete.pop();
  }

  if (index == 0 && name == "Banka") {
    name = t("bank");
  }
  // Monopoly Symbol ₩

  return (
    <View style={styles.container}>
      {/* <IconIon name="person" size={32} color={colors.white} /> */}

      {index == 0 ? (
        <View style={styles.iconArea}>
          <Icon name="bank" size={32} color={colors.white} />
        </View>
      ) : (
        <View style={styles.iconArea}>
          <IconIon name="person" size={32} color={colors.white} />
        </View>
      )}

      <View style={styles.nameArea}>
        <Text style={styles.h3Text}>{name}</Text>
      </View>

      <View style={styles.moneyArea}>
        {index == 0 ? (
          <View style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
          <Icon6 name="infinity" size={32} color={colors.black} />
          <Text style={styles.h3Text}> $</Text>
          
          </View>
        ) : (
          <Text style={styles.h3Text}>{money} $</Text>
          
        )}
      </View>

      <View
        style={[
          styles.btnsArea,
          { display: spectator || isEditVisible ? "none" : null },
        ]}
      >
        <TouchableOpacity style={[stylePozitive]} onPress={changePozitive}>
          <Icon5 name="plus" size={24} color={colors.white} />
        </TouchableOpacity>

        <TouchableOpacity style={[styleNegative]} onPress={changeNegative}>
          <Icon5 name="minus" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={index != 0 ? styleDelete : { display: "none" }}
        onPress={deleteGamer}
      >
        <Icon5 name="trash-alt" size={32} color={colors.lightRed} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: colors.brown,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 90,
    // height: "16%",
    margin: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
    // gap: 5,
    overflow: "hidden",
    gap: 10,
    // width:"95%"
  },
  h3Text: {
    fontSize: 20,
    fontWeight: 400,
    fontFamily: "monospace",
  },
  btnsArea: {
    // minWidth: "30%",
    // height: "80%",
    // backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  btnArea: {
    backgroundColor: colors.darkGreen,
    padding: 7,
    paddingHorizontal: 9,
    // padding: 10,
    // paddingHorizontal: 12,
    // borderColor: colors.black,
    // borderWidth: 2,
    borderRadius: 5,
  },
  iconArea: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    // backgroundColor: "red",
    minWidth: 40,
  },
  nameArea: {
    display: "flex",
    // alignItems:"center",
    // justifyContent:"center",
    // textAlign:"center",
    // backgroundColor: "orange",
    // minWidth:120,
    // maxWidth:130,
    width: "20%",
    // width:60
  },
  moneyArea: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",

    // backgroundColor: "green",
    width: "33%",
    // width:120
  },
  deleteBtn: {
    // position: "absolute",
    // right: 0,
    // top: -10,
  },
});

export default PlayerListItem;
