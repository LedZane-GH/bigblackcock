

/* global session, username, updateFormHtml, deleteFormHtml, createFormHtml */

function createTableFromJSON(data) {
    var html = "<table><tr><th>Category</th><th>Value</th></tr>";
    for (const x in data) {
        var category = x;
        var value = data[x];
        html += "<tr><td>" + category + "</td><td>" + value + "</td></tr>";
    }
    html += "</table>";
    return html;

}
function updateUser() {
    let updateForm = document.getElementById('updateForm');
    let formData = new FormData(updateForm);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    var jsonData = JSON.stringify(data);

    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Show success message
            $('#ajaxContent').html("Your details have been successfully updated!");
            // Refresh user details
            $('#ajaxContent').append(createTableFromJSON(JSON.parse(xhr.responseText)));
        } else {
            // Handle error
            console.error('Request failed with status ' + xhr.status);
            document.getElementById('ajaxContent').innerHTML =
                'Request failed. Returned status of ' + xhr.status + '<br>' + 'Response: ' + xhr.responseText;
        }
    };

    xhr.open('POST', 'UpdateUser');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonData);
}

function createUpdateForm(user) {
    let formHtml = `
        <form id="updateForm">
            <h3>Update Your Details</h3>
            
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" value="${user.username}" readonly><br><br>
            
            <label for="password">Password:</label>
            <input type="text" id="password" name="password" value="${user.password}" required><br><br>
            
            <label for="firstname">First Name:</label>
            <input type="text" id="firstname" name="firstname" value="${user.firstname}" required><br><br>

            <label for="lastname">Last Name:</label>
            <input type="text" id="lastname" name="lastname" value="${user.lastname}" required><br><br>
            
           <label for="birthdate">Birthdate:</label>
            <input type="date" id="birthdate" name="birthdate" min="1920-01-01" max="2011-12-31" value="2004-04-18" required><br><br>
            <label for="gender">Gender: </label><br>
            <input type="radio" id="male" name="gender" value="male" required>
            <label for="male">Male</label><br>
            <input type="radio" id="Female" name="gender" value="female" required>
            <label for="female">Female</label><br>
            <input type="radio" id="Other" name="gender" value="other" required>
            <label for="other">Other</label><br><br>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" value="${user.email}" required><br><br>
            
            
            <label for="country">Country:</label>
           
            <select class="form-select" autocomplete="country" id="country" name="country" >
                <option value="GR" selected>Greece</option>
                <option value="AF">Afghanistan</option>
                <option value="AX">Åland Islands</option>
                <option value="AL">Albania</option>
                <option value="DZ">Algeria</option>
                <option value="AS">American Samoa</option>
                <option value="AD">Andorra</option>
                <option value="AO">Angola</option>
                <option value="AI">Anguilla</option>
                <option value="AQ">Antarctica</option>
                <option value="AG">Antigua and Barbuda</option>
                <option value="AR">Argentina</option>
                <option value="AM">Armenia</option>
                <option value="AW">Aruba</option>
                <option value="AU">Australia</option>
                <option value="AT">Austria</option>
                <option value="AZ">Azerbaijan</option>
                <option value="BS">Bahamas</option>
                <option value="BH">Bahrain</option>
                <option value="BD">Bangladesh</option>
                <option value="BB">Barbados</option>
                <option value="BY">Belarus</option>
                <option value="BE">Belgium</option>
                <option value="BZ">Belize</option>
                <option value="BJ">Benin</option>
                <option value="BM">Bermuda</option>
                <option value="BT">Bhutan</option>
                <option value="BO">Bolivia (Plurinational State of)</option>
                <option value="BA">Bosnia and Herzegovina</option>
                <option value="BW">Botswana</option>
                <option value="BV">Bouvet Island</option>
                <option value="BR">Brazil</option>
                <option value="IO">British Indian Ocean Territory</option>
                <option value="BN">Brunei Darussalam</option>
                <option value="BG">Bulgaria</option>
                <option value="BF">Burkina Faso</option>
                <option value="BI">Burundi</option>
                <option value="CV">Cabo Verde</option>
                <option value="KH">Cambodia</option>
                <option value="CM">Cameroon</option>
                <option value="CA">Canada</option>
                <option value="BQ">Caribbean Netherlands</option>
                <option value="KY">Cayman Islands</option>
                <option value="CF">Central African Republic</option>
                <option value="TD">Chad</option>
                <option value="CL">Chile</option>
                <option value="CN">China</option>
                <option value="CX">Christmas Island</option>
                <option value="CC">Cocos (Keeling) Islands</option>
                <option value="CO">Colombia</option>
                <option value="KM">Comoros</option>
                <option value="CG">Congo</option>
                <option value="CD">Congo, Democratic Republic of the</option>
                <option value="CK">Cook Islands</option>
                <option value="CR">Costa Rica</option>
                <option value="HR">Croatia</option>
                <option value="CU">Cuba</option>
                <option value="CW">Curaçao</option>
                <option value="CY">Cyprus</option>
                <option value="CZ">Czech Republic</option>
                <option value="CI">Côte d'Ivoire</option>
                <option value="DK">Denmark</option>
                <option value="DJ">Djibouti</option>
                <option value="DM">Dominica</option>
                <option value="DO">Dominican Republic</option>
                <option value="EC">Ecuador</option>
                <option value="EG">Egypt</option>
                <option value="SV">El Salvador</option>
                <option value="GQ">Equatorial Guinea</option>
                <option value="ER">Eritrea</option>
                <option value="EE">Estonia</option>
                <option value="SZ">Eswatini (Swaziland)</option>
                <option value="ET">Ethiopia</option>
                <option value="FK">Falkland Islands (Malvinas)</option>
                <option value="FO">Faroe Islands</option>
                <option value="FJ">Fiji</option>
                <option value="FI">Finland</option>
                <option value="FR">France</option>
                <option value="GF">French Guiana</option>
                <option value="PF">French Polynesia</option>
                <option value="TF">French Southern Territories</option>
                <option value="GA">Gabon</option>
                <option value="GM">Gambia</option>
                <option value="GE">Georgia</option>
                <option value="DE">Germany</option>
                <option value="GH">Ghana</option>
                <option value="GI">Gibraltar</option>
                <option value="GL">Greenland</option>
                <option value="GD">Grenada</option>
                <option value="GP">Guadeloupe</option>
                <option value="GU">Guam</option>
                <option value="GT">Guatemala</option>
                <option value="GG">Guernsey</option>
                <option value="GN">Guinea</option>
                <option value="GW">Guinea-Bissau</option>
                <option value="GY">Guyana</option>
                <option value="HT">Haiti</option>
                <option value="HM">Heard Island and Mcdonald Islands</option>
                <option value="HN">Honduras</option>
                <option value="HK">Hong Kong</option>
                <option value="HU">Hungary</option>
                <option value="IS">Iceland</option>
                <option value="IN">India</option>
                <option value="ID">Indonesia</option>
                <option value="IR">Iran</option>
                <option value="IQ">Iraq</option>
                <option value="IE">Ireland</option>
                <option value="IM">Isle of Man</option>
                <option value="IL">Israel</option>
                <option value="IT">Italy</option>
                <option value="JM">Jamaica</option>
                <option value="JP">Japan</option>
                <option value="JE">Jersey</option>
                <option value="JO">Jordan</option>
                <option value="KZ">Kazakhstan</option>
                <option value="KE">Kenya</option>
                <option value="KI">Kiribati</option>
                <option value="KP">Korea, North</option>
                <option value="KR">Korea, South</option>
                <option value="XK">Kosovo</option>
                <option value="KW">Kuwait</option>
                <option value="KG">Kyrgyzstan</option>
                <option value="LA">Lao People's Democratic Republic</option>
                <option value="LV">Latvia</option>
                <option value="LB">Lebanon</option>
                <option value="LS">Lesotho</option>
                <option value="LR">Liberia</option>
                <option value="LY">Libya</option>
                <option value="LI">Liechtenstein</option>
                <option value="LT">Lithuania</option>
                <option value="LU">Luxembourg</option>
                <option value="MO">Macao</option>
                <option value="MK">Macedonia North</option>
                <option value="MG">Madagascar</option>
                <option value="MW">Malawi</option>
                <option value="MY">Malaysia</option>
                <option value="MV">Maldives</option>
                <option value="ML">Mali</option>
                <option value="MT">Malta</option>
                <option value="MH">Marshall Islands</option>
                <option value="MQ">Martinique</option>
                <option value="MR">Mauritania</option>
                <option value="MU">Mauritius</option>
                <option value="YT">Mayotte</option>
                <option value="MX">Mexico</option>
                <option value="FM">Micronesia</option>
                <option value="MD">Moldova</option>
                <option value="MC">Monaco</option>
                <option value="MN">Mongolia</option>
                <option value="ME">Montenegro</option>
                <option value="MS">Montserrat</option>
                <option value="MA">Morocco</option>
                <option value="MZ">Mozambique</option>
                <option value="MM">Myanmar (Burma)</option>
                <option value="NA">Namibia</option>
                <option value="NR">Nauru</option>
                <option value="NP">Nepal</option>
                <option value="NL">Netherlands</option>
                <option value="AN">Netherlands Antilles</option>
                <option value="NC">New Caledonia</option>
                <option value="NZ">New Zealand</option>
                <option value="NI">Nicaragua</option>
                <option value="NE">Niger</option>
                <option value="NG">Nigeria</option>
                <option value="NU">Niue</option>
                <option value="NF">Norfolk Island</option>
                <option value="MP">Northern Mariana Islands</option>
                <option value="NO">Norway</option>
                <option value="OM">Oman</option>
                <option value="PK">Pakistan</option>
                <option value="PW">Palau</option>
                <option value="PS">Palestine</option>
                <option value="PA">Panama</option>
                <option value="PG">Papua New Guinea</option>
                <option value="PY">Paraguay</option>
                <option value="PE">Peru</option>
                <option value="PH">Philippines</option>
                <option value="PN">Pitcairn Islands</option>
                <option value="PL">Poland</option>
                <option value="PT">Portugal</option>
                <option value="PR">Puerto Rico</option>
                <option value="QA">Qatar</option>
                <option value="RE">Reunion</option>
                <option value="RO">Romania</option>
                <option value="RU">Russian Federation</option>
                <option value="RW">Rwanda</option>
                <option value="BL">Saint Barthelemy</option>
                <option value="SH">Saint Helena</option>
                <option value="KN">Saint Kitts and Nevis</option>
                <option value="LC">Saint Lucia</option>
                <option value="MF">Saint Martin</option>
                <option value="PM">Saint Pierre and Miquelon</option>
                <option value="VC">Saint Vincent and the Grenadines</option>
                <option value="WS">Samoa</option>
                <option value="SM">San Marino</option>
                <option value="ST">Sao Tome and Principe</option>
                <option value="SA">Saudi Arabia</option>
                <option value="SN">Senegal</option>
                <option value="RS">Serbia</option>
                <option value="CS">Serbia and Montenegro</option>
                <option value="SC">Seychelles</option>
                <option value="SL">Sierra Leone</option>
                <option value="SG">Singapore</option>
                <option value="SX">Sint Maarten</option>
                <option value="SK">Slovakia</option>
                <option value="SI">Slovenia</option>
                <option value="SB">Solomon Islands</option>
                <option value="SO">Somalia</option>
                <option value="ZA">South Africa</option>
                <option value="GS">South Georgia and the South Sandwich Islands</option>
                <option value="SS">South Sudan</option>
                <option value="ES">Spain</option>
                <option value="LK">Sri Lanka</option>
                <option value="SD">Sudan</option>
                <option value="SR">Suriname</option>
                <option value="SJ">Svalbard and Jan Mayen</option>
                <option value="SE">Sweden</option>
                <option value="CH">Switzerland</option>
                <option value="SY">Syria</option>
                <option value="TW">Taiwan</option>
                <option value="TJ">Tajikistan</option>
                <option value="TZ">Tanzania</option>
                <option value="TH">Thailand</option>
                <option value="TL">Timor-Leste</option>
                <option value="TG">Togo</option>
                <option value="TK">Tokelau</option>
                <option value="TO">Tonga</option>
                <option value="TT">Trinidad and Tobago</option>
                <option value="TN">Tunisia</option>
                <option value="TR">Turkey (Türkiye)</option>
                <option value="TM">Turkmenistan</option>
                <option value="TC">Turks and Caicos Islands</option>
                <option value="TV">Tuvalu</option>
                <option value="UM">U.S. Outlying Islands</option>
                <option value="UG">Uganda</option>
                <option value="UA">Ukraine</option>
                <option value="AE">United Arab Emirates</option>
                <option value="GB">United Kingdom</option>
                <option value="US">United States</option>
                <option value="UY">Uruguay</option>
                <option value="UZ">Uzbekistan</option>
                <option value="VU">Vanuatu</option>
                <option value="VA">Vatican City Holy See</option>
                <option value="VE">Venezuela</option>
                <option value="VN">Vietnam</option>
                <option value="VG">Virgin Islands, British</option>
                <option value="VI">Virgin Islands, U.S</option>
                <option value="WF">Wallis and Futuna</option>
                <option value="EH">Western Sahara</option>
                <option value="YE">Yemen</option>
                <option value="ZM">Zambia</option>
                <option value="ZW">Zimbabwe</option>
            </select><br><br>

            <label for="address" class="required">Address:</label>
            <input type="text" id="address" name="address" minlength="10" maxlength="150" required>
            
            <label for="afm">AFM:</label>
            <input type="text" id="afm" name="afm" value="${user.afm}" readonly><br><br>
    
            

            <label for="job">Job:</label>
            <input type="text" id="job" name="job" value="${user.job}" required><br><br>

            <label for="telephone">Telephone:</label>
            <input type="text" id="telephone" name="telephone" value="${user.telephone}" readonly><br><br>

            <label for="municipality">Municipality:</label>
            <input type="text" id="municipality" name="municipality" value="${user.municipality}" required><br><br>

            <label for="prefecture">Prefecture:</label>
            <input type="text" id="prefecture" name="prefecture" value="${user.prefecture}" required><br><br>

            <button type="button" onclick="updateUser()">Update</button>
        </form>
    `;
    return formHtml;
}


