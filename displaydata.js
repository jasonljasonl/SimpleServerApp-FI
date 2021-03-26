const request = '/api/get';

loadData(request)
    .then(function(response){
        console.log(response);

        for(let i=0; i<response.length; i++){
            console.log(response[i]);
            const elem = document.createElement('div');
            elem.textContent = 'latitude: '+response[i].coords.latitude+' longitude: '+response[i].coords.longitude;

            document.body.append(elem);
        }
    })


async function loadData(request){
    const response  = await fetch(request);
    const rawData   = await response.json();
    return rawData;
}