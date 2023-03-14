import { StyleSheet, Text, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { Appbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { ComponentNavigationProps, NewsData } from "../utils/Types";
import CardItem from "../components/CardItem";

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("@newsData");
    if (value !== null) {
      // value previously stored
      return JSON.parse(value);
    }
  } catch (e) {
    // error reading value
    alert("Something went wrong");
    return;
  }
};

const Saved = (props: ComponentNavigationProps) => {
  const focused = useIsFocused();
  const [savedNews, setSavedNews] = useState([]);
  useEffect(() => {
    getData()
      .then((data) => setSavedNews(data))
      .catch(() => alert("Error Occured"));
  }, [focused]);

  return (
    <ScrollView>
      <Appbar.Header>
        <Appbar.Content title="Saved"></Appbar.Content>
      </Appbar.Header>
      {savedNews &&
        savedNews.length > 0 &&
        savedNews.map((data: NewsData) => (
          <CardItem
            content={data.content}
            description={data.description}
            image_url={data.image_url}
            navigation={props.navigation}
            title={data.title}
            key={data.title}
          />
        ))}
    </ScrollView>
  );
};

export default Saved;

const styles = StyleSheet.create({});
