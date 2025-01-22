/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import com.google.gson.Gson;
import database.DB_Connection;
import database.tables.EditUsersTable;
import database.init.JSON_Converter;
import database.tables.CheckForDuplicatesExample;
import database.tables.EditVolunteersTable;
import mainClasses.User;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import mainClasses.Volunteer;

@WebServlet(name = "Register", urlPatterns = {"/Register"})
public class Register extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Initialize JSON_Converter
        JSON_Converter converter = new JSON_Converter();
        Gson gson = new Gson();

        // Create instances of CheckForDuplicatesExample (if needed for duplicate checks)
        CheckForDuplicatesExample duplicateChecker = new CheckForDuplicatesExample();

        try {
            // Use JSON_Converter to parse JSON from request
            String json = converter.getJSONFromAjax(request.getReader());
            Connection con = DB_Connection.getConnection();

            Statement stmt = con.createStatement();

            User user = gson.fromJson(json, User.class);
            // Get user_type from request (either "user" or "volunteer")
            String userType = user.getUserType();
            System.out.println("this is user type");
            System.out.println(userType);
            // Handle user registration or volunteer registration based on the user_type
            if ("volunteer_firefighter".equals(userType)) {
                // Parse volunteer data from JSON
                Volunteer volunteer = gson.fromJson(json, Volunteer.class);

                // Validate required fields for volunteer
                if (volunteer.getUsername() == null || volunteer.getUsername().isEmpty()) {
                    sendErrorResponse(response, 400, "Username is required");
                    return;
                }

                if (volunteer.getEmail() == null || volunteer.getEmail().isEmpty()) {
                    sendErrorResponse(response, 400, "Email is required");
                    return;
                }

                if (volunteer.getTelephone() == null || volunteer.getTelephone().isEmpty()) {
                    sendErrorResponse(response, 400, "Telephone is required");
                    return;
                }

                // Check for duplicates (using CheckForDuplicatesExample)
                if (!duplicateChecker.isUserNameAvailable(volunteer.getUsername())) {
                    sendErrorResponse(response, 409, "Username already taken");
                    return;
                }

                if (!duplicateChecker.isEmailAvailable(volunteer.getEmail())) {
                    sendErrorResponse(response, 409, "Email already registered");
                    return;
                }

                if (!duplicateChecker.isTelephoneAvailable(volunteer.getTelephone())) {
                    sendErrorResponse(response, 409, "Telephone number already registered");
                    return;
                }

                // Insert volunteer into the database
                EditVolunteersTable volunteerTable = new EditVolunteersTable();
                volunteerTable.addNewVolunteer(volunteer);

                // Convert volunteer object to JSON for the response
                String jsonResponse = gson.toJson(volunteer);

                // Send response
                response.setStatus(200); // OK
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(jsonResponse);

            } else {
                // Default: Regular user registration


                // Validate required fields for user
                if (user.getUsername() == null || user.getUsername().isEmpty()) {
                    sendErrorResponse(response, 400, "Username is required");
                    return;
                }

                if (user.getEmail() == null || user.getEmail().isEmpty()) {
                    sendErrorResponse(response, 400, "Email is required");
                    return;
                }

                if (user.getTelephone() == null || user.getTelephone().isEmpty()) {
                    sendErrorResponse(response, 400, "Telephone is required");
                    return;
                }

                // Check for duplicates (using CheckForDuplicatesExample)
                if (!duplicateChecker.isUserNameAvailable(user.getUsername())) {
                    sendErrorResponse(response, 409, "Username already taken");
                    return;
                }

                if (!duplicateChecker.isEmailAvailable(user.getEmail())) {
                    sendErrorResponse(response, 409, "Email already registered");
                    return;
                }

                if (!duplicateChecker.isTelephoneAvailable(user.getTelephone())) {
                    sendErrorResponse(response, 409, "Telephone number already registered");
                    return;
                }

                // Insert user into the database
                EditUsersTable userTable = new EditUsersTable();
                userTable.addNewUser(user);

                // Convert user object to JSON for the response
                String jsonResponse = gson.toJson(user);

                // Send response
                response.setStatus(200); // OK
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(jsonResponse);
            }

        } catch (ClassNotFoundException ex) {
            sendErrorResponse(response, 500, "Internal server error. Please try again later.");
        } catch (SQLException ex) {
            sendErrorResponse(response, 500, "Database error. Please try again later.");
        }
    }

    /**
     * Utility method to send an error response with a specific status and
     * message.
     */
    private void sendErrorResponse(HttpServletResponse response, int status, String message) throws IOException {
        response.setStatus(status);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("{\"error\": \"" + message + "\"}");
    }

    @Override
    public String getServletInfo() {
        return "Registration Servlet for handling user and volunteer registrations with database integration";
    }
}
