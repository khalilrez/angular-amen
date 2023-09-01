# Amennet

Amennet is an Angular web application designed for managing bank accounts and providing a chatbot service. The application has two types of users: Admin and Client. Admins can manage users and their bank accounts, while Clients can modify their account descriptions, make transfers, and access a chatbot.

## Features

- **Admin Panel**: Admins have access to a panel where they can manage users and their bank accounts.

- **Client Dashboard**: Clients can modify their account descriptions, make transfers between their accounts, or to another user's account. They can also access a chatbot for answering their questions.

- **Authentication**: Users are required to log in with a valid username and password to access the application.

---

## Prerequisites

Before you can run the Amennet Angular application, you need to set up the backend server called "node-express-amen." Here are the prerequisites:

- **Install Node.js and npm:** Ensure that you have Node.js and npm (Node Package Manager) installed on your system. You can download and install them from the official Node.js website: [https://nodejs.org/](https://nodejs.org/)

- **Clone the "node-express-amen" Repository:**

  1. Clone the "node-express-amen" repository using the following command:
     ```
     git clone https://github.com/khalilrez/node-express-amen.git
     ```

  2. Navigate to the backend directory:
     ```
     cd node-express-amen
     ```

- **Install Backend Dependencies:**

  Install the required Node.js packages and dependencies by running the following command:
     ```
     npm install
     ```

- **Configure Backend:**

  Configure the backend server according to your needs. You will need to set up a MySQL database.

- **Start the Backend Server:**

  Start the backend server using the following command:
     ```
     npm start
     ```

  The backend server should now be running and accessible at `http://localhost:8080`.

---

## Getting Started

Follow these steps to get the project up and running on your local machine:

1. Clone the repository:

   ```bash
   git clone https://github.com/khalilrez/angular-amen.git
   ```

2. Navigate to the project directory:

   ```bash
   cd angular-amen
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   ng serve -o
   ```

5. Open your web browser and access the application at `http://localhost:4200`.

## Usage

### Admin Access

- Username: `admin`
- Password: `123456`

### Client Access

- Username: `user[1,2,3,4,5,6,7,8,9,10]`
- Password: `123456`

## Contributing

We welcome contributions from the community. If you'd like to contribute to the project, please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Special thanks to the Angular community for their support and contributions.

## Contact

If you have any questions or issues, please feel free to contact me at khalilrezgui0@gmail.com.
