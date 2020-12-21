// import modules
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { IconButton, Text } from "react-native-paper";
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
import { LogBox } from "react-native";
// import screens
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";
// import functional
import { reloadApi } from "./src/Api";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function App() {
  const { isSuccess: login, data, isFetching: loading } = useQuery(
    "user",
    reloadApi,
    { refetchOnWindowFocus: false }
  );
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          {login && data && data !== undefined ? (
            <Stack.Screen name="Home" component={HomeStack} />
          ) : loading ? (
            <Stack.Screen name="Home" component={HomeStack} />
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const HomeStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: "#694fad", paddingBottom: 10 }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <IconButton
                icon="home"
                size={26}
                color={color}
                style={{ paddingBottom: 20 }}
              ></IconButton>
            );
          },
        }}
      />
      <Tab.Screen
        name="Upload"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <IconButton
                icon="camera"
                size={26}
                color={color}
                style={{ paddingBottom: 20 }}
              ></IconButton>
            );
          },
        }}
      />
      <Tab.Screen
        name="My Order"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <IconButton
                icon="cart-outline"
                size={26}
                color={color}
                style={{ paddingBottom: 20 }}
              ></IconButton>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <IconButton
                icon="account-circle-outline"
                size={26}
                color={color}
                style={{ paddingBottom: 20 }}
              ></IconButton>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const queryClient = new QueryClient();

export default function Main() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </>
  );
}

// remove warning timeout this not danger because we use react query who have timeout
LogBox.ignoreLogs(["Setting a timer"]);
