// This file contains type definitions

export type CountriesListType = {
    name: string;
    continent: string;
  };

export type CountryDetailsType = {
    // Header
    name: {
        common: string;
    };
    maps: {
        googleMaps: string;
    };
    flags: {
        svg: string;
        png: string;
    };
    capital: string[];
    languages: { [key: string]: string };


    // Upper section
    region: string;
    currencies: {
        [key: string]: {
            name: string;
            symbol: string;
        };
    };
    unMember: boolean; // UN Member? true/false
    population: number;
    idd: { // Dial code
        root: string | null;
        suffixes?: string[]; // suffixes is optional
    } | null;
    area: number; // Total Area in km^2

    // Lower section
    cca2: string; // ISO Country Code (BE)
    fifa: string; // FIFA Code (BEL)
    tld: string[]; // Top Level Domain (TLD)
    timezones: string[]; // timezones[0]
    independent: boolean // independence status
    car: { // car side
        side: string;
    }
}

export interface TravelRecommendationsType {
    recommendations: {
      role: string;
      content: string;
    };
  }

export type test = {
    halo: string;
}