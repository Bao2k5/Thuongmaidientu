# Thuongmaidientu (Backend)

Node.js + Express backend for an e-commerce demo.

Quick start

1. Copy `.env.example` to `.env` and fill values (especially `MONGO_URI` and `JWT_SECRET`).
2. Install dependencies: `npm install`.
3. Run the seed script to create a demo admin and some data: `npm run seed`.
4. Start server: `npm run dev` (requires `nodemon`) or `npm start`.

Notes
- If SMTP env vars are set, the app will send emails for password reset and verify; otherwise controllers return the token in the JSON response for testing.
- Routes are mounted under `/api` (e.g. `/api/auth/register`).

Gmail setup (use App Password)
1. Enable 2-Step Verification on your Google account.
2. Create an App Password (select "Mail" and the device "Other"), copy the 16-character password.
3. Fill `.env` with Gmail SMTP values:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your.email@gmail.com
SMTP_PASS=your_app_password_here
EMAIL_FROM="Your Shop <your.email@gmail.com>"
```

4. Restart the server. You can test sending a mail as admin via Postman:

- Login as admin -> get token
- POST /api/admin/send-test-email (header Authorization: Bearer <token>)
	body JSON: { "to": "recipient@example.com", "subject": "Hello", "text": "Test" }

If SMTP isn't configured or the mail fails, the controllers return helpful messages (or tokens for reset flows) so you can continue testing.

Stripe setup (optional)
1. Create a Stripe account and get your Secret Key (STRIPE_SECRET) from the Dashboard.
2. (For webhook) create a webhook endpoint in Stripe pointing to `https://your-server.com/api/orders/webhook` and copy the webhook secret.
3. Add to `.env`:

```
STRIPE_SECRET=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Notes: The webhook route uses a raw body parser; if you run behind a proxy or use body-parsing middleware, make sure the raw body is available to the route (Express `express.raw()` is used at the route level).

Cloudinary setup (optional)
1. Create a Cloudinary account and get your cloud name, API key, and API secret.
2. Add them to `.env` using the variable names shown in `.env.example`.
3. Use the admin product image endpoints to upload/delete images:
	- POST /api/admin/products/:id/images (form-data field `file`)
	- DELETE /api/admin/products/:id/images  body: { "publicId": "..." }

	Postman & smoke test
	- Use `postman_collection.json` in the repo to import basic requests.
	- Run quick smoke test (requires `node-fetch`):

	```
	npm install node-fetch@2
	node scripts/smoke_test.js
	```
