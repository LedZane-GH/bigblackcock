/* global OpenLayers, position */

//function that ensures for is  valid used to check if form can be submited
function validateForm(event) {
    const passwordsMatch = validatePasswords();
    const ageValid = validateAgeForVolunteers();

    if (!passwordsMatch || !ageValid) {
        event.preventDefault();
    } else {
        const formData = {
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            firstname: document.getElementById("firstname").value,
            lastname: document.getElementById("lastname").value,
            birthdate: document.getElementById("birthdate").value,
            gender: document.querySelector('input[name="gender"]:checked').value,
            afm: document.getElementById("afm").value,
            user_type: document.getElementById("user_type").value,
          
            volunteer_type: document.getElementById("volunteer_type") ? document.getElementById("volunteer_type").value : null,
            height: document.getElementById("height") ? document.getElementById("height").value : null,
            weight: document.getElementById("weight") ? document.getElementById("weight").value : null,
            country: document.getElementById("country").value,
            prefecture: document.getElementById("prefecture").value,
            municipality: document.getElementById("municipality").value,
            address: document.getElementById("address").value,
            lat: document.getElementById("lat") ? document.getElementById("lat").value : 98765.09,
            lon: document.getElementById("lon") ? document.getElementById("lon").value : 98765432.9,
            job: document.getElementById("job").value,
            telephone: document.getElementById("telephone").value,
            terms: document.getElementById("terms").checked,
        };

        // Convert form data to JSON
        const jsonOutput = JSON.stringify(formData, null, 4);

        // Display JSON in the output div
        document.getElementById("jsonDisplay").textContent = jsonOutput;
        document.getElementById("jsonOutput").style.display = "block";

        // Create JSON file and trigger download
        createDownloadLink(jsonOutput);
    }
}

//fuction that accuratelly changes terms label
function toggleVolunteerFields() {
    const userType = document.getElementById("user_type").value;
    const volunteerFields = document.getElementById("volunteerFields");
    const termsLabel = document.querySelector("label[for='terms'] mark");

    if (userType === "volunteer_firefighter") {
        volunteerFields.style.display = "block"; // Show volunteer fields
        termsLabel.textContent = "Συμφωνία με όρους χρήσης*: Δηλώνω υπεύθυνα ότι ανήκω στο ενεργό δυναμικό των εθελοντών πυροσβεστών.";
    } else {
        volunteerFields.style.display = "none"; // Hide volunteer fields
        termsLabel.textContent = "Συμφωνία με όρους χρήσης*: Απαγορεύεται η άσκοπη χρήση της εφαρμογής. Συμφωνώ πως η άσκοπη χρήση της θα διώκεται ποινικά.";
    }
}
//function that hides or displays password
function togglePasswordVisibility() {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm_password");
    const toggleBtn = document.getElementById("togglePassword");

    if (password.type === "password") {
        password.type = "text";
        confirmPassword.type = "text";
        toggleBtn.textContent = "Κρύψε κωδικούς";
    } else {
        password.type = "password";
        confirmPassword.type = "password";
        toggleBtn.textContent = "Δείξε κωδικούς";
    }
}
//fuction that checks if password is strong accordingly
function strongPassword() {
    const password = document.getElementById("password").value;
    const strong = document.getElementById("strong_password");
    let countDigits = 0;
    let countLowercase = 0;
    let countCapitals = 0;
    let countSymbols = 0;
    let charArray = password.split("");

    for (let i = 0; i < password.length; i++) {
        if (/[0-9]/.test(charArray[i])) {
            countDigits++;
        } else if (/[!@#$%^&*(),.?":{}|<>]/.test(charArray[i])) {
            countSymbols++;
        } else if (/[A-Z]/.test(charArray[i])) {
            countCapitals++;
        } else if (/[a-z]/.test(charArray[i])) {
            countLowercase++;
        }
    }

    if (weakness(password)) {
        strong.textContent = "";
        return false;
    }

    if (countCapitals > 0 && countLowercase > 0 && countSymbols > 0 && countDigits > 0) {
        strong.textContent = "Ο κωδικός είναι δυνατός";
        strong.classList.remove("error");
        return true;
    } else {
        strong.textContent = "Ο κωδικός είναι μετριος";
        strong.classList.remove("error");
        return true;
    }
}

function weakness() {
    const password = document.getElementById("password").value;
    const forbidden = ["fire", "fotia", "ethelontis", "volunteer"];
    const confirmpassword = document.getElementById("confirm_password");
    const errorMessage = document.getElementById("weak_password");

    let charArray = password.split("");  
    const digitCount = password.replace(/[^0-9]/g, "").length;

    for (let i = 0; i < forbidden.length; i++) {
        if (password.toLowerCase().includes(forbidden[i])) {
            errorMessage.textContent = "Ο κωδικός δεν μπορεί να περιέχει τις ακολουθίες: fire, fotia, ethelontis, volunteer!";
            return false;
        }
    }
    if (digitCount > 0.5 * password.length) {
        errorMessage.textContent = "Ο κωδικός είναι αδύναμος";
        return false;
    }

    errorMessage.textContent = "";  
    confirmpassword.type = "password";
    return true;
}
function createDownloadLink(jsonData) {
    // Create a Blob with the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Create an anchor tag to download the Blob as a file
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "formData.json"; // The name of the file to download

    // Programmatically click the link to trigger the download
    downloadLink.click();
}
 // Password validation functions
 function validatePasswords() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;
    const message = document.getElementById("passwordMismatch");

    if (password !== confirmPassword) {
        message.textContent = "Οι κωδικοί δεν ταιριάζουν!";
        return false;
    } else {
        message.textContent = "";
        return true;
    }
}


