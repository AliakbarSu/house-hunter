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
}
