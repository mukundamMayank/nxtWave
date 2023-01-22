import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardComponent(props) {
  return (
    <Card className="card">
      <Card.Body>
        <div className="header">
          <Card.Img variant="top" src={props.card.image} className="card_image"/>
          <div className="title">
            <Card.Title>{props.card.title}</Card.Title>
            <Card.Subtitle>{props.card.subtitle}</Card.Subtitle>
          </div>
        </div>
        <Card.Link>{props.card.link}</Card.Link>
        <Card.Text>
          {props.card.text}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;