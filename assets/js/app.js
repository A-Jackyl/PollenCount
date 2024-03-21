
//Remember to actually call the function or else it won't occur!
getLocation()

function getLocation() {
    if (navigator.geolocation) {
        //The function getCurrentPosition requires a success parameter and a failure parameter (the function between the commas")
        navigator.geolocation.getCurrentPosition(showPosition, positionError);
        //if the site does not give its position, then an error will display
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    //shows the long and lat in the console. Can be displayed in the HTML as well
    //console.log(position.coords.longitude);
    //console.log(position.coords.latitude);
    
    getUserReadableLocation(position.coords.latitude, position.coords.longitude);
    getPollenData(position.coords.latitude, position.coords.longitude);
}

//the failure function for the function getCurrentPosition
function positionError() {
    console.log("Error");
}




function getUserReadableLocation(lat, long) {
    
    const apiKey = "65fbef1fcd29c689065623miw1a38c3";
    const url = `https://geocode.maps.co/reverse?lat=${lat}&lon=${long}&api_key=${apiKey}`;
    
    fetch(url)
    
    .then(response => {
        
        
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        
        return response.json();
    })
    .then(data => {
        
        buildLocationName(data.address.city)
        
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        return null;
    });
}

function buildLocationName(myCity) {
    let weatherApp = document.getElementById("app"); 

    weatherApp.innerHTML = `<h1>${myCity}</h1>`;
}


function getPollenData(lat, long) {

//https://air-quality-api.open-meteo.com/v1/air-quality?latitude=52.52&longitude=13.41&current=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&hourly=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&timezone=Europe%2FBerlin&forecast_days=1

    const timeZone = "Europe%2FBerlin";

    const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${long}&current=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&hourly=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&timezone=${timeZone}&forecast_days=1`;

    fetch(url)

        .then(response => {



            if (!response.ok) {
                throw new Error('Network response was not ok');
            }


            return response.json();
        })
        .then(data => {
            pollenDataStructure(data)
            console.log(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            return null;
        });
}


//controller code
function pollenDataStructure(data) {
    let myViewData =[]

    myViewData.push(data)
    console.log(myViewData);
    buildPollenView(myViewData)
}

function buildPollenView(viewData) {
    let myDisplayElement = document.getElementById("PollenData");

    let myCurrentData = viewData[0]

    let myCurrentHTML =`
        <h2>Pollental</h2>
        <ul>
            <div class="line_br"></div>
            <li>el ${myCurrentData.current.alder_pollen} ${myCurrentData.current_units.alder_pollen}</li>
            <div class="line_br"></div>
            <li>birk ${myCurrentData.current.birch_pollen} ${myCurrentData.current_units.birch_pollen}</li>
            <div class="line_br"></div>
            <li>græs ${myCurrentData.current.grass_pollen} ${myCurrentData.current_units.grass_pollen}</li>
            <div class="line_br"></div>
            <li>bynke ${myCurrentData.current.mugwort_pollen} ${myCurrentData.current_units.mugwort_pollen}</li>
            <div class="line_br"></div>
            <li>oliven ${myCurrentData.current.olive_pollen} ${myCurrentData.current_units.olive_pollen}</li>
            <div class="line_br"></divcurrent_units></div>
            <li>ambrosie ${myCurrentData.current.ragweed_pollen} ${myCurrentData.current_units.ragweed_pollen}</li>
        </ul>
    `

    myDisplayElement.innerHTML = myCurrentHTML
}