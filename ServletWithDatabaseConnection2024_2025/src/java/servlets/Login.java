package servlets;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import database.tables.EditUsersTable;
import mainClasses.User;

import java.io.IOException;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Login extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, SQLException, ClassNotFoundException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        EditUsersTable eut = new EditUsersTable();
        User su = eut.databaseToUsers(username, password);

        if (su == null || !su.getPassword().equals(password)) {
            // Invalid credentials
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            JsonObject errorResponse = new JsonObject();
            errorResponse.addProperty("error", "Invalid credentials");
            response.getWriter().write(errorResponse.toString());
        } else {
            // Normal user login
            request.getSession(true).setAttribute("loggedInUser", su);
            response.setStatus(HttpServletResponse.SC_OK);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(new Gson().toJson(su));
        }

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (SQLException | ClassNotFoundException e) {
            Logger.getLogger(GetUser.class.getName()).log(Level.SEVERE, "Error processing GET request", e);
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (SQLException | ClassNotFoundException e) {
            Logger.getLogger(GetUser.class.getName()).log(Level.SEVERE, "Error processing POST request", e);
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public String getServletInfo() {
        return "Servlet for fetching user information";
    }
}
