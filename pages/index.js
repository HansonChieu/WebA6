/*********************************************************************************
* WEB422 – Assignment 6
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Hanson Chieu Student ID: 173632233 Date: 04/07/2025
*
********************************************************************************/
import React from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="mt-4">
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
        fluid
        rounded
        alt="Metropolitan Museum of Art"
        className="mb-4"
      />

      <Row>
        <Col md={6}>
          <p>
            The Metropolitan Museum of Art, colloquially &quot;the Met,&quot; is one of the world&apos;s largest and most
            prestigious art museums. Located in New York City, it was founded in 1870 and opened its doors
            in 1872. The museum&apos;s permanent collection contains over two million works, divided among 17
            curatorial departments.
          </p>
        </Col>
        <Col md={6}>
          <p>
            The main building, located on the eastern edge of Central Park along Museum Mile, is by area
            one of the world&apos;s largest art galleries. The Met maintains extensive holdings of African,
            Asian, Oceanian, Byzantine, and Islamic art. The museum is also home to encyclopedic collections
            of musical instruments, costumes, and accessories, as well as antique weapons and armor from
            around the world.
          </p>
        </Col>
      </Row>

      <Row>
        <Col>
          <p className="text-center mt-4">
            Learn more about the Metropolitan Museum of Art on{' '}
            <a
              href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"
              target="_blank"
              rel="noreferrer"
            >
              Wikipedia
            </a>
            .
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;