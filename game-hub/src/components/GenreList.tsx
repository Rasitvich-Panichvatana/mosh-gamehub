interface Props {
  genres: string[];
}

const GenreList = ({ genres }: Props) => {
  return (
    <ul>
      {genres.map((genre) => (
        <li key={genre}>{genre}</li>
      ))}
    </ul>
  );
};

export default GenreList;

/* 

  */
