import {useState} from 'react';
import {useRouter} from 'next/router';
import {authenticateUser} from '@/lib/authenticate';
import {getFavourites, getHistory} from '@/lib/userData';
import {useAtom} from 'jotai';
import {favouritesAtom, searchHistoryAtom} from '@/store';
import {Alert, Button, Card, Form} from 'react-bootstrap';

export default function Login(){
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState('');
  const router = useRouter();
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
        await authenticateUser(user, password);
        await updateAtoms();
        router.push('/favourites');
      } catch(err) {
        setWarning('err.message');
  }
}

return (
    <>
    <Card bg="light">
      <Card.Body><h2>Login</h2>Enter your login information below:</Card.Body>
    </Card>
    <br />
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>User:</Form.Label>
        <Form.Control 
          type="text" 
          value={user} 
          onChange={(e) => setUser(e.target.value)} 
        />
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </Form.Group>
      <br />
      <Button variant="primary" type="submit">Login</Button>
    </Form>
    { warning && ( <><br /><Alert variant="danger">{warning}</Alert></> )}
  </>
);
};
