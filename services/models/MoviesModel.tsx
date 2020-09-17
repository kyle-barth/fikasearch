export interface Movie {
  id: number;
  genres: string[];
  title: string;
  overview: string;
  poster_path: string;
}
export interface MovieResponse {
  id: number;
  genre_ids: number[];
  title: string;
  overview: string;
  poster_path: string;
}
export interface MoviesAPIResponse {
  results: MovieResponse[];
}
