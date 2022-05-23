export interface Book {
  authors: {
    url: string,
    name: string,
  }[],
  cover: {
    large: string,
    medium: string,
    small: string,
  },
  ebooks: {
    availability: string,
    formats: any,
    preview_url: string,
  }[],
  identifiers: any,
  key: string,
  notes: string,
  number_of_pages: number,
  published_date: string,
  publish_places: {
    name: string,
  }[],
  publishers: {
    name: string,
  }[],
  subjects: {
    name: string,
    url: string,
  }[],
  subtitle: string,
  title: string,
  url: string,
}