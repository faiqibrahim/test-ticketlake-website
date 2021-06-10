import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export class MapContainer extends Component {
    render() {
        const {latitude, longitude,width} = this.props;
        return (
            <Map
                google={this.props.google}
                zoom={2}
                style={{width: width || '88%', height: '100%', position: 'relative'}}
                initialCenter={{
                    lat: latitude,
                    lng: longitude
                }}

            >

                {/*<Marker onClick={this.onMarkerClick}*/}
                        {/*name={'Current location'} />*/}
                <Marker
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'SOMA'}
                    position={{lat: latitude, lng: longitude}}/>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDopg1y0GhLx_WTxXyoT-0MkOVQ34CmpDI'
})(MapContainer );