function initDB() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
              $("#ajaxContent").html("Successful Initialization");
        } else if (xhr.status !== 200) {
             $("#ajaxContent").html("Error Occured");
        }
    };

    xhr.open('GET', 'InitDB');
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
}

function deleteDB() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
              $("#ajaxContent").html("Successful Deletion");
        } else if (xhr.status !== 200) {
             $("#ajaxContent").html("Error Occured");
        } 
    };

    xhr.open('GET', 'DeleteDB');
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
}

function RegisterPOST() {
    let myForm = document.getElementById('myForm');
    let formData = new FormData(myForm);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    var jsonData = JSON.stringify(data);

    var xhr = new XMLHttpRequest();
    
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Show success message and display the user data
            $('#ajaxContent').html("Successful Registration. Now please log in!<br> Your Data");
            $('#ajaxContent').append(createTableFromJSON(JSON.parse(xhr.responseText)));
        } else {
            // Handle error (e.g., username already taken)
            console.error('Request failed with status ' + xhr.status);
            document.getElementById('ajaxContent').innerHTML = 'Request failed. Returned status of ' + xhr.status + '<br>' + 'Response: ' + xhr.responseText;
        }
    };

    // Open the POST request for Register servlet
    xhr.open('POST', 'Register');
    // Set the correct Content-Type for JSON data
    xhr.setRequestHeader("Content-type", "application/json");
    // Send the serialized JSON data
    xhr.send(jsonData);
}

