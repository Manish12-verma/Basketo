#  Basketo

Basketo is a modern e-commerce web application for buyers and sellers, built with the MERN stack. It features user authentication, product management, cart, orders, and a seller dashboard.

---

##  Live Demo

[View Basketo Live](https://basketo-frontend.vercel.app/)

---

##  Screenshots

<!-- Add your screenshots below -->
[Basketo](./Client/public/basketo.png)
[Seller Dashboard](./Client/public/seller_dashboard.png)
---

##  Technologies Used

**Frontend:**
- React 19
- React Router DOM 7
- Tailwind CSS 4
- React Hot Toast
- Axios

**Backend:**
- Node.js
- Express 5
- MongoDB & Mongoose 8
- Cloudinary (image uploads)
- JWT (authentication)
- Multer (file uploads)
- CORS, dotenv, cookie-parser, bcrypt

---

##  Installation

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)
- Cloudinary account (for image uploads)
- Stripe account (for payments)

### 1. Clone the repository

```sh
git clone https://github.com/yourusername/basketo.git
cd basketo
```

### 2. Setup Server

```sh
cd Server
cp .env.example .env   # Create your .env file with MongoDB, Cloudinary, Stripe keys
npm install
npm run server         # Starts backend with nodemon
```

### 3. Setup Client

```sh
cd ../Client
npm install
npm run dev            # Starts frontend at http://localhost:5173
```

---

##  Environment Variables

### Backend (`Server/.env`)

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=development

# Seller Credentials
SELLER_EMAIL=admin@example.com
SELLER_PASSWORD=admin123

# Cloudinary credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

PORT=3000
```

### Frontend (`Client/.env`)

```env
VITE_CURRENCY="₹"
VITE_BACKEND_URL="http://localhost:3000/"
```

---

##  Contribution

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

##  License

This project is licensed under the MIT License.

---

##  Contact

For issues, suggestions, or contributions, please open an issue or contact [manish120903@gmail.com].

---

**Happy Coding!**