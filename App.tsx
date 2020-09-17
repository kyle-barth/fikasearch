import React, { Dispatch, SetStateAction, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Movie } from "./services/models/MoviesModel";
import { MovieService } from "./services/MovieService";

export default function App() {
  const [movieList, setMovieListState]: [
    Movie[],
    Dispatch<SetStateAction<Movie[]>>
  ] = React.useState([]);

  const fetchMovieData = () =>
    MovieService().getMovieList.then((res: Movie[]) => {
      setMovieListState(res);
    });

  useEffect(() => {
    fetchMovieData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>
        <h1>FikaSearch!</h1>
        {movieList.map((movie: Movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.genres.toString()}</p>
            <p>{movie.overview}</p>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} height="200"/>
          </div>
        ))}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
