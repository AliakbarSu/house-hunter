import { Config } from 'ziggy-js';

export enum listingTypeEnum {
  rent = 'rent',
  sell = 'sell',
}

export enum ListingStatusEnums {
  wishlist = 'wishlist',
  viewed = 'viewed',
  viewing = 'viewing',
  applied = 'applied',
  offer_accepted = 'offer_accepted',
  offer_declined = 'offer_declined',
}

export enum RentFrequencyEnums {
  weekly = 'weekly',
  forthnightly = 'forthnightly',
  monthly = 'monthly',
}

export interface Note {
  id: string;
  listing_id: string;
  note: string;
  created_at: string;
  updated_at: string;
}

export interface Board {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Image {
  id: string;
  listing_id: string;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface Listing {
  id: string;
  address: string;
  title: string;
  description: string;
  type: listingTypeEnum;
  property_type: string;
  rent: number;
  rent_frequency: string;
  bedrooms: number;
  bathrooms: number;
  toilets: number;
  garages: number;
  status: ListingStatusEnums;
  board_id: string;
  notes: Note[];
  board: Board;
  images: Image[];
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  boards: Board[];
  listings: Listing[];
  created_at: string;
  updated_at: string;
  email_verified_at: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  price_id: string;
  currency: string;
  images: string[];
  features: { name: string }[];
  metadata: { [key: string]: string };
  created_at: string;
  updated_at: string;
}

export interface Profile {
  name: string;
  email: string;
  phone: string;
  mobile: string;
  addresses: {
    address_type: string;
    address: string;
    move_in_at: string;
    move_out_at: string;
  }[];
  references: {
    name: string;
    relationship: string;
    phone: string;
    mobile: string;
  }[];
}

export interface CoverLetter {
  id: string;
  filename: string;
  url: string;
  content: string;
  listing_id: string;
  created_at: string;
  updated_at: string;
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user: User;
  };
  isAuthenticated: boolean;
  listings: Listing[];
  hasSubscription: boolean;
  can: {
    addListing: boolean;
  };
  ziggy: Config & { location: string };
};
