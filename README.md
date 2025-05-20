# E-commercefruit

A full-stack e-commerce application for buying fresh fruits and vegetables.

## Features

This application includes the following key features:

*   **User Authentication:** Secure Login, Signup, and Forgot Password functionality.
*   **Admin Panel:** A dedicated interface for staff members to manage product inventory, including adding, viewing, editing, and deleting products (CRUD operations).
*   **Product Catalog:** Browse available fruits and vegetables on the Shop page, with filtering options (Category, Organic, Seasonal, New Arrivals).
*   **Shopping Cart:** Add, update quantities, and remove items from the shopping cart.
*   **Checkout & Payments:** Integrated payment processing using Stripe for secure online transactions.
*   **Order History:** Users can view their past orders.
*   **User Profile:** (Implicit from auth, can be expanded)
*   **Theme Toggle:** Switch between light and dark themes.
*   **Informational Pages:** About Us and Contact pages.

## Technologies Used

*   **Frontend:** React, Zustand (for state management), React Router, Tailwind CSS
*   **Backend:** Node.js, Express.js, MongoDB (with Mongoose), JSON Web Tokens (JWT) for authentication, bcryptjs (for password hashing), Stripe (for payments), dotenv

## Screenshots
*  **HomePage:**  ![Screenshot 2025-05-20 212059](https://github.com/user-attachments/assets/d6e226b2-783a-4c82-b0f5-c85815c8f97c)

*  **ShopPage:**   ![Screenshot 2025-05-20 212115](https://github.com/user-attachments/assets/9a02fe1d-d612-4f94-8ad1-25ec47d8696d)

*  **About:**   ![Screenshot 2025-05-20 212136](https://github.com/user-attachments/assets/771f7b2f-d1fe-4966-a9e0-529760c7dbdd)

*  **Contact:**  ![Screenshot 2025-05-20 212158](https://github.com/user-attachments/assets/d51f9ff4-8c1c-4ea0-9f1a-b36610a49b0c)

*  **Checkout:**  ![Screenshot 2025-05-20 212535](https://github.com/user-attachments/assets/7d70d345-de6d-439c-8311-62aca89f9455)

*  **AdminPanel:** ![Screenshot 2025-05-20 212515](https://github.com/user-attachments/assets/f9fb8112-e1ed-4b66-b9f7-d87eafa0c78c)

## Setup and Installation
Follow these steps to set up and run the project locally:

1.  **Clone the Repository:**
    ```bash
    # You already have the files, so you can skip this step if you cloned previously
    # git clone <repository_url>
    # cd E-commercefruit
    ```

2.  **Install Dependencies:**
    Navigate to both the `client` and `server` directories and install the required packages.
    ```bash
    cd client
    npm install
    cd ../server
    npm install
    cd .. # Go back to the project root
    ```
    *(Alternatively, you might use `yarn install` if you prefer yarn)*

3.  **Environment Variables:**
    Create `.env` files in both the `client` and `server` directories based on the provided `.env.example` (if available) or the requirements of the backend code. You will need to configure:
    *   MongoDB connection URI (`MONGO_URI` in `server/.env`)
    *   JWT Secret (`JWT_SECRET` in `server/.env`)
    *   Stripe Publishable Key (`REACT_APP_STRIPE_PUBLIC_KEY` in `client/.env`)
    *   Stripe Secret Key (`STRIPE_SECRET_KEY` in `server/.env`)
    *   Any other necessary variables (e.g., port numbers).

4.  **Run the Application:**
    Open two separate terminal instances. In one, navigate to the `server` directory and start the backend:
    ```bash
    cd server
    npm start # Or node index.js / npm run dev if you have a dev script
    ```
    In the second terminal, navigate to the `client` directory and start the frontend:
    ```bash
    cd client
    npm start # Or yarn start
    ```

5.  Open your web browser and visit `http://localhost:3000` (or the port your client is running on).

## Admin Access

To access the Admin Panel (`/admin` route), you need a user account with the 'Staff' role. You can create one by signing up through the application's signup form after temporarily enabling the role selection, or by making a direct POST request to the `/api/auth/signup` endpoint with `role: 'Staff'` in the request body.

