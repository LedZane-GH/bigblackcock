package servlets;

import database.tables.EditUsersTable;
import mainClasses.User;
import com.google.gson.Gson;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet(name = "UpdateUser", urlPatterns = {"/UpdateUser"})
public class UpdateUser extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Set response type to JSON
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {
            // Get the logged-in user (from session or token-based authentication)
            User loggedInUser = (User) request.getSession().getAttribute("loggedInUser");

            if (loggedInUser == null) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // Unauthorized access
                response.getWriter().write("{\"error\":\"User not logged in.\"}");
                return;
            }

            // Parse the incoming JSON request
            Gson gson = new Gson();
            User updatedUser = gson.fromJson(request.getReader(), User.class);
            System.out.println(loggedInUser.getUsername());
            System.out.println(updatedUser.getUsername());
            // Validate the fields to ensure non-editable fields remain unchanged


            // Update the fields in the database
            EditUsersTable eut = new EditUsersTable();

            // Update editable fields only
            eut.updateUser(loggedInUser.getUsername(), "firstname", updatedUser.getFirstname());
            eut.updateUser(loggedInUser.getUsername(), "password", updatedUser.getPassword());
            eut.updateUser(loggedInUser.getUsername(), "birthdate", updatedUser.getBirthdate());
            eut.updateUser(loggedInUser.getUsername(), "gender", updatedUser.getGender());
            eut.updateUser(loggedInUser.getUsername(), "country", updatedUser.getCountry());
            eut.updateUser(loggedInUser.getUsername(), "address", updatedUser.getAddress());
            eut.updateUser(loggedInUser.getUsername(), "lastname", updatedUser.getLastname());
            eut.updateUser(loggedInUser.getUsername(), "email", updatedUser.getEmail());
            eut.updateUser(loggedInUser.getUsername(), "address", updatedUser.getAddress());
            eut.updateUser(loggedInUser.getUsername(), "job", updatedUser.getJob());
            eut.updateUser(loggedInUser.getUsername(), "municipality", updatedUser.getMunicipality());
            eut.updateUser(loggedInUser.getUsername(), "prefecture", updatedUser.getPrefecture());

            // Return the updated user details
            User refreshedUser = eut.databaseToUsers(loggedInUser.getUsername(), loggedInUser.getPassword());
            String jsonResponse = gson.toJson(refreshedUser);
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write(jsonResponse);

        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\":\"Failed to update user details.\"}");
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {
            // Get the logged-in user (from session or token-based authentication)
            User loggedInUser = (User) request.getSession().getAttribute("loggedInUser");

            if (loggedInUser == null) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("{\"error\":\"User not logged in.\"}");
                return;
            }

            // Retrieve user details from the database
            EditUsersTable eut = new EditUsersTable();
            User user = eut.databaseToUsers(loggedInUser.getUsername(), loggedInUser.getPassword());

            if (user != null) {
                Gson gson = new Gson();
                String jsonResponse = gson.toJson(user);
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().write(jsonResponse);
            } else {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                response.getWriter().write("{\"error\":\"User not found.\"}");
            }
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\":\"Failed to retrieve user details.\"}");
        }
    }
}
