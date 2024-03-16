import Announcement from "../models/Announcement";

export async function getAnnouncements(
  searchQuery: string,
  yearFilter?: number,
  minPriceFilter?: number,
  maxPriceFilter?: number,
  cityFilter?: string,
  countryFilter?: string
): Promise<Array<Announcement>> {
  try {
    const res: Array<Announcement> = [];

    let response = require("../helpers/data.json");

    if (searchQuery) {
      response = response.filter((value: any) => {
        const carString =
          value.carMake.toLowerCase() + " " + value.carModel.toLowerCase();
        return carString.includes(searchQuery.toLowerCase());
      });
    }

    if (yearFilter) {
      response = response.filter(
        (value: any) => value.carModelYear === yearFilter
      );
    }
    if (minPriceFilter !== undefined) {
      response = response.filter((value: any) => {
        const price = parseInt(value.price.replace("€", ""), 10);
        return price >= minPriceFilter;
      });
    }

    if (maxPriceFilter !== undefined) {
      response = response.filter((value: any) => {
        const price = parseInt(value.price.replace("€", ""), 10);
        return price <= maxPriceFilter;
      });
    }

    if (cityFilter) {
      response = response.filter((value: any) =>
        value.city.toLowerCase().includes(cityFilter.toLowerCase())
      );
    }

    if (countryFilter) {
      response = response.filter((value: any) =>
        value.country.toLowerCase().includes(countryFilter.toLowerCase())
      );
    }

    response.map((value: any) => {
      res.push({
        id: value.id,
        carMake: value.carMake,
        carModel: value.carModel,
        carModelYear: value.carModelYear,
        price: value.price,
        avatar: value.avatar,
        saler: value.saler,
        phone: value.phone,
        country: value.country,
        city: value.city,
        description: value.description,
      });
    });
    return res;
  } catch (error: any) {
    console.log(`Error while trying to get announcements : ${error.message}`);
    throw error;
  }
}

export async function getAnnouncementById(
  id: number
): Promise<Announcement | undefined> {
  try {
    const list: Array<Announcement> = [];

    const response = require("../helpers/data.json");

    response.map((value: any) => {
      list.push({
        id: value.id,
        carMake: value.carMake,
        carModel: value.carModel,
        carModelYear: value.carModelYear,
        price: value.price,
        avatar: value.avatar,
        saler: value.saler,
        phone: value.phone,
        country: value.country,
        city: value.city,
        description: value.description,
      });
    });
    return list.find((m) => m.id === id);
  } catch (error: any) {
    console.log(`Error while trying to get announcement : ${error.message}`);
    throw error;
  }
}
