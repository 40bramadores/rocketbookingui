import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { SEND_EMAIL_MESSAGE } from '../utils/Constants';

function PresentationCard(props) {
    return (
        <Card className='images-card'>
            <Image src={props.person.PHOTO} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{props.person.NAME}</Card.Header>
                <Card.Meta>
                    <span className='date'>{props.person.AGE}</span>
                </Card.Meta>
                <Card.Description>
                    {props.person.WORK}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <p><a href={props.person.MAIL}>{SEND_EMAIL_MESSAGE}</a></p>
            </Card.Content>
        </Card>
    )
}

export default PresentationCard;
