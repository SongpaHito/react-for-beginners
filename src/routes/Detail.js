import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getMovie = async () => {
      try {
        const json = await (
          await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setMovie(json.data.movie);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };
    getMovie();
  }, [id]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={movie.medium_cover_image} alt={movie.title} />
      <ul>
        {movie.genres.map((genre, index) => (
          <li key={index}>{genre}</li>
        ))}
      </ul>
      <p>{movie.genres.join(", ")}</p>
    </div>
  );
}

export default Detail;
