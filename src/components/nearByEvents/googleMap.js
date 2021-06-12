// Library
import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow, Polyline} from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%',
    background: '#ddd',
};

class GoogleMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            pageSize: 12,
            totalPages: 0,
            currentPage: 1,
            activeModal: '',
            isloadedNearby: false,
            nearByData: [],
            switchView: true,
            longitude: null,
            latitude: null,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        };
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    };

    onMarkerRemove = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: false
        });
    };

    displayMarkers = () => {
        return this.props.nearByData.map((store, index) => {
            return <Marker
                key={index}
                id={index}
                name={store.venue ? store.venue.name : store.address}
                title={store}
                position={{
                    lat: store.venue ? store.venue.latitude : store.latitude,
                    lng: store.venue ? store.venue.longitude : store.longitude
                }}
                onMouseover={this.onMarkerClick}
                // onMousemove={this.onMarkerRemove}
            />
        })
    };

    render() {

        const triangleCoords = [
            {lat: 25.774, lng: -80.190},
            {lat: 18.466, lng: -66.118},
            {lat: 32.321, lng: -64.757},
            {lat: 25.774, lng: -80.190}
        ];

        return (

            <div className="map" style={{marginTop: '-52px'}}>
                <Map
                    google={this.props.google}
                    zoom={11}
                    style={mapStyles}
                    initialCenter={{lat: this.props.longitude, lng: this.props.latitude}}
                >
                    {this.displayMarkers()}
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div className="direction-here">
                            <strong>{this.state.selectedPlace.title !== undefined ? this.state.selectedPlace.title.eventTitle : null}</strong>
                            <p>{this.state.selectedPlace.name}</p>
                            {/* <p>Direction</p> */}
                        </div>
                    </InfoWindow>
                    <Polyline
                        path={triangleCoords}
                        strokeColor="#0000FF"
                        strokeOpacity={0.8}
                        strokeWeight={2}/>
                </Map>
            </div>
        )
    };
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyDopg1y0GhLx_WTxXyoT-0MkOVQ34CmpDI')
})(GoogleMap)
