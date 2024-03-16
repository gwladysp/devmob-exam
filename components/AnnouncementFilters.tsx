import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { Modal, IconButton, Button, Portal } from "react-native-paper";
import { useDispatch } from "react-redux";
import {
  setYearFilter,
  setPriceFilter,
  setCityFilter,
  setCountryFilter,
} from "../reducers/filterReducer";
import { useSelector } from "react-redux";

import MyButton from "./Atoms/MyButton";

type AnnouncementSearchProps = {};

const countFilters = (filters: any) => {
  const { searchQuery, ...restFilters } = filters;
  return Object.values(restFilters).filter((filter: any) => filter).length;
};

function AnnouncementSearch({}: AnnouncementSearchProps): React.ReactElement {
  const [visible, setVisible] = React.useState(false);
  const filters = useSelector((state: any) => state.filters);
  const [year, setYear] = useState(filters.year?.toString() || "");
  const [minPrice, setMinPrice] = useState(filters.minPrice?.toString() || "");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice?.toString() || "");
  const [city, setCity] = useState(filters.city);
  const [country, setCountry] = useState(filters.country);
  const [getCountFilters, setCountFilters] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    setCountFilters(countFilters(filters));
  }, [filters]);

  const handleSave = () => {
    dispatch(setYearFilter(year ? parseInt(year, 10) : undefined));
    dispatch(
      setPriceFilter({
        minPrice: minPrice ? parseInt(minPrice, 10) : undefined,
        maxPrice: maxPrice ? parseInt(maxPrice, 10) : undefined,
      })
    );
    dispatch(setCityFilter(city || undefined));
    dispatch(setCountryFilter(country || undefined));
  };

  const handleReset = () => {
    setYear("");
    setMinPrice("");
    setMaxPrice("");
    setCity("");
    setCountry("");
    dispatch(setYearFilter(undefined));
    dispatch(setPriceFilter({}));
    dispatch(setCityFilter(undefined));
    dispatch(setCountryFilter(undefined));
    setCountFilters(0);
    hideModal();
  };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };
  const handleSaveFilters = () => {
    handleSave();
    hideModal();
  };

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <View style={styles.container}>
            <Text style={{ fontSize: 20, fontWeight: "800", marginBottom: 18 }}>
              Rechercher une annonce
            </Text>
            <Text>Année :</Text>
            <TextInput
              mode="outlined"
              style={styles.input}
              keyboardType="numeric"
              value={year}
              onChangeText={setYear}
              placeholder="Entrez une année"
            />
            <Text>Prix minimal :</Text>
            <TextInput
              mode="outlined"
              style={styles.input}
              keyboardType="numeric"
              value={minPrice}
              onChangeText={setMinPrice}
              placeholder="Entrez un prix"
            />
            <Text>Prix maximal :</Text>
            <TextInput
              mode="outlined"
              style={styles.input}
              keyboardType="numeric"
              value={maxPrice}
              onChangeText={setMaxPrice}
              placeholder="Entrez un prix"
            />
            <Text>Pays :</Text>
            <TextInput
              mode="outlined"
              style={styles.input}
              value={country}
              onChangeText={setCountry}
              placeholder="Entrez un pays"
            />
            <Text>Ville :</Text>
            <TextInput
              mode="outlined"
              style={styles.input}
              value={city}
              onChangeText={setCity}
              placeholder="Entrez une ville"
            />
            <MyButton
              title={"Sauvegarder"}
              pressed={handleSaveFilters}
              color={"#43A047"}
              colorPress={"#2E7D32"}
            />
            <Button onPress={handleReset}>Réinitialiser</Button>
          </View>
        </Modal>
      </Portal>
      <View style={{ position: "relative" }}>
        <IconButton icon="filter" onPress={showModal} />
        {getCountFilters > 0 && (
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: "green",
              width: 15,
              height: 15,
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: "white",
              }}
            >
              {getCountFilters}
            </Text>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginVertical: 12,
  },
});

export default AnnouncementSearch;
