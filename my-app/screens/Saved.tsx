import { FlatList, StyleSheet, Text, View } from "react-native";
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

const storeData = async (value: string) => {
  const data: NewsData[] = await getData() || []
  const filtered = data.filter((news) => news.title !== value)
  try {
      const jsonValue = JSON.stringify(filtered);
      await AsyncStorage.setItem("@newsData", jsonValue);
  } catch (e) {
      return alert('Something went wrong with storing')
  }
};

const Saved = (props: ComponentNavigationProps) => {
  const focused = useIsFocused();
  const [savedNews, setSavedNews] = useState<NewsData[]>([]);
  const deleteHandler = async (val: string) => {
    await storeData(val)
  }
  useEffect(() => {
    getData()
    .then((data) => setSavedNews(data))
    .catch(() => alert("Error Occured"));
  }, [focused, deleteHandler]);


  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Saved"></Appbar.Content>
      </Appbar.Header>
      <FlatList
      // keyExtractor={(item) => item.} 
        style={styles.flatList}
        data={savedNews}
        renderItem={({ item }) => (
          <CardItem
            handleDelete={deleteHandler}
            navigation={props.navigation}
            description={item.description}
            image_url={item.image_url }
            title={item.title}
            content={item.content}
          />
        )}
      />
      {/* {savedNews &&
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
        ))} */}
    </View>
  );
};

export default Saved;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flatList: {
    display: 'flex',
    flex: 1,
    height: 'auto'
  }
});
