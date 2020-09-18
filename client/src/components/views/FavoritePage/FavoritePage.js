import React, { useEffect, useState } from 'react';
import axios from 'axios';
// styling
import './FavoritePage.css';
import { Popover } from 'antd';
import { IMAGE_BASE_URL } from '../../Config';

function FavoritePage() {
  const variable = { userFrom: localStorage.getItem('userId') };

  const [FavoritedMovies, setFavoritedMovies] = useState([]);

  useEffect(() => {
    fetchFavoriteMovies();
  }, []);

  const fetchFavoriteMovies = () => {
    axios.post('/api/favorite/getFavoriteMovie', variable)
      .then((response) => {
        if (response.data.success) {
          setFavoritedMovies(response.data.favorites);
        } else {
          alert('Failed to get favorited movies');
        }
      });
  }

  const onClickRemove = (movieId) => {
    const variable = {
      movieId: movieId,
      userFrom: localStorage.getItem('userId')
    }

    axios.post('./api/favorite/removeFromFavorite', variable)
        .then((response) => {
          if (response.data.success) {
            fetchFavoriteMovies();
          } else {
            alert('Failed to remove from favorites');
          }
        });
  }

  const renderTableBody = FavoritedMovies.map((movie, index) => {
    const content = (
      <div>
        {movie.moviePost ? 
          <img src={`${IMAGE_BASE_URL}w500${movie.moviePost}`} alt="moviePost" /> : "No Image"
        }
      </div>
    )

    return <tr>
      <Popover content={<img />} title={`${movie.movieTitle}`}>
        <td>{movie.movieTitle}</td>
      </Popover>
      <td>{movie.movieRunTime}mins</td>
      <td><button onClick={() => onClickRemove(movie.movieId)}>Remove From Favorites</button></td>
    </tr>
  });

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h3>Favorite Movies</h3>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie Runtime</th>
            <th>Remove from favorites</th>
          </tr>
        </thead>
        <tbody>
          {renderTableBody}
        </tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
