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
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Container
} from '@mui/material';

import CharacterCard from "./CharacterCard";
import { fetchPolicies } from "./consts";

const CHARACTERS = gql`
  query {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`;

export default function Characters() {
  const [method, setMethod] = useState('cache-first')
  const [id, setId] = useState(1);
  const [open, setOpen] = useState(false);

  const handleOpen = (cardId) => { setId(cardId); setOpen(true) };
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setMethod(event.target.value);
  };

  const { loading, error, data } = useQuery(CHARACTERS, { fetchPolicy: 'cache-first' });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const characters = data ? data.characters.results : null;

  return (
    <Container maxWidth="md">
      <Grid
        xs={12}
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <FormControl component="fieldset">
            <FormLabel component="legend">method</FormLabel>
            <RadioGroup
              aria-label="method"
              name="fetch policy"
              value={method}
              onChange={handleChange}
              row
            >
              {fetchPolicies.map(methodItem => (<FormControlLabel value={methodItem} control={<Radio />} label={methodItem} />))}
            </RadioGroup>
          </FormControl></Grid>

        <Grid item container spacing={2}>
          {characters && (
            characters.map(char => {
              return (
                <Grid item xs={3}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={char.image}
                      alt={char.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {char.name.replace(/ .*/, '')}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => handleOpen(char.id)}>Info</Button>
                    </CardActions>
                  </Card>
                </Grid>
              )
            }
            ))}
        </Grid>
      </Grid>


      {
        open && (
          <CharacterCard
            id={id}
            open={open}
            handleClose={handleClose}
            method={method}
          />)
      }
    </Container >
  )
}