function isLoggedIn() {
    var loggedInUser = sessionStorage.getItem("loggedInUser");
    

    if (loggedInUser) {
        var user = JSON.parse(loggedInUser); // Parse the stored user data
        $("#ajaxContent").html("Welcome again " + user.username);
        console.log("Logged In User Data: ", loggedInUser);
        console.log("Parsed User Object: ", user);
        console.log("Username: ", user.username);
        // Check the username and create the appropriate form
        if (user.username === "admin") {
            $("#ajaxContent").append(createAdminForm(user));
        } else {
            $("#ajaxContent").append(createUpdateForm(user));
        }

        // Show the logout button
        $("#logoutButton").show();
    } else {
        $("#ajaxContent").html("Please log in to continue.");
    }
}

// Automatically check login status on page load
window.onload = function() {
    isLoggedIn();
};




function getUser() {
            var xhr = new XMLHttpRequest();
            
            xhr.onload = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    
                    var responseData = JSON.parse(xhr.responseText);
                    if (responseData.error) {
                        // Handle login failure 
                        $("#ajaxContent").html(responseData.error);
                    } else {
                        // Handle successful login 
                        $("#ajaxContent").html("Successful Login");
                        $("#ajaxContent").append(createTableFromJSON(responseData));
                         $("#logoutButton").show();
                        session.setAttribute("loggedIn",username);
                         $("#choices").load("update.html");

                        // Show the logout button

                    }
                } else if (xhr.status !== 200) {
                    $("#ajaxContent").html("User not found or incorrect password");
                }
            };

            // Serialize the login form data
            var data = $('#loginForm').serialize();

            // Use POST method for login
            xhr.open('POST', 'GetUser');
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(data);  // Send the form data to the server
        }

