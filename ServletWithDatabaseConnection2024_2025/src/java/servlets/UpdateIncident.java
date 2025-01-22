/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package servlets;

import database.DB_Connection;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author akaka
 */
public class UpdateIncident extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            // Get parameters from the request
            String incidentId = request.getParameter("incident_id");
            String status = request.getParameter("status");

            // Validate inputs
            if (incidentId == null || status == null
                    || (!status.equals("fake") && !status.equals("running") && !status.equals("finished"))) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"Invalid incident_id or status\"}");
                return;
            }

            // Call helper method to update the database
            boolean success = updateIncidentStatus(incidentId, status);

            if (success) {
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().write("{\"message\": \"Incident status updated successfully\"}");
            } else {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                response.getWriter().write("{\"error\": \"Incident not found\"}");
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\": \"Server error: " + e.getMessage() + "\"}");
        }
    }

    private boolean updateIncidentStatus(String incidentId, String status) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        PreparedStatement pstmt = null;

        try {
            String query = "UPDATE incidents SET status = ?";
            if (status.equals("finished")) {
                query += ", end_datetime = ?";
            }
            query += " WHERE incident_id = ?";

            pstmt = con.prepareStatement(query);
            pstmt.setString(1, status);

            if (status.equals("finished")) {
                pstmt.setTimestamp(2, new Timestamp(System.currentTimeMillis()));
                pstmt.setString(3, incidentId);
            } else {
                pstmt.setString(2, incidentId);
            }

            int rowsUpdated = pstmt.executeUpdate();
            return rowsUpdated > 0; // Return true if the update was successful
        } finally {
            if (pstmt != null) {
                pstmt.close();
            }
            con.close();
        }
    }

}
