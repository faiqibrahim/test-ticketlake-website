// Library
import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow, Polyline} from 'google-maps-react';
import {getCardDates,dateSplitter} from "../../utils/common-utils";

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
        const {activeMarker} = this.props;
        return this.props.nearByData.map((store, index) => {
            const isActive = index === activeMarker;
            return <Marker
                style={{scale:index === activeMarker?4:0}}
                key={index}
                id={index}
                venue={store.venue ? store.venue.name : store.address}
                position={{
                    lat: store.venue ? store.venue.latitude : store.latitude,
                    lng: store.venue ? store.venue.longitude : store.longitude
                }}
                bannerImage={store.bannerImageKey ? store.bannerImageKey.imageUrl:store.defaultImage}
                eventTitle={store.eventTitle ? store.eventTitle : store.name}
                eventDate={store.eventDateTimeSlot ? getCardDates(store.eventDateTimeSlot) : dateSplitter(store.createdAt)}
                eventSlotId={store.eventSlotId}
                onMouseOver={index === activeMarker && this.onMarkerClick}
                onClick={this.onMarkerClick}
                icon={{
                    url: '/images/icons/map-marker.png',
                    scaledSize: {width:isActive?50:30, height:isActive?50:30}
                }}

            />
        })
    }

    render() {
        const triangleCoords = [
            {lat: 25.774, lng: -80.190},
            {lat: 18.466, lng: -66.118},
            {lat: 32.321, lng: -64.757},
            {lat: 25.774, lng: -80.190}
        ];

        const infoCardData = this.state.selectedPlace;
        return (

            <div className="map listing-map" style={{marginTop: '-52px'}}>
                <Map
                    google={this.props.google}
                    zoom={16}
                    style={mapStyles}
                    initialCenter={{lat: this.props.latitude, lng: this.props.longitude}}
                >
                    {this.displayMarkers()}
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div className="marker-info-card">
                           <div className={"info-card-img"}>
                               <img src={infoCardData.bannerImage} alt='InfoCardImage'
                                    onClick={() =>
                                        this.props.history.push(
                                            `/event/detail/${infoCardData.eventSlotId}`
                                        )
                                    }/>
                           </div>
                            <div className={"info-detail-wrp"}>
                                <h4 className={"heading"}>{infoCardData.eventTitle}</h4>
                                <span className={"dates"}>{infoCardData.eventDate}</span>
                                <span className={"venue"}>{infoCardData.venue}</span>
                            </div>
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
