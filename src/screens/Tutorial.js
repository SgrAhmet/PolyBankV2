import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../Colors";
import Icon from "react-native-vector-icons/FontAwesome";
import { t } from "../../locales/lang";

const Tutorial = () => {
  const [textIndex, setTextIndex] = useState(0);

  const handleTextIndex = (i) => {
    let prevTextIndex = textIndex;
    if (i) {
      if (textIndex == 4) {
        setTextIndex(0);
      } else {
        setTextIndex(prevTextIndex + 1);
      }
    } else {
      if (textIndex == 0) {
        setTextIndex(4);
      } else {
        setTextIndex(prevTextIndex - 1);
      }
    }
  };

  const tutorialTexts = [
    {
      title: t("tutorial_addPerson_title"),
      desc: t("tutorial_addPerson_desc"),
    },
    {
      title: t("tutorial_transferMoney_title"),
      desc: t("tutorial_transferMoney_desc"),
    },
    {
      title: t("tutorial_setBanknote_title"),
      desc: t("tutorial_setBanknote_desc"),
    },
    {
      title: t("tutorial_resetGame_title"),
      desc: t("tutorial_resetGame_desc"),
    },
    {
      title: t("tutorial_watchOnline_title"),
      desc: t("tutorial_watchOnline_desc"),
    },
  ];
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => handleTextIndex(false)}
      >
        <Icon name="chevron-left" size={40} color={colors.white} />
      </TouchableOpacity>
      <View style={styles.contentArea}>
        <Text style={styles.titleText}>{tutorialTexts[textIndex].title}</Text>
        <Text style={styles.contentText}>{tutorialTexts[textIndex].desc}</Text>
      </View>

      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => handleTextIndex(true)}
      >
        <Icon name="chevron-right" size={40} color={colors.white} />
      </TouchableOpacity>
         <Text style={styles.index}>{textIndex + 1}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGreen,
    alignItems: "center",
    justifyContent: "center",
    // gap: 20,
    flexDirection: "row",
  },
  contentArea: {
    // backgroundColor:"red",
    height: "80%",
    width: "70%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
  },
  arrowButton: {
    // backgroundColor:"green",
    padding: 10,
  },
  contentText: {
    color: colors.white,
    fontSize: 20,
    textAlign:"center"
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 24,
    color: colors.brown,
  },
  index:{
    fontSize:30,
    fontWeight:"bold",
    color : colors.brown,
    position:"absolute",
    bottom:50
  }
});

export default Tutorial;
