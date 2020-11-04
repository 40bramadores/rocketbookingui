import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

function ModalLoader(props) {
    return (
        <Dimmer active inverted>
            <Loader
                active={props.loading}
                content={props.content}
                size='massive'
                className='loader'
            />
        </Dimmer>
    )
}

export default ModalLoader;