# How to Create Admin User After Deployment

After deploying your backend to Render.com, you need to create an admin user to access the admin dashboard. Here are several methods:

## Method 1: Using Render Shell (Recommended)

1. **Go to your Render Dashboard**
   - Navigate to your backend service on Render.com

2. **Open the Shell/Console**
   - Click on your service
   - Look for "Shell" or "Console" option in the sidebar
   - If available, click it to open a shell session

3. **Run the create_admin script**
   ```bash
   python -m scripts.create_admin <your_phone_number>
   ```
   
   Example:
   ```bash
   python -m scripts.create_admin +1234567890
   ```

## Method 2: Using Render One-Off Command (If Shell Not Available)

1. **Go to your Render Dashboard**
   - Navigate to your backend service

2. **Create a One-Off Command**
   - Some Render services allow running one-off commands
   - Check if there's a "Run Command" or "One-Off" option

3. **Run the script**
   ```bash
   python -m scripts.create_admin <your_phone_number>
   ```

## Method 3: Direct Database Access (Alternative)

If you can't run scripts, you can directly update the database:

1. **Get Database Connection String**
   - In Render Dashboard, go to your PostgreSQL database
   - Copy the "Internal Database URL" or "Connection String"

2. **Connect to Database**
   - Use any PostgreSQL client (pgAdmin, DBeaver, psql, etc.)
   - Connect using the connection string

3. **Create Admin User via SQL**
   ```sql
   -- First, create a regular user (or find existing one by phone number)
   INSERT INTO users (phone_number, language, is_admin, created_at, updated_at)
   VALUES ('+1234567890', 'en', true, NOW(), NOW())
   ON CONFLICT (phone_number) 
   DO UPDATE SET is_admin = true;
   ```

   Or, if the user already exists:
   ```sql
   UPDATE users 
   SET is_admin = true 
   WHERE phone_number = '+1234567890';
   ```

## Method 4: Using Render's API or Web Interface

Some Render services allow running commands through their API or web interface. Check Render's documentation for your specific service type.

## Method 5: Add a Temporary Admin Creation Endpoint (Development Only)

⚠️ **Warning: Only use this for initial setup, then remove it!**

You can temporarily add an endpoint to create admin users:

1. Add this to `routers/auth.py` temporarily:
   ```python
   @router.post("/create-admin-temp")
   async def create_admin_temp(
       phone_number: str,
       db: Session = Depends(get_db)
   ):
       """TEMPORARY: Create admin user. REMOVE AFTER USE!"""
       user = db.exec(select(User).where(User.phone_number == phone_number)).first()
       if not user:
           user = User(phone_number=phone_number, is_admin=True, language="en")
           db.add(user)
       else:
           user.is_admin = True
       db.commit()
       db.refresh(user)
       return {"message": "Admin created", "user": user}
   ```

2. Call this endpoint once via Postman or curl:
   ```bash
   curl -X POST "https://your-render-app.onrender.com/api/v1/auth/create-admin-temp?phone_number=+1234567890"
   ```

3. **IMPORTANT: Remove this endpoint immediately after creating your admin!**

## Notes

- Replace `+1234567890` with your actual phone number (include country code)
- Phone numbers should be in E.164 format (e.g., +1234567890)
- After creating the admin user, you can log in through your frontend using the phone number
- The app uses phone number authentication (likely with OTP), so no password is needed

## Verify Admin Creation

After creating the admin user, you can verify by:

1. Logging into your frontend with the admin phone number
2. Navigating to `/admin` - you should have access to the admin dashboard
3. Or check via API: `GET /api/v1/users/me` (requires authentication) - should show `"is_admin": true`

