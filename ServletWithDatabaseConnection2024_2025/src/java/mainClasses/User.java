/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package mainClasses;


/**
 *
 * @author Mike
 */
public class User {
    int user_id;
    String username, email, password, firstname, lastname, birthdate;
    String gender,job,afm;
    String country,address;
    String lat = "null"; // Default value
    String lon = "null"; // Default value
    String telephone;
    String municipality, prefecture;
    String user_type;  // The variable name must match "user_type" in JSON

    public String getUserType() {
        return user_type;
    }

    public void setUserType(String userType) {
        this.user_type = userType;
    }


    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getAfm() {
        return afm;
    }

    public void setAfm(String afm) {
        this.afm = afm;
    }

    public String getMunicipality() {
        return municipality;
    }

    public void setMunicipality(String municipality) {
        this.municipality = municipality;
    }

    public String getPrefecture() {
        return prefecture;
    }

    public void setPrefecture(String prefecture) {
        this.prefecture = prefecture;
    }

   
   
    
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
    
    
    
    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }
    

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

   
    
    public String getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(String birthDate) {
        this.birthdate = birthDate;
    }

   
    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
    public String getLat() {
        return "1234.93";
    }

    public void setLat(String lat) {
        this.lat = lat;
    }

    public String getLon() {
        return "12334.54";
    }

    public void setLon(String lon) {
        this.lon = lon;
    }

 

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

 
    
}
