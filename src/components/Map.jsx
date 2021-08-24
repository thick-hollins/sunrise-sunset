import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useState, useRef, useMemo, useCallback } from 'react';



const Map = ({setLocation, location}) => {
    const center = {
        lat: 51.505,
        lng: -0.09,
    }
  
  function DraggableMarker() {
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
             let {lat,lng} = marker.getLatLng()
             setLocation([lat,lng])
          }
        },
      }),
      [],
    )
    return (
      <Marker
        draggable='true'
        eventHandlers={eventHandlers}
        position={location}
        ref={markerRef}>
      </Marker>
    )
}
  
  return(
    <MapContainer center={center} zoom={3} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker />
    </MapContainer>
  )


//     return (
//         <div id='map'>
//             <MapContainer center={[51.505, -0.09]} zoom={10} scrollWheelZoom={true}>
//              <TileLayer
//                 attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//              />
//             <Marker position={[51.505, -0.09]}>
//             <Popup>
//                  A pretty CSS3 popup. <br /> Easily customizable.
//             </Popup>
//             </Marker>
//             </MapContainer>
//         </div>
//     );
// };
  }

export default Map;