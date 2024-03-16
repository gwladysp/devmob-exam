import { ReactNode, useEffect, useState } from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import ListItemAnnouncement from "./ListItemAnnouncement";
import Announcement from "../models/Announcement";
import DisplayError from "./DisplayError";
import { getAnnouncements } from "../services/AnnouncementService";
import { Searchbar } from "react-native-paper";
import AnnouncementFilters from "./AnnouncementFilters";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setSearchQuery as setReducerSearchQuery } from "../reducers/filterReducer";

interface ListOfAnnouncementProps {
  navigateAnnouncementDetails: (id: number) => void;
}

function ListOfAnnouncement({
  navigateAnnouncementDetails,
}: ListOfAnnouncementProps): ReactNode {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [Announcements, setAnnouncements] = useState<Array<Announcement>>([]);
  const filters = useSelector((state: any) => state.filters);

  const [searchQuery, setSearchQuery] = useState(filters.searchQuery || "");

  async function fetchAnnouncement(): Promise<void> {
    try {
      const { year, minPrice, maxPrice, city, country } = filters;
      const Announcements = await getAnnouncements(
        searchQuery,
        year,
        minPrice,
        maxPrice,
        city,
        country
      );
      setAnnouncements(Announcements);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  }

  useEffect(() => {
    dispatch(setReducerSearchQuery(searchQuery));

    void fetchAnnouncement();
  }, [searchQuery, filters]);

  if (isLoading) return <Text>Chargement...</Text>;

  return (
    <View style={{ flex: 1 }}>
      {isError ? (
        <DisplayError message="Impossible de récupérer les annonces" />
      ) : (
        <View style={{ paddingHorizontal: 12, gap: 14 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Searchbar
              placeholder="Rechercher"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={{ flex: 1 }}
            />
            <AnnouncementFilters />
          </View>
          <Text style={{ fontSize: 10, fontStyle: "italic" }}>
            Nombre d'annonce : {Announcements.length}
          </Text>
          <FlatList
            data={Announcements}
            renderItem={({ item }) => (
              <ListItemAnnouncement
                Announcement={item}
                onClick={() => navigateAnnouncementDetails(item.id)}
              />
            )}
          />
        </View>
      )}
    </View>
  );
}

export default ListOfAnnouncement;
