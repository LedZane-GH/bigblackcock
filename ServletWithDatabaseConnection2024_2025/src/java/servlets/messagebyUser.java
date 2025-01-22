package servlets;

import database.tables.EditMessagesTable;

import javax.servlet.ServletException;
import javax.servlet.http.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

public class messagebyUser extends HttpServlet {

    // Override the doPost method to handle the message registration
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Set response content type to JSON
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Read the incoming JSON request body
        StringBuilder jsonData = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;
        while ((line = reader.readLine()) != null) {
            jsonData.append(line);
        }

        // Convert the JSON to Message object
        EditMessagesTable editMessagesTable = new EditMessagesTable();
        try {
            editMessagesTable.addMessageFromJSON(jsonData.toString());  // Add message to DB

            // Respond back with success message in JSON
            response.setStatus(HttpServletResponse.SC_OK);
            PrintWriter out = response.getWriter();
            out.print("{\"status\":\"success\", \"message\":\"Message successfully registered.\"}");
            out.flush();

        } catch (Exception e) {
            // Handle error (e.g., invalid JSON or database issue)
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            PrintWriter out = response.getWriter();
            out.print("{\"status\":\"error\", \"message\":\"Failed to register message: " + e.getMessage() + "\"}");
            out.flush();
            e.printStackTrace();
        }
    }
}