//function that calclates age

function calculateAge(birthdate) {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

function validateAgeForVolunteers() {
    const userType = document.getElementById("user_type").value;
    const birthdate = document.getElementById("birthdate").value;
    const age = calculateAge(birthdate);

    if (userType === "volunteer_firefighter") {
        if (age < 18 || age > 55) {
            alert("Για να γίνετε εθελοντής πυροσβέστης πρέπει να είστε μεταξύ 18 και 55 ετών.");
            return false;
        }
    }
    return true;
}
//map listeners and functions
document.addEventListener("DOMContentLoaded", () => {
     let mapInstance;
    let mapMarkers;

     const Button = document.getElementById("addressButton");
     const Text = document.getElementById("addressText");
     const mapBox = document.getElementById("mapBox");

     Button.addEventListener("click", () => {
        const xhr = new XMLHttpRequest();
         xhr.open("GET", buildGeocodeUrl(), true);
        xhr.setRequestHeader("x-rapidapi-key", "24b7b10c26msh26a2f1212c27eeap1afadajsnf97819e57e83");
        xhr.setRequestHeader("x-rapidapi-host", "forward-reverse-geocoding.p.rapidapi.com");

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                 handleResponse(xhr.responseText);
            }
         };

         xhr.send(null);
     });

    function buildGeocodeUrl() {
         const address = `${document.getElementById("address").value} ${document.getElementById("dimos").value} ${document.getElementById("country").value}`;
         return `https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q=${address}&acceptlanguage=en&polygon_threshold=0.0`;
    }

    function handleResponse(response) {
         const data = JSON.parse(response);
        if (data && data.length > 0) {
            const location = data[0];
            const { display_name, lat, lon } = location;

            // Set the lat and lon input fields
            document.getElementById("lat").value = lat;
            document.getElementById("lon").value = lon;

            if (display_name.includes("Crete")) {
                Text.innerHTML = display_name;
                mapBox.classList.add("show");

                const latitude = parseFloat(lat);
                const longitude = parseFloat(lon);
                initializeMap(latitude, longitude, display_name);
            } else {
                Text.innerHTML = "Δεν ειναι στη Κρήτη";
                mapBox.classList.remove("show");
            }
        } else {
            Text.innerHTML = "Δεν βρέθηκε αυτή η διεύθυνση";
            mapBox.classList.remove("show");
}

    }

    function initializeMap(latitude, longitude, message) {
         if (! mapInstance ) {
             mapInstance = new OpenLayers.Map("map");
             const osmLayer = new OpenLayers.Layer.OSM();
             mapInstance.addLayer(osmLayer);

            mapMarkers = new OpenLayers.Layer.Markers("Markers");
            mapInstance.addLayer(mapMarkers);
        }

         mapMarkers.clearMarkers();
         const pos = transformCoordinates(latitude, longitude);
         const marker = new OpenLayers.Marker(pos);
         mapMarkers.addMarker(marker);

        //setting passive false
            marker.events.register("mousedown", marker, function (evt) {
            evt.preventDefault();
            const popup = new OpenLayers.Popup.FramedCloud("Popup", position, null, message, null, true);
            mapInstance.addPopup(popup);
         }, { passive: false });

         adjustMapSizeAndCenter(position);
    }

    function transformCoordinates(lat, lon) {
         const from = new OpenLayers.Projection("EPSG:4326");
         const to= new OpenLayers.Projection("EPSG:900913");
         return new OpenLayers.LonLat(lon, lat).transform(from, to);
    }

    function adjustMapSizeAndCenter(position) {
         if (mapBox.offsetWidth > 0 && mapBox.offsetHeight > 0) {
            mapInstance.updateSize();
            mapInstance.setCenter(position, 11);
         }
         else{
            console.log("Map container not fully rendered");
             setTimeout(() => {
                mapInstance.updateSize();
                mapInstance.setCenter(position, 11);
            },100);
         }
     }
});