function loginPOST() {
      console.log("loginPOST function invoked");
   
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
             try {
            var responseData = JSON.parse(xhr.responseText);
            console.log("Response data:", responseData);
            if (responseData.error) {
                $("#ajaxContent").html(responseData.error);
            } else {
                sessionStorage.setItem("loggedInUser", JSON.stringify(responseData));
                $("#ajaxContent").html("Successful Login");
                console.log(responseData.username);
                if (responseData.username === "admin") {
                    $("#ajaxContent").append(createAdminForm(responseData));
                } else {
                    $("#ajaxContent").append(createUpdateForm(responseData));
                }
                $("#logoutButton").show();
            }
        } catch (error) {
            console.error("Error parsing response JSON:", error);
        }
    
        } else if (xhr.status !== 200) {
            $("#ajaxContent").html("User not found or incorrect password");
        }
    };

    var data = $('#loginForm').serialize();
    xhr.open('POST', 'Login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(data);
}

function createAdminForm(admin) {
    let formHtml = `
        <form id="adminForm">
            <h3>Admin Dashboard</h3>
            <p>Welcome, ${admin.username}! You have admin privileges.</p>

            <button type="button" onclick="initDB()">Initialize Database</button>
            <button type="button" onclick="deleteDB()">Delete Database</button>
            <button type="button" onclick="showUpdateIncidentStatusForm()">Update Incident Status</button>
            <button type="button" onclick="createIncidentDeleteForm()">Delete Incident</button>
            <button type="button" onclick="showRegisterIncidentForm()">Register Incident</button>
            <button onclick="showRegisterMessageForm()">Register Message</button>

            
            <!-- Placeholder for dynamically added forms -->
            <div id="adminActionsContainer"></div>
        </form>
    `;
    return formHtml;
}
function showRegisterIncidentForm() {
    const formHtml = `
        <h2>Register Incident</h2>
        <form id="registerIncidentForm">
            <label for="incident_type">Incident Type:</label><br>
            <input type="text" id="incident_type" name="incident_type" required 
                   pattern="^(fire|accident)$" title="Incident type must be 'fire' or 'accident'."><br><br>

            <label for="description">Description:</label><br>
            <textarea id="description" name="description" required></textarea><br><br>

            

            <label for="user_type">User Type:</label><br>
            <input type="text" id="user_type" name="user_type" required 
                   pattern="^(guest|admin|user)$" title="User type must be 'guest', 'admin', or 'user'."><br><br>

            <label for="address">Address:</label><br>
            <input type="text" id="address" name="address" required><br><br>

            <label for="lat">Latitude:</label><br>
            <input type="number" id="lat" name="lat" step="0.000001" required><br><br>

            <label for="lon">Longitude:</label><br>
            <input type="number" id="lon" name="lon" step="0.000001" required><br><br>

            <label for="municipality">Municipality:</label><br>
            <input type="text" id="municipality" name="municipality" required><br><br>

            <label for="prefecture">Prefecture:</label><br>
            <input type="text" id="prefecture" name="prefecture" required 
                   pattern="^(heraklion|chania|rethymno|lasith)$" 
                   title="Prefecture must be 'heraklion', 'chania', 'rethymno', or 'lasith'."><br><br>

            <label for="danger">Danger:</label><br>
            <input type="text" id="danger" name="danger"><br><br>

            <label for="status">Status:</label><br>
            <input type="text" id="status" name="status"
                   pattern="^(running)$"><br><br>

            <label for="start_datetime">Start Date time:</label><br>
            <input type="datetime-local" id="start_datetime" name="start_datetime" required><br><br>

            <label for="end_datetime">End Date time:</label><br>
            <input type="datetime-local" id="end_datetime" name="end_datetime"><br><br>

            <label for="vehicles">Vehicles:</label><br>
            <input type="number" id="vehicles" name="vehicles" required><br><br>

            <label for="firemen">Firemen:</label><br>
            <input type="number" id="firemen" name="firemen" required><br><br>
            
             <label for="user_phone">User Phone:</label><br>
             <input type="tel" id="user_phone" name="user_phone" required 
                pattern="^\\d{10,14}$" title="Phone number must be between 10 and 14 digits."><br><br>
            
        <button type="button" id="registerIncidentButton">Register Incident</button>
        </form>
    `;

    const container = document.getElementById('adminActionsContainer');
    if (!container) {
        console.error("adminActionsContainer not found.");
        return;
    }

    container.innerHTML = formHtml;

    // Attach the event to the button immediately after rendering the form
    const button = document.getElementById('registerIncidentButton');
    if (button) {
        button.onclick = () => {
            const formData = collectFormData();
            registerIncident(formData);  // Pass the form data to registerIncident function
        };
        console.log("Button event attached.");
    } else {
        console.error("Button with id 'registerIncidentButton' not found.");
    }
}

