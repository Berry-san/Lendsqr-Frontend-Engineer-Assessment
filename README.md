Dashboard Application with Login, User Table, Filter, and User Details Page
Overview
This project is a simple dashboard application built with login functionality, a user table that includes a filter feature, and user detail pages. It is styled using Tailwind CSS for efficiency and maintainability.

Features:
Login Page: Basic login functionality to authenticate users before accessing the dashboard.
Dashboard Page: Displays a table of users fetched from an API or mock data.
Filter Functionality: Allows users to search and filter the user table in real-time based on user attributes (e.g., name or email).
User Details Page: Clicking on a username in the table leads to a detailed page displaying specific user information.
Tech Stack
Frontend: HTML, JavaScript, and Tailwind CSS.
Styling: Tailwind CSS (Utility-first framework).
Routing: Vanilla JavaScript for navigation between pages.
Data Handling: Mock API or pre-loaded data for user information.
Authentication: Simple form-based authentication (front-end validation).

git clone https://github.com/Berry-san/Lendsqr-Frontend-Engineer-Assessment.git
Navigate into the project directory:

cd dashboard-app
Install dependencies:

This project assumes you have a basic static setup, so no additional package installation is required. However, if you're using Node.js, you can initialize a package.json and install any necessary dependencies as needed.
Run the project:

npm stsrt

Usage
Login: Users need to log in before accessing the dashboard. Any simple form validation can be configured in login.js.

Dashboard: The dashboard contains a user table. Users can click on the username to view detailed information. A filter feature is available at the top of the table to search for users.

Filter Functionality: The filter input dynamically updates the user list based on the search term. You can modify the filter logic in dashboard.js to include more advanced filtering criteria.

Key Considerations
Styling: Tailwind CSS is used for styling. If you're unfamiliar with Tailwind, check out their official documentation for details on how to customize and extend the existing classes.

Modifications: Feel free to extend or modify the routing and filtering logic to suit larger datasets or more complex filtering criteria.

Authentication: For this demo, the login logic is simple and client-side based. In production, proper server-side authentication and validation should be added.

Contribution
Contributions are welcome! If you'd like to make changes, please fork the repository and submit a pull request with a clear description of your changes.

Fork the repository.
Create your feature branch: git checkout -b feature/new-feature
Commit your changes: git commit -m 'Add some new feature'
Push to the branch: git push origin feature/new-feature
Submit a pull request.
