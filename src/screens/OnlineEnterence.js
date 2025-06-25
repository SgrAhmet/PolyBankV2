import React,{ useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import colors from '../Colors';



import {collection,getDocs,addDoc,deleteDoc,updateDoc,doc} from "firebase/firestore";
import { db } from "../../firestore"; // Firebase yapılandırma dosyanızın yolu



const OnlineEnterence = () => {
    const [test, setTest] = useState("Waiting...")

    const getDocument= async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "deneme"));
          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));  

          console.log("data is");
          console.log(data);
          setTest(data[0].test1)
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };



      getDocument()

  return (
    <View style={styles.container}>
      <Text>OnlineEnterence  -   {test} </Text>
      <TouchableOpacity onPress={() => navigation.navigate("OnlineEnterence")}><Text>Create Room</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Main")}><Text>Enter a Room</Text></TouchableOpacity>
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

export default OnlineEnterence;