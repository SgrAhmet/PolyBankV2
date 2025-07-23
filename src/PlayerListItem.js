import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import Icon5 from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/FontAwesome";
import IconIon from "react-native-vector-icons/Ionicons";
import colors from "./Colors";
import { t, setLanguage,currentLang } from "../locales/lang";

const PlayerListItem = ({ index, name, money, selecteds, setSelecteds,gamers,setGamers,isEditVisible,history,setHistory,spectator }) => {



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

  const deleteGamer =()=>{
    setHistory([{pozitif:name,negatif:"Banka",quantity:"deleteGamer"},...history,])
    setGamers(prev => prev.filter((_, i) => i !== index));
  }


  let styleDelete =[styles.deleteBtn,{display:"none"}]
  if(isEditVisible){
    styleDelete.pop()
  }

  
  if(index == 0 && name == "Banka"){
      name = t("bank") 
  }
  return (
    <View style={styles.container}>
      {/* <IconIon name="person" size={32} color={colors.white} /> */}

      {index == 0 && name == "Banka" ? (
        <Icon name="bank" size={32} color={colors.white} />
      ) : (
        <IconIon name="person" size={32} color={colors.white} />
      )}

      <Text style={styles.h3Text}>{name}</Text>
      <Text style={styles.h3Text}>{money} ₩</Text>
      <View style={styles.btnsArea}>
        <TouchableOpacity style={[stylePozitive,{display: spectator && "none"}]} onPress={changePozitive}>
          <Icon5 name="plus" size={32} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={[styleNegative,{display: spectator && "none"}]} onPress={changeNegative}>
          <Icon5 name="minus" size={32} color={colors.white} />
        </TouchableOpacity>

        
      </View>
      <TouchableOpacity style={name != "Banka" ? styleDelete : {display : "none"}} onPress={deleteGamer}>
          <Icon5 name="ban" size={32} color={colors.lightRed} />
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
    justifyContent: "space-around",
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
  },
  h3Text: {
    fontSize: 20,
    fontWeight: 400,
    fontFamily:"monospace"
  },
  btnsArea: {
    width: "30%",
    height: "80%",
    // backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  btnArea: {
    backgroundColor: colors.darkGreen,
    padding: 10,
    paddingHorizontal: 12,
    borderColor: colors.black,
    borderWidth: 2,
    borderRadius: 10,
  },
  deleteBtn:{
    position:"absolute",
    left:-3,
    top:-10
  }
});

export default PlayerListItem;