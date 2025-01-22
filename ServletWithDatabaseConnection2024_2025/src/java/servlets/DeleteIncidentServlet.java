package servlets;

import database.tables.EditIncidentsTable;
import java.io.IOException;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "DeleteIncidentServlet", urlPatterns = {"/DeleteIncidentServlet"})
public class DeleteIncidentServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Get the incident ID from the request
        String id = request.getParameter("id");
        if (id == null || id.isEmpty()) {
            // Respond with an error if ID is missing
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\":\"Incident ID is required\"}");
            return;
        }

        try {
            // Use EditIncidentsTable to delete the incident
            EditIncidentsTable eit = new EditIncidentsTable();
            eit.deleteIncident(id);

            // Respond with success
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("{\"message\":\"Incident deleted successfully\"}");
        } catch (SQLException | ClassNotFoundException ex) {
            // Log and respond with an error
            ex.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\":\"Failed to delete incident: " + ex.getMessage() + "\"}");
        }
    }
}