function collectFormData() {
    // Collect the form data without using the DOM or FormData
    const data = {
        incident_type: document.getElementById('incident_type').value,
        description: document.getElementById('description').value,
        user_phone: document.getElementById('user_phone').value,
        user_type: document.getElementById('user_type').value,
        address: document.getElementById('address').value,
        lat: document.getElementById('lat').value,
        lon: document.getElementById('lon').value,
        municipality: document.getElementById('municipality').value,
        prefecture: document.getElementById('prefecture').value,
        danger: document.getElementById('danger').value,
        status: document.getElementById('status').value,
        start_datetime: document.getElementById('start_datetime').value,
        end_datetime: document.getElementById('end_datetime').value,
        vehicles: document.getElementById('vehicles').value,
        firemen: document.getElementById('firemen').value
    };

    return data;
}

function registerIncident(formData) {
    if (!formData) {
        console.error("No form data provided.");
        return;
    }

    // Convert form data to JSON
    const jsonData = JSON.stringify(formData);

    // Proceed with the AJAX request
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $('#ajaxContent').html("Incident registered successfully!");
        } else {
            console.error('Request failed with status ' + xhr.status);
            $('#ajaxContent').html('Failed to register incident. Status: ' + xhr.status + '<br>Response: ' + xhr.responseText);
        }
    };

    xhr.open('POST', 'IncidentServlet');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(jsonData);
}

