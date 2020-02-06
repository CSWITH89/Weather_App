window.addEventListener('load', ()=> {
    let long;
    let lat;

    const tempDescription = document.querySelector('.temperature-description');
    const tempDegree = document.querySelector('.temperature-degree');
    const locTimezone = document.querySelector('.location-timezone');
    const tempSection = document.querySelector('.temperature');
    const tempSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/2a5c2ad5a46c273110594aa5d83cd1ec/${lat},${long}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temperature, summary, icon} = data.currently;
                const timezone = data.timezone;
                // Set DOM Elements from the API 
                tempDegree.textContent = temperature;
                tempDescription.textContent = summary;
                locTimezone.textContent = timezone;
                // Set Icons 
                setIcons(icon,document.querySelector('.icon'))

                // Change temperature to Celsius/Fahrenheit
                    tempSection.addEventListener('click', ()=>{
                        if(tempSpan.textContent === 'F') {
                            tempSpan.textContent = "C";
                            tempDegree.textContent = ((temperature - 32) * 5/9).toFixed(2);
                        } else {
                            tempSpan.textContent = "F";
                            tempDegree.textContent = temperature;
                        }
                    })
            });

        });

        

    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID,Skycons[currentIcon]);
    }

});