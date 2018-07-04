import React, { Component } from 'react';
import { DefaultPlayer as Video } from 'react-html5video';
import '../../scss/components/HomeVideo.scss';
import vid from '../../video/commonage.mp4';
import poster from '../../img/poster.jpg';

class HomeVideo extends Component {
    render() {
        return (
            <Video className="HomeVideo" autoPlay loop muted
                controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                poster={poster}
                onCanPlayThrough={() => {
                    // Do stuff
                }}>
                <source src={vid} type="video/mp4" />
            </Video>
        );
    }
}

export default HomeVideo;