function showRegisterMessageForm() {
    const formHtml = `
        <h2>Register Message</h2>
        <form id="registerMessageForm">
            <label for="incident_id">Incident ID:</label><br>
            <input type="number" id="incident_id" name="incident_id" required><br><br>

            <label for="message">Message:</label><br>
            <textarea id="message" name="message" required></textarea><br><br>

            <label for="sender">Sender:</label><br>
            <input type="text" id="sender" name="sender" required><br><br>

            <label for="recipient">Recipient:</label><br>
            <input type="text" id="recipient" name="recipient" required><br><br>

            <label for="date_time">Date Time:</label><br>
            <input type="datetime-local" id="date_time" name="date_time" required><br><br>

            <button type="button" onclick="registerMessage()">Register Message</button>
        </form>
    `;

    const container = document.getElementById('adminActionsContainer');
    if (!container) {
        console.error("adminActionsContainer not found.");
        return;
    }

    container.innerHTML = formHtml;
}
function registerMessage() {
    // Collect message data from the form without using the DOM or FormData
    const messageData = {
        incident_id: document.getElementById('incident_id').value,
        message: document.getElementById('message').value,
        sender: document.getElementById('sender').value,
        recipient: document.getElementById('recipient').value,
        date_time: document.getElementById('date_time').value
    };

    // Ensure message data is collected correctly
    if (!messageData.incident_id || !messageData.message || !messageData.sender || !messageData.recipient || !messageData.date_time) {
        console.error("Some required fields are missing.");
        alert("Please fill in all required fields.");
        return;
    }

    // Convert the message data to JSON format
    const jsonData = JSON.stringify(messageData);

    // Create a new XMLHttpRequest object to make the AJAX request
    var xhr = new XMLHttpRequest();

    // Set up the request
    xhr.open('POST', 'messagebyUser');
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Define the function to handle the response from the server
    xhr.onload = function () {
        if (xhr.status === 200) {
            // If the message was successfully registered, handle the response
            const response = JSON.parse(xhr.responseText);
            if (response.status === "success") {
                console.log("Message successfully registered.");
                alert(response.message); // Display success message
            } else {
                console.error("Error registering message: " + response.message);
                alert("Failed to register message: " + response.message); // Display error message
            }
        } else {
            console.error('Request failed with status ' + xhr.status);
            alert('Error: Failed to register message.');
        }
    };

    // Handle any errors during the request
    xhr.onerror = function () {
        console.error('Request failed due to a network error.');
        alert('Network error occurred while registering the message.');
    };

    // Send the request with the JSON data
    xhr.send(jsonData);
}



