# GebeyaAlert - Agricultural Price Alert System

A full-stack web application that helps farmers track crop prices across different markets and receive alerts when prices reach their target goals.

## Features

- 🔐 **User Authentication**: JWT-based authentication with phone number registration
- 📊 **Real-time Price Tracking**: View current market prices for various crops
- 🔔 **Price Alerts**: Set custom price alerts and receive SMS notifications
- 📈 **Price History**: View historical price trends with interactive charts
- 🌍 **Multi-language Support**: English and Amharic interface
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

## Deployment

### Free Deployment Options

This application can be deployed for free using the following platforms:

#### Option 1: Railway (Recommended - Easiest)

**Backend Deployment:**
1. Sign up at [Railway.app](https://railway.app) (free tier available)
2. Create a new project
3. Click "New" → "GitHub Repo" and connect your repository
4. Add a PostgreSQL database service
5. Set environment variables in the "Variables" tab:
   - `DATABASE_URL` (will be auto-set if you add PostgreSQL service)
   - `SECRET_KEY` (generate a random string)
   - `ENVIRONMENT=production`
   - `DEBUG=False`
   - `FRONTEND_URL=https://your-frontend-url.vercel.app`
   - Add Twilio credentials if using SMS
6. Railway will automatically detect it's a Python app and deploy

**Frontend Deployment (Vercel):**
1. Sign up at [Vercel.com](https://vercel.com) (free tier available)
2. Import your GitHub repository
3. Set root directory to `frontend`
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL=https://your-railway-backend.up.railway.app`
5. Deploy

**Cost:** Free for hobby projects (limited hours)

#### Option 2: Render

**Backend Deployment:**
1. Sign up at [Render.com](https://render.com) (free tier available)
2. Create a new "Web Service"
3. Connect your GitHub repository
4. Set build command: `pip install -r requirements.txt`
5. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add a PostgreSQL database (free tier available)
7. Set environment variables
8. Deploy

**Frontend Deployment:**
1. Create a new "Static Site" on Render
2. Connect repository, set root directory to `frontend`
3. Build command: `cd frontend && npm install && npm run build`
4. Publish directory: `frontend/.next`
5. Add environment variable: `NEXT_PUBLIC_API_URL`

**Note:** Render free tier spins down after inactivity (takes ~30s to wake up)

#### Option 3: Fly.io

1. Sign up at [Fly.io](https://fly.io)
2. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
3. Run `fly launch` in project root
4. Add PostgreSQL: `fly postgres create`
5. Set secrets: `fly secrets set SECRET_KEY=...`
6. Deploy: `fly deploy`

**Cost:** Free tier includes 3 VMs

#### Option 4: PythonAnywhere (Backend only)

1. Sign up at [PythonAnywhere.com](https://www.pythonanywhere.com) (free tier available)
2. Upload your code via Git or file upload
3. Create a new web app
4. Configure virtual environment and dependencies
5. Set up PostgreSQL or use MySQL (included)
6. Configure environment variables
7. Point frontend to PythonAnywhere URL

**Limitations:** Free tier requires manual restarts daily

### Environment Variables for Production

Make sure to set these environment variables in your hosting platform:

**Backend (.env):**
```env
DATABASE_URL=postgresql://user:password@host:5432/dbname
SECRET_KEY=<generate-a-strong-random-key>
ENVIRONMENT=production
DEBUG=False
FRONTEND_URL=https://your-frontend-domain.com
TWILIO_ACCOUNT_SID=<your-twilio-sid>
TWILIO_AUTH_TOKEN=<your-twilio-token>
TWILIO_PHONE_NUMBER=<your-twilio-number>
SMS_ENABLED=True
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

### Generating SECRET_KEY

Generate a secure secret key:
```bash
# Python
python -c "import secrets; print(secrets.token_urlsafe(32))"

# OpenSSL
openssl rand -hex 32
```

## Running Background Tasks (Celery)

For production, you'll want to run Celery workers to process price alerts:

```bash
# Start Celery worker
celery -A celery_app worker --loglevel=info

# Start Celery beat scheduler (for scheduled tasks)
celery -A celery_app beat --loglevel=info
```

On most platforms, you can run these as separate services or use process managers like Supervisor.

## Database Migrations

To create a new migration:
```bash
alembic revision --autogenerate -m "description"
```

To apply migrations:
```bash
alembic upgrade head
```

## API Documentation

Once the backend is running, visit:
- **Swagger UI**: `http://localhost:8080/docs`
- **ReDoc**: `http://localhost:8080/redoc`

## Testing

```bash
# Backend (if tests are added)
pytest

# Frontend
cd frontend
npm test
```

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

