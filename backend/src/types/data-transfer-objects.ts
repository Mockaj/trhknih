
export default interface SeedFileStructure {
  tags: TagDTO[];
  publishers: PublisherDTO[];
  books: BookDTO[];
  authors: AuthorDTO[];
  bookAuthors: BookAuthorDTO[];
  users: UserDTO[];
  offers: OfferDTO[];
  addresses: AddressDTO[];
  orders: OrderDTO[];
  reviews: ReviewDTO[]
}

export interface TagDTO {
  id: string;
  name: string
}

export interface PublisherDTO {
  id: string;
  name: string
}

export interface BookDTO {
  id: string;
  isbn: string;
  title: string;
  subtitle?: string;
  numberOfPages: number;
  publishedDate: string;
  notes?: string;
  photo: string;
  publisherId: string
}

export interface AuthorDTO {
  id: string;
  name: string
}

export interface BookAuthorDTO {
  bookId: string;
  authorId: string
}

export interface UserDTO {
  id: string;
  username: string;
  password: string;
  email: string;
  name: string;
}

export interface OfferDTO {
  id: string;
  price: number;
  bookCondition: string;
  photo?: string;
  createTime: string
  sellerId: string;
  bookId: string;
  tags: {
    tagId: string;
  }[]
}

export interface OrderDTO {
  offerId: string;
  customerId: string;
  phoneNumber: string;
  createTime: string;
  finished: boolean;
  addressId: string;
}

export interface AddressDTO {
  id: string;
  street: string;
  houseNumber: string;
  city: string;
  postalCode: string
}

export interface ReviewDTO {
  sellerId: string
  reviewerId: string
  text: string
  points: number
  createTime: string
}
