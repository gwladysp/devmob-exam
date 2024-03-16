import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/RootStack";
import Announcement from "../models/Announcement";
import { useEffect, useState } from "react";
import { getAnnouncementById } from "../services/AnnouncementService";
import { View, Text, StyleSheet, Image } from "react-native";
import MyButton from "../components/Atoms/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { GlobalStoreProps } from "../store/globalStore";
import { addFavori, removeFavori } from "../reducers/favoriReducer";
import DisplayError from "../components/DisplayError";
import { Avatar } from "react-native-paper";
import { ActivityIndicator } from "react-native";

type AnnouncementScreenParams = {};

type AnnouncementScreenProps = AnnouncementScreenParams &
  StackScreenProps<RootStackParamList, "Announcement">;

type AnnouncementScreenSectionProps = {
  sectionTitle: string;
  children?: React.ReactNode;
};

const AnnouncementScreenSection = ({
  sectionTitle,
  children,
}: AnnouncementScreenSectionProps) => {
  return (
    <View>
      <Text style={{ fontWeight: "700", fontSize: 16 }}>{sectionTitle} : </Text>
      <View style={{ marginTop: 12 }}>{children}</View>
    </View>
  );
};

function AnnouncementScreen({ navigation, route }: AnnouncementScreenProps) {
  const favoris = useSelector<GlobalStoreProps, Array<Announcement>>(
    (state) => state.favori
  );
  const [Announcement, setAnnouncement] = useState<Announcement>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [onError, setOnError] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getAnnouncement(): Promise<void> {
      try {
        const Announcement = await getAnnouncementById(
          route.params.AnnouncementId
        );
        if (Announcement == null) {
          throw new Error("404 not found");
        }
        setAnnouncement(Announcement);
      } catch (e) {
        setOnError(true);
      }
      setIsLoading(false);
    }
    void getAnnouncement();
  }, []);

  const redirectToFavoris = () => {
    navigation.navigate("Favoris");
  };

  if (isLoading) {
    return <ActivityIndicator animating={true} />;
  }

  if (Announcement == null || onError) {
    return (
      <DisplayError message={"Erreur dans le chargment du film"}></DisplayError>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.rowOne}>
        <Text style={{ fontSize: 24, fontWeight: "600" }}>
          {Announcement?.carMake} {Announcement?.carModel}
        </Text>
      </View>
      <View style={{ gap: 20 }}>
        <AnnouncementScreenSection sectionTitle="Information">
          <View style={{ gap: 14 }}>
            <Text style={{ fontSize: 12 }}> Prix : {Announcement.price}</Text>
            <Text style={{ fontSize: 12 }}>
              Année de fabrication : {Announcement.carModelYear}
            </Text>
          </View>
        </AnnouncementScreenSection>
        <AnnouncementScreenSection sectionTitle="Vendeur">
          <View style={{ flexDirection: "row", gap: 14, alignItems: "center" }}>
            <View
              style={{
                borderColor: "green",
                borderWidth: 3,
                borderRadius: 25,
                backgroundColor: "white",
                overflow: "hidden",
                height: 50,
                width: 50,
              }}
            >
              <Avatar.Image
                source={{ uri: Announcement.avatar }}
                size={50}
                style={{
                  backgroundColor: "transparent",
                }}
              />
            </View>

            <View>
              <Text>{Announcement.saler}</Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 12,
                }}
              >
                <Text style={{ fontSize: 10 }}>
                  Pays : {Announcement.country}
                </Text>
                <Text style={{ fontSize: 10 }}>
                  Ville : {Announcement.city}
                </Text>
                <Text style={{ fontSize: 10 }}>Tel. {Announcement.phone}</Text>
              </View>
            </View>
          </View>
        </AnnouncementScreenSection>
        <AnnouncementScreenSection sectionTitle="Description">
          <Text style={{ fontSize: 12 }}>{Announcement.description}</Text>
        </AnnouncementScreenSection>
      </View>
      <View style={styles.rowThree}>
        {favoris.find((m) => m.id === Announcement?.id) == null ? (
          <MyButton
            title={"Ajouter au favoris"}
            pressed={() => {
              dispatch(addFavori(Announcement));
              redirectToFavoris();
            }}
            color={"#43A047"}
            colorPress={"#2E7D32"}
          />
        ) : (
          <MyButton
            title={"Supprimer des favoris"}
            pressed={() => {
              dispatch(removeFavori(Announcement));
              redirectToFavoris();
            }}
            color={"#43A047"}
            colorPress={"#2E7D32"}
          />
        )}
      </View>
    </View>
  );
}

export default AnnouncementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowOne: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  rowThree: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
