import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Daily_News from "../assets/dailynews.png";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <Image source={Daily_News} style={styles.image} />
      <View style={styles.wrapperSlogan}>
        <Text style={styles.txtSlogan}>Daily News</Text>
        <Text style={styles.txtSlogan}>Enjoy the latest news</Text>
      </View>
      {/* <Gap height={90} /> */}
      <Button
        style={styles.container}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        Start
      </Button>
      {/* <Button onPress={()=> navigation.navigate('register') } text="Get Started" /> */}
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  image: {
    height: 225,
    width: "100%",
    resizeMode: "stretch",
  },
  wrapperSlogan: {
    marginTop: 51,
  },
  txtSlogan: {
    fontSize: 30,
    // color: colors.primary,
    textAlign: "center",
    // fontFamily: fonts.Bold
  },
  container: {
    backgroundColor: "black",
    color: "white",
    height: 50,
    width: 259,
    borderRadius: 20,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 90,
  },
});
