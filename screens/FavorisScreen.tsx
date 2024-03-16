import { useSelector } from "react-redux";
import { GlobalStoreProps } from "../store/globalStore";
import Announcement from "../models/Announcement";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ListItemAnnouncement from "../components/ListItemAnnouncement";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/RootStack";
import { IconButton } from "react-native-paper";
import { removeFavori } from "../reducers/favoriReducer";
import { useDispatch } from "react-redux";

type Props = StackScreenProps<RootStackParamList>;

function FavorisScreen({ navigation }: Props) {
  const dispatch = useDispatch();

  const favoris = useSelector<GlobalStoreProps, Array<Announcement>>(
    (state) => state.favori
  );

  const navigateFilmDetails = (id: number) => {
    navigation.navigate("Announcement", { AnnouncementId: id });
  };

  if (favoris.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Aucun favori ajouté !</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={favoris}
        renderItem={({ item }) => (
          <View style={{ position: "relative", marginTop: 10 }}>
            <ListItemAnnouncement
              Announcement={item}
              onClick={() => navigateFilmDetails(item.id)}
            />
            <IconButton
              icon="close"
              iconColor="red"
              containerColor="pink"
              size={10}
              onPress={() => dispatch(removeFavori(item))}
              style={{ position: "absolute", right: 0, top: 0 }}
            />
          </View>
        )}
      />
    </View>
  );
}

export default FavorisScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
