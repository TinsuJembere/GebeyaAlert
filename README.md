# GebeyaAlert - Agricultural Price Alert System

A full-stack web application that helps farmers track crop prices across different markets and receive alerts when prices reach their target goals.

## Features

- 🔐 **User Authentication**: JWT-based authentication with phone number registration
- 📊 **Real-time Price Tracking**: View current market prices for various crops
- 🔔 **Price Alerts**: Set custom price alerts and receive SMS notifications
- 📈 **Price History**: View historical price trends with interactive charts
- 🌍 **Multi-language Support**: English, Amharic, Afan Oromo and Tigrigna interface
- 👨‍💼 **Admin Dashboard**: Manage crops, markets, prices, and users
- 📱 **Mobile-First Design**: Responsive design optimized for mobile devices
- 💬 **SMS Notifications**: Get notified via SMS when alerts trigger or prices change significantly

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLModel** - SQL database ORM
- **PostgreSQL** - Production database
- **SQLite** - Development database
- **Celery + Redis** - Background task processing
- **Twilio** - SMS notification service
- **JWT** - Authentication tokens

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Recharts** - Chart visualization

## Project Structure

```
.
├── alembic/              # Database migrations
├── frontend/             # Next.js frontend application
│   ├── src/
│   │   ├── app/         # Next.js pages and routes
│   │   ├── components/  # React components
│   │   ├── contexts/    # React contexts (Auth, Language)
│   │   └── lib/         # API clients and utilities
│   └── package.json
├── models/               # SQLModel database models
├── routers/              # FastAPI route handlers
├── schemas/              # Pydantic validation schemas
├── services/             # Business logic services
├── scripts/              # Utility scripts (seeding, migration)
├── utils/                # Helper utilities
├── main.py              # FastAPI application entry point
├── config.py            # Configuration settings
├── requirements.txt     # Python dependencies
└── README.md           # This file
```

## Getting Started

### Prerequisites

- **Python 3.9+**
- **Node.js 18+**
- **PostgreSQL** (for production) or SQLite (for development)
- **Redis** (optional, for Celery tasks)
- **Twilio Account** (optional, for SMS notifications)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "farmer alert - Copy"
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # Linux/Mac
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   
   Copy `env.example` to `.env` and update the values:
   ```bash
   # Windows
   copy env.example .env
   
   # Linux/Mac
   cp env.example .env
   ```
   
   Then edit `.env` with your configuration (see `env.example` for all available options):
   ```env
   # Database (SQLite for development)
   DATABASE_URL=sqlite:///./gebeyaalert.db
   
   # JWT Secret (generate: python -c "import secrets; print(secrets.token_urlsafe(32))")
   SECRET_KEY=your-secret-key-here-change-this-in-production
   
   # Application
   ENVIRONMENT=development
   DEBUG=True
   FRONTEND_URL=http://localhost:3000
   ```

5. **Initialize the database**
   ```bash
   # The database will be created automatically on first run
   python main.py
   ```

6. **Create an admin user (optional)**
   ```bash
   python scripts/create_admin.py
   ```

7. **Run the development server**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8080
   ```

   The API will be available at `http://localhost:8080`
   API documentation at `http://localhost:8080/docs`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `env.example` to `.env.local`:
   ```bash
   # Windows
   copy env.example .env.local
   
   # Linux/Mac
   cp env.example .env.local
   ```
   
   Then edit `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For issues and questions:
- Open an issue on GitHub
- Check the API documentation at `/docs`

## Roadmap

- [ ] Email notifications in addition to SMS
- [ ] Mobile app (React Native)
- [ ] Price predictions using ML
- [ ] Weather integration
- [ ] Market comparison charts
- [ ] Export data to CSV/Excel

---

Made with ❤️ for farmers

