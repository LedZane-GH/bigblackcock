/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package database.tables;

import com.google.gson.Gson;
import mainClasses.User;
import database.DB_Connection;
import static database.DB_Connection.getConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Mike
 */
public class EditUsersTable {

 
    public void addUserFromJSON(String json) throws ClassNotFoundException{
         User user=jsonToUser(json);
         addNewUser(user);
    }
    
     public User jsonToUser(String json){
         Gson gson = new Gson();

        User user = gson.fromJson(json, User.class);
        return user;
    }
    
    public String userToJSON(User user){
         Gson gson = new Gson();

        String json = gson.toJson(user, User.class);
        return json;
    }
    
   
    
    public void updateUser(String username,String key,String value) throws SQLException, ClassNotFoundException{
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        String update="UPDATE users SET "+key+"='"+value+"' WHERE username = '"+username+"'";
        stmt.executeUpdate(update);
        stmt.close();
        con.close();
    }
   
    
    public User databaseToUsers(String username, String password) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'");
            if (rs.next()) {
                // User exists, convert the result set into a User object
                String json = DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                return gson.fromJson(json, User.class);  // Return the User object
            }
        } catch (Exception e) {
            System.err.println("Got an exception!");
            System.err.println(e.getMessage());
        } finally {
            stmt.close();
            con.close();
        }
        return null;  // Return null if no user matches the given username and password
    }

    
    public String databaseUserToJSON(String username, String password) throws SQLException, ClassNotFoundException{
         Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM users WHERE username = '" + username + "' AND password='"+password+"'");
            rs.next();
            String json=DB_Connection.getResultsToJSON(rs);
            return json;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }


     public void createUsersTable() throws SQLException, ClassNotFoundException {

        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        String query = "CREATE TABLE users "
                + "(user_id INTEGER not NULL AUTO_INCREMENT, "
                + "    username VARCHAR(30) not null unique,"
                + "    email VARCHAR(50) not null unique,	"
                + "    password VARCHAR(32) not null,"
                + "    firstname VARCHAR(30) not null,"
                + "    lastname VARCHAR(30) not null,"
                + "    birthdate DATE not null,"
                + "    gender  VARCHAR (7) not null,"
                + "    afm  VARCHAR (10) not null,"
                + "    country VARCHAR(30) not null,"
                + "    address VARCHAR(100) not null,"
                + "    municipality VARCHAR(50) not null,"
                + "    prefecture VARCHAR(15) not null,"
                + "    job VARCHAR(200) not null,"
                + "    telephone VARCHAR(14) not null unique,"
                  + "    lat DOUBLE,"
                + "    lon DOUBLE,"
                + " PRIMARY KEY (user_id))";
        stmt.execute(query);
        stmt.close();
    }
    
    
    /**
     * Establish a database connection and add in the database.
     *
     * @throws ClassNotFoundException
     */
    public void addNewUser(User user) throws ClassNotFoundException {
        try {
            Connection con = DB_Connection.getConnection();

            Statement stmt = con.createStatement();

            String insertQuery = "INSERT INTO "
                    + " users (username,email,password,firstname,lastname,birthdate,gender,afm,country,address,municipality,prefecture,"
                    + "job,telephone,lat,lon)"
                    + " VALUES ("
                    + "'" + user.getUsername() + "',"
                    + "'" + user.getEmail() + "',"
                    + "'" + user.getPassword() + "',"
                    + "'" + user.getFirstname() + "',"
                    + "'" + user.getLastname() + "',"
                    + "'" + user.getBirthdate() + "',"
                    + "'" + user.getGender() + "',"
                    + "'" + user.getAfm() + "',"
                    + "'" + user.getCountry() + "',"
                    + "'" + user.getAddress() + "',"
                    + "'" + user.getMunicipality() + "',"
                    + "'" + user.getPrefecture() + "',"
                    + "'" + user.getJob() + "',"
                    + "'" + user.getTelephone() + "',"
                    + "'" + user.getLat() + "',"
                    + "'" + user.getLon() + "'"
                    + ")";
            //stmt.execute(table);
            System.out.println(insertQuery);
            stmt.executeUpdate(insertQuery);
            System.out.println("# The user was successfully added in the database.");

            /* Get the member id from the database and set it to the member */
            stmt.close();

        } catch (SQLException ex) {
            Logger.getLogger(EditUsersTable.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public boolean userExists(String username) throws SQLException, ClassNotFoundException {
        String query = "SELECT COUNT(*) FROM users WHERE username = ?";
        try (Connection con = getConnection(); PreparedStatement ps = con.prepareStatement(query)) {
            ps.setString(1, username);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt(1) > 0; // If count > 0, user exists
                }
            }
        }
        return false;
    }

    // Optional: Method to check if an email exists
    public boolean emailExists(String email) throws SQLException, ClassNotFoundException {
        String query = "SELECT COUNT(*) FROM users WHERE email = ?";
        try (Connection con = getConnection(); PreparedStatement ps = con.prepareStatement(query)) {
            ps.setString(1, email);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt(1) > 0; // If count > 0, email exists
                }
            }
        }
        return false;
    }


}
