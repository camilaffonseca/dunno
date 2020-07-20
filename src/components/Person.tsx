import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';
import Spinner from './layout/Spinner';
import personReducer from '../store/person/personReducer';
import { useFetchPerson } from '../store/person/personActions';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';

interface Props {
  match: {
    params: {
      personId: number;
    };
  };
}

const Person: React.FC<Props> = ({ match }) => {
  const { personId } = match.params;
  const initialState = {
    personId,
    person: {
      name: '',
      profile_path: '',
      biography: '',
    },
    titles: [],
    loading: false,
  };

  const [data, dataDispatch] = useReducer(personReducer, initialState);

  useFetchPerson(data, dataDispatch);

  const {
    person: { name, profile_path, biography },
    titles,
    loading,
  } = data;

  return (
    <>
      {!loading && name ? (
        <>
          <img
            style={{ width: '300px' }}
            src={`${IMAGE_BASE_URL}${POSTER_SIZE}${profile_path}`}
            alt={name}
          />
          <h1>{name}</h1>
          <p>{biography}</p>

          {titles.map((title) => (
            <Link to={`/${title.media_type}/${title.id}`} key={title.id}>
              <p>{title.name || title.title}</p>
            </Link>
          ))}
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Person;
