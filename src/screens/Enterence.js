import React,{useState} from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image,Linking } from "react-native";
import colors from "../Colors";
import Icon5 from "react-native-vector-icons/FontAwesome5";
import CountryFlag from "react-native-country-flag";
// import AsyncStorage from '@react-native-async-storage/async-storage';

const Enterence = ({ navigation }) => {
  // AsyncStorage.clear()
  const [lang, setLang] = useState("tr")

  const githubLink = "https://github.com/SgrAhmet"
  const linkedinLink = "https://www.linkedin.com/in/ahmet-aydos/"
  
  const openLink =(link)=>{
    Linking.openURL(link)
  }

  const changeLang =()=>{
    if(lang == "tr"){
      setLang("us")
    }else{
      setLang("tr")
    }
  }
  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.flagButton} onPress={changeLang}>

      <CountryFlag isoCode={lang} size={32} />

      </TouchableOpacity>
      
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


      <View style={styles.footer}>

        <TouchableOpacity onPress={()=>openLink(linkedinLink)}>
        <Icon5 name="linkedin" size={40} color={colors.brown} />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>openLink(githubLink)}>
        <Icon5 name="github" size={40} color={colors.brown} />
        </TouchableOpacity>

      </View>
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
  footer:{
    // backgroundColor:"red",
    width:"100%",
    height:"10%",
    position:"absolute",
    bottom:20,
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    gap:50
  },
  flagButton:{
    position:"absolute",
    top:"8%",
    right:"5%"
  }
});

export default Enterence;
