# soni.dev portfolio
## Frontend
    npm install
    npm run dev          # http://localhost:5173
## Contact form (Nodemailer) - run in a second terminal
    cd server && npm install
    cp .env.example .env     # add your Gmail App Password
    npm start                # http://localhost:5000
Mail is delivered to sourabh876007@gmail.com. In production deploy `server/` (Render/Railway),
set CLIENT_ORIGIN to your site URL, and set VITE_API_URL to the server URL when building the frontend.
## Content
Edit src/data.js. The All Projects page also auto-loads your public GitHub repos (non-forks, most starred first).
