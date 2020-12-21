// import modules
import React from "react";
import { View, SafeAreaView, FlatList, StyleSheet, Image } from "react-native";
import {
  Searchbar,
  IconButton,
  Text,
  Dialog,
  Portal,
  Button,
  RadioButton,
} from "react-native-paper";
import { useQuery } from "react-query";
import MasonryList from "react-native-masonry-list";
// import functional
import { getPosts } from "../Api";

const Home = () => {
  const { data } = useQuery("posts", getPosts);
  const renderItem = ({ item }) => {
    console.log(item);
    return <Image source={{ uri: item.uri }} style={{width : "100%" , height : 90}} />;
  };
  return (
    <View>
      <Header />
      {data && (
        <MasonryList images={data} columns={2} />
      )}
    </View>
  );
};


{/* <SafeAreaView>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </SafeAreaView> */}



const Header = () => {
  const [visible, setVisible] = React.useState(false);
  const [checked, setChecked] = React.useState("Latest");
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  return (
    <>
      <View style={styles.container}>
        <Searchbar />
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <Text style={{ color: "gray", alignSelf: "center", paddingLeft: 10 }}>
            {checked}
          </Text>
          <IconButton icon="sort" color="gray" onPress={showDialog} />
        </View>
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Filter Post</Dialog.Title>
          <Dialog.Content>
            <View style={{ flexDirection: "row" }}>
              <RadioButton
                value="Today"
                status={checked === "Today" ? "checked" : "unchecked"}
                onPress={() => setChecked("Today")}
              />
              <Text style={{ alignSelf: "center", color: "gray" }}>Today</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <RadioButton
                value="Latest"
                status={checked === "Latest" ? "checked" : "unchecked"}
                onPress={() => setChecked("Latest")}
              />
              <Text style={{ alignSelf: "center", color: "gray" }}>Latest</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <RadioButton
                value="All"
                status={checked === "All" ? "checked" : "unchecked"}
                onPress={() => setChecked("All")}
              />
              <Text style={{ alignSelf: "center", color: "gray" }}>All</Text>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    paddingHorizontal: 5,
  },
});

export default Home;
