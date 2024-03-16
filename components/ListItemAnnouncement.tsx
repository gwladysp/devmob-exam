import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import Announcement from "../models/Announcement";
import Colors from "../constants/Colors";

type ListItemAnnouncementParams = {
  Announcement: Announcement;
  onClick: () => void;
};

const ListItemAnnouncement = ({
  Announcement,
  onClick,
}: ListItemAnnouncementParams) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.informationContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {Announcement.carMake} {Announcement.carModel}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 12, fontStyle: "italic" }}>
            {Announcement.carModelYear} - {Announcement.price}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 12 }}>{Announcement.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItemAnnouncement;

const styles = StyleSheet.create({
  informationContainer: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: "row",
  },
  statsContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  statContainer: {
    flexDirection: "row",
    marginRight: 8,
  },
  noThumbnailContainer: {
    width: 128,
    height: 128,
    alignItems: "center",
    justifyContent: "center",
  },
  thumbnail: {
    width: 128,
    height: 128,
    borderRadius: 12,
    backgroundColor: Colors.mainGreen,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  data: {
    fontSize: 16,
  },
  icon: {
    tintColor: Colors.mainGreen,
  },
  stat: {
    marginLeft: 4,
  },
});
