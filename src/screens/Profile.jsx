// import modules
import React from "react";
import { View, StyleSheet } from "react-native";
import { useQueryClient } from "react-query";
import { Avatar, Button, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import functional
import { baseURL } from "../Api";

const Profile = () => {
  const cache = useQueryClient();
  const data = cache.getQueryData("user");
  console.log(data);
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    cache.invalidateQueries("user");
  };
  return (
    <View style={styles.container}>
      {data && (
        <View style={{ alignItems: "center" }}>
          <Avatar.Image
            source={{ uri: `${baseURL}${data.profile.avatar}` }}
            size={80}
          />
          <Text style={{ marginTop: 10, color: "gray" }}>{data.fullName}</Text>
        </View>
      )}
      <Button
        style={{ marginTop: 50, alignItems: "flex-start" }}
        mode="outlined"
      >
        Edit Profile
      </Button>
      <Button
        style={{ marginTop: 10, alignItems: "flex-start" }}
        onPress={handleLogout}
        mode="outlined"
      >
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 10,
  },
});

export default Profile;
