import React, { Component } from 'react';
import * as US from  '../utils/Constants';
import PresentationCard from '../shared/PresentationCard';

export default class About extends Component {
    render() {
        return (
            <div className='images-div'>
                <PresentationCard
                    person={US.MATIAS_ROSOFSKY}
                />
                <PresentationCard
                    person={US.FRANCISCO_GIORDANO}
                />
                <PresentationCard
                    person={US.PABLO_ACHAVAL}
                />
                <PresentationCard
                    person={US.FRANCO_FIORI}
                />
            </div>
        )
    }
}
