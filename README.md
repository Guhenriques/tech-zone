
# E-Commerce MERN App
Tech Zone is a user-friendly ecommerce website application that allows customers to purchase products with ease. Users can create accounts, log in securely, access their shopping carts and proceed to checkout.


## Features

- User authentication: Users can sign up, log in, and log out to access their accounts and make purchases.
- Product catalog: Users can view a list of available products. 
- Shopping cart: Users can add products to their shopping cart and proceed to checkout.
- Payment processing: The app integrates with Stripe to securely process payments.

## Advanced Features

- Visitors can add items to Cart even before registering.
- Items are kept after logged in or registering.

## Screenshots

![image](https://res.cloudinary.com/dvteazrgs/image/upload/v1689584561/e-commerce2_hkq37i.png)

![image](https://res.cloudinary.com/dvteazrgs/image/upload/v1689584561/e-commerce3_nihzsp.png)

![image](https://res.cloudinary.com/dvteazrgs/image/upload/v1689584620/e-commerce4_frcf0b.png)


## Future implementations 

- Customers will be able to see their orders.
- Product full details clickable.
- More products will be available soon.

## Technologies Used

- Javascript
- Node.js
- Express
- React
- Redux
- JWT
- BCrypt
- MondogDB
- Stripe 


## Installation
- Clone the repository:

```
bash
git clone https://github.com/Guhenriques/e-commerce.git
```

- Install the dependencies for the server:
```
cd e-commerce-MERN/server
npm install`
```

- Install the dependencies for the client:
```
cd ../e-commerce-MERN/client
npm install
```

# Set up environment variables:
Create a .env file in the server directory and provide the necessary configuration variables for the database and Stripe API keys
Run the application:
# Start the server
```
cd ../server
npx nodemon
```

# Start the client
```
cd ../client
npm run start
```

Open your browser and navigate to http://localhost:3000 to access the application.
