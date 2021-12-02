import {
  useQuery,
  gql
} from "@apollo/client";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Box,
  Modal,
  Paper,
  Typography
} from '@mui/material';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
};

const CHARACTER = gql` 
  query character($id: ID!) {
    character(id: $id) {
      name
      status
      species
      gender
      image
    }
  }
`;

export default function CharacterCard({ open, id, handleClose, method = 'cache-first' }) {
  const { loading, data } = useQuery(CHARACTER, { fetchPolicy: method, variables: { id } });

  const character = data ? data.character : null;;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {(loading && (<Paper>loading...</Paper>)) ||
          (!character && (<Paper>no data</Paper>)) || (
            <Card style={{ width: '300px' }}>
              <CardMedia
                component="img"
                height="300"
                image={character.image}
                alt='image'
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {character.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <p>
                    Species: {character.species}<br />
                    Status: {character.status}<br />
                    Gender: {character.gender}<br />
                  </p>
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={handleClose}>Close</Button>
              </CardActions>
            </Card>)}
      </Box>
    </Modal>
  )
}