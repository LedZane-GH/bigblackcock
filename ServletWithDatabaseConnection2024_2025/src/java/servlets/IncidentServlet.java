package servlets;

import database.tables.EditIncidentsTable;
import mainClasses.Incident;
import com.google.gson.Gson;
import java.io.BufferedReader;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;

public class IncidentServlet extends HttpServlet {

    private final Gson gson = new Gson();
    private final EditIncidentsTable editIncidentsTable = new EditIncidentsTable();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            // Default values for filters
            String type = request.getParameter("type") != null ? request.getParameter("type") : "all";
            String status = "running"; // Only running incidents

            // Retrieve incidents matching criteria
            ArrayList<Incident> incidents = editIncidentsTable.databaseToIncidentsSearchForCrete(type, status);

            // Convert incidents list to JSON
            String jsonResponse = gson.toJson(incidents);

            // Set response type and send data
            response.setContentType("application/json");
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write(jsonResponse);

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        try {
            // Read the input JSON
            BufferedReader reader = request.getReader();
            StringBuilder jsonBuilder = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                jsonBuilder.append(line);
            }
            String jsonInput = jsonBuilder.toString();

            // Parse the JSON into an Incident object
            Incident incident = gson.fromJson(jsonInput, Incident.class);

            // Add the incident to the database
            editIncidentsTable.createNewIncident(incident);

            // Return success response
            response.setStatus(HttpServletResponse.SC_OK);
            out.println("{\"message\":\"Incident registered successfully\"}");
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.println("{\"error\":\"Failed to register incident: " + e.getMessage() + "\"}");
        }
    }



    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            String id = request.getParameter("id");
            if (id == null || id.isEmpty()) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\":\"Incident ID is required for update\"}");
                return;
            }

            String json = request.getReader().lines().reduce("", (accumulator, actual) -> accumulator + actual);
            HashMap<String, String> updates = gson.fromJson(json, HashMap.class);

            editIncidentsTable.updateIncident(id, updates);

            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("{\"message\":\"Incident updated successfully\"}");

        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }

    @Override

    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        try {
            String id = request.getParameter("id");
            if (id == null || id.isEmpty()) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\":\"Incident ID is required for deletion\"}");
                return;
            }

            editIncidentsTable.deleteIncident(id);

            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("{\"message\":\"Incident deleted successfully\"}");

        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }


}
