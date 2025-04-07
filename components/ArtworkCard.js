import useSWR from 'swr';
import Error from 'next/error';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';

const ArtworkCard = ({ objectID }) => {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  const {
    primaryImageSmall,
    title,
    objectDate,
    classification,
    medium,
  } = data;

  const imageUrl = primaryImageSmall || 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]';
  const displayTitle = title || 'N/A';
  const displayDate = objectDate || 'N/A';
  const displayClassification = classification || 'N/A';
  const displayMedium = medium || 'N/A';

  return (
    <Card style={{ width: '18rem', margin: '1rem' }}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{displayTitle}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {displayDate}<br />
          <strong>Classification:</strong> {displayClassification}<br />
          <strong>Medium:</strong> {displayMedium}
        </Card.Text>
        <Link href={`/artwork/${objectID}`} passHref>
          <Button variant="primary">{objectID}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ArtworkCard;