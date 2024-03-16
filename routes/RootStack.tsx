import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../screens/SearchScreen";
import FavorisScreen from "../screens/FavorisScreen";
import AnnouncementScreen from "../screens/AnnouncementScreen";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/elements";

export type RootStackParamList = {
  Search: undefined;
  Announcement: { AnnouncementId: number };
  Favoris: undefined;
};

const SearchNavigation = createStackNavigator<RootStackParamList>();

function RootStack() {
  const navigation = useNavigation();
  return (
    <SearchNavigation.Navigator
      initialRouteName="Search"
      screenOptions={{ cardStyle: { backgroundColor: "#fff" } }}
    >
      <SearchNavigation.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: "Liste des annonces" }}
      />
      <SearchNavigation.Screen
        name="Announcement"
        component={AnnouncementScreen}
        options={{
          title: "Annonce",
        }}
      />
      <SearchNavigation.Screen
        name="Favoris"
        component={FavorisScreen}
        options={{
          title: "Mes Favoris",
          headerLeft: () => (
            <HeaderBackButton
              label="Back"
              onPress={() => {
                navigation.navigate("Search" as never);
              }}
            />
          ),
        }}
      />
    </SearchNavigation.Navigator>
  );
}

export default RootStack;