function logout() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $("#ajaxContent").html("Successfully Logged Out.");
            $("#logoutButton").hide();
            $("#loginForm").show();

            // Clear session data
            sessionStorage.removeItem("loggedInUser");
        } else if (xhr.status !== 200) {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };

    xhr.open('POST', 'Logout');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
}

function deleteIncident() {
    var incidentId = document.getElementById("incident_id").value;

    if (!incidentId) {
        alert("Please enter an incident ID.");
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "DeleteIncidentServlet?id=" + incidentId, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200) {
            alert("Incident deleted successfully.");
        } else {
            var response = JSON.parse(xhr.responseText);
            alert("Error: " + (response.error || "Failed to delete incident."));
        }
    };

    xhr.onerror = function () {
        alert("An error occurred while communicating with the server.");
    };

    xhr.send();
}


function createIncidentDeleteForm(incident = {}) {
  
    const incidentId = incident.incident_id || ""; // Use an empty string if no ID is provided

    // Render the form dynamically
    let deleteFormHtml =  `
        <form id="deleteIncidentForm">
            <label for="incident_id">Incident ID:</label>
            <input type="text" id="incident_id" name="incident_id" value="${incidentId}">
            <button type="button" onclick="deleteIncident()">Delete Incident</button>
        </form>
    `;
   
    document.getElementById('adminActionsContainer').innerHTML = deleteFormHtml;
}
// Function to show the Update Incident Status form dynamically
function showUpdateIncidentStatusForm() {
    let updateFormHtml = `
        <form id="updateIncidentStatusForm">
            <h4>Update Incident Status</h4>
            <label for="incidentId">Incident ID:</label>
            <input type="text" id="incidentId" name="incidentId" required>
            <label for="newStatus">New Status:</label>
            <input type="text" id="newStatus" name="newStatus" required>
            <button type="submit">Submit</button>
        </form>
    `;

    // Insert into adminActionsContainer
    document.getElementById('adminActionsContainer').innerHTML = updateFormHtml;
}


function updateIncidentStatus() {
    const incidentId = document.getElementById("incident_id").value;
    const status = document.getElementById("status").value;

    // Validate input
    if (!incidentId || !status) {
        alert("Please enter both Incident ID and Status.");
        return;
    }

    const validStatuses = ["fake", "running", "finished"];
    if (!validStatuses.includes(status)) {
        alert("Invalid status. Allowed values are: fake, running, finished.");
        return;
    }

    const xhr = new XMLHttpRequest();

    // Prepare the request
    xhr.open("POST", "UpdateIncident", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Define the function to handle the response
    xhr.onload = function () {
        if (xhr.status === 200) {
            // Parse the response as JSON
            const response = JSON.parse(xhr.responseText);
            if (response.message) {
                alert(response.message);
            } else if (response.error) {
                alert(`Error: ${response.error}`);
            }
        } else {
            alert("Error: " + xhr.status);
        }
    };

    
    xhr.onerror = function () {
        alert("An error occurred while updating the incident status.");
    };

    xhr.send(`incident_id=${encodeURIComponent(incidentId)}&status=${encodeURIComponent(status)}`);
}



// Function to collect form data for fast incident registration
function collectFastIncidentFormData() {
    return {
        incident_type: document.getElementById('incident_type').value.trim(),
        description: document.getElementById('description').value.trim(),
        user_phone: document.getElementById('user_phone').value.trim(),
        address: document.getElementById('address').value.trim(),
        lat: parseFloat(document.getElementById('lat').value.trim()),
        lon: parseFloat(document.getElementById('lon').value.trim()),
        municipality: document.getElementById('municipality').value.trim(),
        prefecture: document.getElementById('prefecture').value.trim(),
        danger: document.getElementById('danger').value.trim(),
        status: document.getElementById('status').value.trim(),
        start_datetime: document.getElementById('start_datetime').value.trim(),
        end_datetime: document.getElementById('end_datetime').value.trim(),
        vehicles: parseInt(document.getElementById('vehicles').value.trim(), 10),
        firemen: parseInt(document.getElementById('firemen').value.trim(), 10),
    };
}

// Function to register a fast incident
function registerFastIncident() {
    const formData = collectFastIncidentFormData();

    // Validate required fields
    if (!formData.user_phone || !formData.incident_type || !formData.description) {
        alert("Phone, Incident Type, and Description are required.");
        return;
    }

    const jsonData = JSON.stringify(formData);

    // Create and send an XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'IncidentServlet'); // Update with your backend servlet endpoint
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.status === "success") {
                alert("Incident successfully registered!");
                console.log("Incident registered:", response);
            } else {
                alert("Failed to register incident: " + (response.message || "Unknown error."));
                console.error("Error response:", response);
            }
        } else {
            alert(`Request failed with status ${xhr.status}.`);
            console.error(`Error: ${xhr.statusText}`);
        }
    };

    xhr.onerror = function () {
        alert("A network error occurred while submitting the form.");
        console.error("Network error.");
    };

    xhr.send(jsonData);
}

