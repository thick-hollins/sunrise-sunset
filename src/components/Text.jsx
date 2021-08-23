

const Text = ({data, location}) => {
    const{sunrise,sunset,day_length,dst, zoneName, gmtOffset} = data;
    if(sunrise===undefined||dst===undefined) return <p>loading...</p>
    updateTime(sunrise,dst)
    const[long,lat] = location;
    
    function updateTime(time, offset, gmtOffset){
        let hourTime = +(time.split(':')[0])
        let locationHour = hourTime+(gmtOffset/3600)
        console.log(locationHour, gmtOffset)
        if(locationHour>12) return (locationHour-12) + time.slice(1,-2)

        return locationHour + time.slice(1,-2)
    }
    return (
        <div>
            <p>Longitute is {long}. Latitude is {lat}</p>
            <p>Sunrise at location is {updateTime(sunrise,dst, gmtOffset)}AM</p>
            <p>Sunset at location is {updateTime(sunset,dst, gmtOffset)}PM</p>
            <p>Day length at location is {day_length}</p>
        </div>
    );
};

export default Text;