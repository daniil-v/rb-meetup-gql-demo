import {
  useQuery,
  gql
} from "@apollo/client";
import { useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Grid
} from '@mui/material';

import { ids } from "./consts";

const CHARACTERS = gql`
  query charactersWithParams($id: Int) {
    charactersWithParams(id: $id) {
      results {
        id
        name
        status
        species
        type
        gender
        image
        episode {
          id
          name
          air_date
          episode
          created
        }
      created
      }
    }
  }
`;

export default function MultipleCharactersList() {
  const [id, setId] = useState(1);
  const handleChange = (event) => { setId(+event.target.value) };
  const { loading, error, data } = useQuery(CHARACTERS, { fetchPolicy: 'cache-first', variables: { id } });

  if (error) return <p>Error :(</p>;
  console.info('MultipleCharactersList', data)

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column">
      <Grid item>
        <FormControl component="fieldset">
          <FormLabel component="legend">id</FormLabel>
          <RadioGroup
            aria-label="id"
            name="id"
            value={id}
            onChange={handleChange}
            row
          >
            {ids.map(methodItem => (<FormControlLabel value={methodItem} control={<Radio />} label={methodItem} />))}
          </RadioGroup>
        </FormControl>
      </Grid>
      {loading && <Grid item>loading...</Grid>}
    </Grid>
  )
}