// Function to display the form for fast incident registration
function showRegisterFastIncidentForm() {
    const formHtml = `
        <h2>Register Fast Incident</h2>
        <form id="registerFastIncidentForm" onsubmit="registerFastIncident(); return false;">
            <label for="incident_type">Incident Type:</label><br>
            <input type="text" id="incident_type" name="incident_type" required 
                   pattern="^(fire|accident)$" title="Incident type must be 'fire' or 'accident'."><br><br>

            <label for="description">Description:</label><br>
            <textarea id="description" name="description" required></textarea><br><br>

            <label for="address">Address:</label><br>
            <input type="text" id="address" name="address" required><br><br>

            <label for="lat">Latitude:</label><br>
            <input type="number" id="lat" name="lat" step="0.000001" required><br><br>

            <label for="lon">Longitude:</label><br>
            <input type="number" id="lon" name="lon" step="0.000001" required><br><br>

            <label for="municipality">Municipality:</label><br>
            <input type="text" id="municipality" name="municipality" required><br><br>

            <label for="prefecture">Prefecture:</label><br>
            <input type="text" id="prefecture" name="prefecture" required 
                   pattern="^(heraklion|chania|rethymno|lasith)$" 
                   title="Prefecture must be 'heraklion', 'chania', 'rethymno', or 'lasith'."><br><br>

            <label for="danger">Danger:</label><br>
            <input type="text" id="danger" name="danger"><br><br>

            <label for="status">Status:</label><br>
            <input type="text" id="status" name="status" pattern="^(running)$"><br><br>

            <label for="start_datetime">Start Date Time:</label><br>
            <input type="datetime-local" id="start_datetime" name="start_datetime" required><br><br>

            <label for="end_datetime">End Date Time:</label><br>
            <input type="datetime-local" id="end_datetime" name="end_datetime"><br><br>

            <label for="vehicles">Vehicles:</label><br>
            <input type="number" id="vehicles" name="vehicles" required><br><br>

            <label for="firemen">Firemen:</label><br>
            <input type="number" id="firemen" name="firemen" required><br><br>

            <label for="user_phone">Phone Number:</label><br>
            <input type="tel" id="user_phone" name="user_phone" required 
                   pattern="^\\d{10,14}$" title="Phone number must be between 10 and 14 digits."><br><br>

            <button type="submit">Submit Incident</button>
        </form>
    `;

    const container = document.getElementById('guestActionsContainer');
    if (!container) {
        console.error("Container 'guestActionsContainer' not found.");
        return;
    }

    container.innerHTML = formHtml;
}


function createTableFromJSON(data) {
    var html = "<table><tr><th>Category</th><th>Value</th></tr>";
    for (const x in data) {
        var category = x;
        var value = data[x];
        html += "<tr><td>" + category + "</td><td>" + value + "</td></tr>";
    }
    html += "</table>";
    return html;
}


