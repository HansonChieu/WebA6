import useSWR from 'swr';
import Error from 'next/error';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';


const ArtworkCardDetail = ({ objectID }) => {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList, objectID]);

  const favouritesClicked = async () => {
    try {
      if (showAdded) {
        const updatedList = await removeFromFavourites(objectID);
        setFavouritesList(updatedList);
      } else {
        const updatedList = await addToFavourites(objectID);
        setFavouritesList(updatedList);
      }
    } catch (error) {
      console.error('Error updating favourites:', error);
    }
  };

const { data, error } = useSWR(
  objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null
);

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  const {
    primaryImage,
    title,
    objectDate,
    classification,
    medium,
    artistDisplayName,
    artistWikidata_URL,
    creditLine,
    dimensions,
  } = data;

  const displayTitle = title || 'N/A';
  const displayDate = objectDate || 'N/A';
  const displayClassification = classification || 'N/A';
  const displayMedium = medium || 'N/A';
  const displayArtist = artistDisplayName || 'N/A';
  const displayCreditLine = creditLine || 'N/A';
  const displayDimensions = dimensions || 'N/A';

  return (
    <Card style={{ width: '18rem', margin: '1rem' }}>
      {primaryImage && <Card.Img variant="top" src={primaryImage} />}
      <Card.Body>
        <Card.Title>{displayTitle}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {displayDate}<br />
          <strong>Classification:</strong> {displayClassification}<br />
          <strong>Medium:</strong> {displayMedium}<br /><br />
          <strong>Artist:</strong> {displayArtist}
          {artistDisplayName && artistWikidata_URL && (
            <>
              {' '}
              <a href={artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a>
            </>
          )}
          <br />
          <strong>Credit Line:</strong> {displayCreditLine}<br />
          <strong>Dimensions:</strong> {displayDimensions}
        </Card.Text>
        <Link href={`/artwork/${objectID}`} passHref>
          <Button variant="primary">{objectID}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ArtworkCardDetail;