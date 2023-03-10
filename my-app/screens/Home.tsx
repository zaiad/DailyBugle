// @ts-nocheck

import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Appbar, Chip, Button, useTheme } from "react-native-paper";
import { ComponentNavigationProps, NewsData } from "../utils/Types";
import CardItem from "../components/CardItem";

const categories = ["Technology", "Sports", "Politics", "Health", "Business"];
const API_KEY = "pub_18477212e751dc38cb21c5c2176e532c458f3";

const Home = (props:ComponentNavigationProps) => {
  const [newsData, setNewsData] = useState<NewsData[]>([]);
  const theme = useTheme();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const handleSelect = (val: string) => {
    setSelectedCategories((prev: string[]) =>
      prev.find((p) => p === val)
        ? prev.filter((cat) => cat !== val)
        : [...prev, val]
    );
  };
  const handlePress = async () => {
    const URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=ca,fr,de,ma,kp&language=en${
      selectedCategories.length > 0 && `&category=${selectedCategories.join()}`
    }${nextPage.length > 0 ? `&page${nextPage}` : ""}`;
    // console.log(URL);
    try {
      await fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          // setNewsData((prev) => [...prev, ...data.results]);
          setNewsData(data.results)
          setNextPage(data.nextPage)
        });
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(newsData.length > 0 ? Object.keys(newsData[0]) : []);
  // console.log(Object.keys(newsData[0]));

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Home"></Appbar.Content>
      </Appbar.Header>
      <View style={styles.filtersContainer}>
        {categories.map((cat) => (
          <Chip
            key={cat}
            mode="outlined"
            style={styles.chipItem}
            textStyle={{ fontWeight: "400", color: "white", padding: 1 }}
            showSelectedOverlay
            selected={selectedCategories.find((c) => cat === c) ? true : false}
            onPress={() => handleSelect(cat)}
          >
            {cat}
          </Chip>
        ))}
        <Button
          mode="outlined"
          style={styles.button}
          labelStyle={{
            fontSize: 14,
            margin: "auto",
            // color: theme.colors.primary,
          }}
          icon={"sync"}
          onPress={handlePress}
        >
          Refresh
        </Button>
      </View>
      <FlatList
      onEndReached={() => handlePress()}
        style={styles.flatList}
        data={newsData}
        renderItem={({ item }) => (
          <CardItem
            navigation={props.navigation}
            description={item.description}
            image_url={item.image_url}
            title={item.title}
            content={item.content}
            // category={item.category}
            // country={item.country}
            // creator={item.creator}
            // keywords={item.keywords}
            // language={item.language}
            // link={item.link}
            // pubDate={item.pubDate}
            // source_id={item.source_id}
            // video_url={item.video_url}
          />
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filtersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  chipItem: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
  button: {
    maxWidth: 400,
    padding: 0,
    maxHeight: 40,
  },
  flatList: {
    height: "auto",
  },
});
