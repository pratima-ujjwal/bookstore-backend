# 📚 Bookstore Backend

Production-ready Node.js + Express backend with OTP-based signup, JWT authentication, and Supabase + SMTP integration for a regional bookstore platform (India + Global).

---

## 🚀 Features

- ✅ Email OTP Signup with region-aware SMTP
- ✅ JWT-based Login (email + password)
- ✅ Forgot & Reset Password via OTP
- ✅ Change Password (JWT-protected)
- ✅ Role-based structure (admin/manager/customer ready)
- ✅ Supabase multi-region DB support (India & Global)
- ✅ Modular, scalable architecture

---

## 📦 Tech Stack

- Node.js + Express
- Supabase (PostgreSQL)
- Nodemailer (SMTP)
- JWT Authentication
- TypeScript

---

## 🔧 Environment Variables

Create a `.env` file based on `.env.sample`:

```env
# App
PORT=4000
JWT_SECRET=your-secret
JWT_EXPIRY=1d

# India SMTP
SMTP_INDIA_HOST=
SMTP_INDIA_USER=
...

# Global SMTP
SMTP_GLOBAL_HOST=
SMTP_GLOBAL_USER=
...

# Supabase
SUPABASE_INDIA_URL=
SUPABASE_INDIA_SERVICE_ROLE_KEY=
SUPABASE_GLOBAL_URL=
SUPABASE_GLOBAL_SERVICE_ROLE_KEY=
```

---

## 🔌 API Endpoints

### 👤 Auth

#### `POST /api/auth/send-otp`
Send OTP to user email
```json
{
  "email": "user@example.com",
  "region": "india"
}
```

#### `POST /api/auth/verify-otp`
Verify OTP and create account
```json
{
  "email": "user@example.com",
  "otp": "123456",
  "password": "securePass",
  "region": "india",
  "first_name": "John",
  "last_name": "Doe"
}
```

#### `POST /api/auth/login`
Login with email + password
```json
{
  "email": "user@example.com",
  "password": "securePass",
  "region": "india"
}
```

---

### 🔐 Password Management

#### `POST /api/auth/forgot-password`
Send OTP to reset password
```json
{
  "email": "user@example.com",
  "region": "india"
}
```

#### `POST /api/auth/reset-password`
Reset password using OTP
```json
{
  "email": "user@example.com",
  "region": "india",
  "otp": "123456",
  "newPassword": "NewSecretPass"
}
```

#### `POST /api/auth/change-password` (JWT required)
Change password for logged-in user
```json
{
  "currentPassword": "oldPass",
  "newPassword": "newPass",
  "region": "india"
}
```

Headers:
```http
Authorization: Bearer <token>
```

---

## 🛠 Run Locally

```bash
npm install
cp .env.sample .env  # fill in your values
npm run dev
```

---

## 📘 Folder Structure

```
src/
├── controllers/
├── routes/
├── services/
├── utils/
├── middleware/
```

---

## 📜 License

MIT