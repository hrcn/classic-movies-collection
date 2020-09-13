import React from 'react';
import { Col } from 'antd';
import { IMAGE_BASE_URL } from '../Config';

function GridCards(props) {
  if (props.actor) {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: 'relative' }}>
          <img style={{ width: '100%', height: '320px' }} alt="img" src={props.image} />
        </div>
      </Col>
    );
  }
  return (
    <Col lg={6} md={8} xs={24}>
      <div style={{ position: 'relative' }}>
        <a href={`/movie/${props.movieId}`}>
          <img style={{ width: '100%', height: '320px' }} alt="img" src={props.image} />
        </a>
      </div>
    </Col>
  );
}

export default GridCards;
