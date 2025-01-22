/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package servlets;

import com.google.gson.Gson;
import database.tables.EditIncidentsTable;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import mainClasses.Incident;

/**
 *
 * @author akaka
 */
@WebServlet(name = "FindIncident", urlPatterns = {"/FindIncident"})
public class FindIncident extends HttpServlet {

    private EditIncidentsTable editIncidentsTable;

    @Override
    public void init() throws ServletException {
        super.init();
        editIncidentsTable = new EditIncidentsTable();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Set the content type to JSON
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Retrieve path parameters (type and status)
        String[] pathParts = request.getPathInfo().split("/");
        String type = pathParts[1];  // e.g., "fire" or "all"
        String status = pathParts[2];  // e.g., "running" or "all"

        // Retrieve the optional query parameter for municipality
        String municipality = request.getParameter("municipality");

        try {
            // Fetch incidents from the database
            ArrayList<Incident> incidents = editIncidentsTable.databaseToIncidentsSearch(type, status, municipality != null ? municipality : "all");

            // Create a Gson object to convert the list to JSON
            Gson gson = new Gson();
            String jsonResponse = gson.toJson(incidents);

            // Send the JSON response to the client
            PrintWriter out = response.getWriter();
            out.print(jsonResponse);
            out.flush();
        } catch (SQLException | ClassNotFoundException e) {
            // Handle any errors
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\": \"Error retrieving incidents: " + e.getMessage() + "\"}");
        }
    }
}
