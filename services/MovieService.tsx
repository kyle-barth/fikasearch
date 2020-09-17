import { GenresAPIResponse, Genre } from "./models/GenresModel";
import { Movie, MovieResponse, MoviesAPIResponse } from "./models/MoviesModel";

export const MovieService = () => ({
  getMovieList: getMovieList(),
});

const getMovieList: () => Promise<Movie[]> = () => {
  return Promise.all(
    [getMovies(), getMovieGenre()].map((res) =>
      res.then((response) => response.json())
    )
  ).then((res: [MoviesAPIResponse, GenresAPIResponse]) => {
    const moviesRes: MovieResponse[] = res[0].results;
    const genres: Genre[] = res[1].genres;    

    return moviesRes.map<Movie>((movie: MovieResponse) => ({
      id: movie.id,
      genres: movie.genre_ids.map(
        (genre_id) =>
          genres.filter((genre: Genre) => genre.id == genre_id)[0]?.name
      ),
      title: movie.title,
      overview: movie.overview,
      poster_path: movie.poster_path,
    }));
  });
};

const getMovies: () => Promise<Response> = () =>
  fetch(
    // What would be nicer: `${process.env.API_URL}/movie/now_playing?api_key=${process.env.API_KEY}&language=en-US&page=1`
    `https://api.themoviedb.org/3/movie/now_playing?api_key=d432b933ecc6d5642d8d2befbc40c7ac&language=en-US&page=1`
  );

const getMovieGenre: () => Promise<Response> = () =>
  fetch(
    // What would be nicer: `${process.env.API_URL}/genre/movie/list?api_key=${process.env.API_KEY}&language=en-US`
    `https://api.themoviedb.org/3/genre/movie/list?api_key=d432b933ecc6d5642d8d2befbc40c7ac&language=en-US`
  );
