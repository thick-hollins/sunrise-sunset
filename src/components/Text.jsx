

function localise(time, zone){
    return time.toLocaleString('en-GB', {timeZone: zone, hour: '2-digit', minute: '2-digit'})
}

function hoursAndMinutes(seconds) {
    const hours = Math.floor(seconds / 3600)
    const remainingSeconds = seconds - (hours * 3600)
    const minutes = Math.floor(remainingSeconds / 60)
    return [hours, minutes]
}

const Text = ({data, location, setDay}) => {
    let {sunrise,sunset,day_length, zoneName} = data;
    if(sunrise === undefined || zoneName === undefined) return <p>loading...</p>
    sunrise = new Date(sunrise)
    sunset = new Date(sunset)

    const[long,lat] = location;

    const [currentHours, currentMinutes] = hoursAndMinutes(day_length)

    const currentTime = new Date()
    const isDay = currentTime > sunrise && currentTime < sunset
    let timeUntil
    if (isDay) {
        timeUntil = (sunset - currentTime) / 1000
        setDay(true)
    } else {
        timeUntil = (currentTime - sunset) / 1000
        setDay(false)   
    }
    const [untilHours, untilMinutes] = hoursAndMinutes(timeUntil)

    return (
        <div>
            <p>Longitude: {long}. Latitude: {lat}</p>
            <p>Timezone is {zoneName}</p>
            <p>The current time is {localise(currentTime, zoneName)}</p>
            {isDay && <p>{untilHours} hours and {untilMinutes} minutes until sunset</p>}
            {!isDay && <p>{untilHours} hours and {untilMinutes} minutes since sunset</p>}
            <p>Sunrise time: {localise(sunrise, zoneName)}</p>
            <p>Sunset time: {localise(sunset, zoneName)}</p>
            <p>Day length at location is {currentHours} hours and {currentMinutes} minutes</p>
        </div>
    );
};

export default Text;