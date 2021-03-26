function setup(){
    noCanvas();
    const video = createCapture(VIDEO);
    video.size(240, 180)
    
    if ("geolocation" in navigator) {
        /* la géolocalisation est disponible */
        console.log("geoloc available");
  
        //recupérer la geoloc du client de manière asynchrone
        navigator.geolocation.getCurrentPosition(async function(position){
            console.log(position);
            const lat           = position.coords.latitude;
            const long          = position.coords.longitude;
  
            //écrire la donnée sur la page
            document.getElementById("lat").innerHTML    = lat;
            document.getElementById("long").innerHTML   = long;
          
            //recupérer la vidéo en base 64
            
            const img64 = video.canvas.toDataURL();// on récupère en base64
  
            //envoyer les donnée à l'API
            const data = {
                coords : {
                    latitude: lat, 
                    longitude : long
                }
            };
            const options = {
                method: 'POST', 
                headers: {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(data)
            }
            const response  = await fetch('/api/send', options);
            //lire la réponse du serveur
            const rawData   = await response.json();
            console.log(rawData);
        });
    } else {
        /* la géolocalisation n'est pas disponible */
        console.log("geoloc not available")
    }
  }