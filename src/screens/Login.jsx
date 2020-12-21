// import modules
import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { TextInput, Title, Button, Text } from "react-native-paper";
import { useMutation, useQueryClient  } from "react-query";
// import functional
import {loginApi} from "../Api";

const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const query = useQueryClient();
  const loginMutation = useMutation(loginApi,{
      onSettled : (data, err) => {
        if (data) {
            query.invalidateQueries("user");
          }
      },
  });
  const handleLogin = () => {
      const body = {email , password}
      loginMutation.mutate(body);
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <Title style={styles.title}>Login</Title>
        <TextInput
          style={styles.input}
          label="Email"
          mode="outlined"
          onChangeText={(value) => setEmail(value)}
          value={email}
        />
        <TextInput
          style={styles.input}
          label="Password"
          mode="outlined"
          onChangeText={(value) => setPassword(value)}
          value={password}
          secureTextEntry={true}
        />
        <Button
          mode="contained"
          style={styles.button}
          onPress={handleLogin}
        >
          Login
        </Button>
        <Text style={styles.text}>
          Not have an account ?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Register")}
          >
            Join here !
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  containerInput: {
    width: "100%",
  },
  input: {
    borderColor: "red",
    marginVertical: 5,
  },
  button: {
    marginTop: 10,
  },
  text: {
    textAlign: "center",
    marginTop: 10,
  },
  link: {
    fontWeight: "800",
    color: "blue",
  },
  title: {
    marginBottom: 20,
  },
});

export default Login;
