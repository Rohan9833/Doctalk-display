# DocTalk Microsite — Responsive MERN + Tailwind

Responsive marketing microsite for **DocTalk**, **DocTalk Quiz**, and **DocTalk Show**. Design is based on the screenshots provided in this conversation, using the original navy, gold, white, rounded-card, physician-video visual treatment.

## Stack

- **Frontend:** React 18 + Vite + Tailwind CSS 3 + Lucide icons
- **Backend:** Node.js + Express + MongoDB (Mongoose)
- **Functional lead form:** POST `/api/enquiries` persists enquiries to MongoDB (validation, rate limiting, honeypot)
- **Layouts:** responsive mobile, tablet, laptop, desktop; collapsible mobile navigation

## Getting started

Requires **Node.js 18+** and a running **MongoDB** instance (local or MongoDB Atlas).

### 1. Backend

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

Set `MONGODB_URI` in `.env`. When using MongoDB Atlas, use the Atlas connection string and configure network access. API defaults to `http://localhost:5000`.

### 2. Frontend (separate terminal)

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Open `http://localhost:5173`.

### Production build

```bash
cd client && npm run build
```

Deploy the compiled `client/dist` on a static hosting platform and the Express `server` as a Node service. Set `VITE_API_URL` **at build time** to the publicly deployed API URL, `CLIENT_ORIGIN` to the website origin and `MONGODB_URI` to production MongoDB. Use HTTPS, server-side origin restrictions, secret management and privacy/retention controls before processing real personal data. `server/src/routes/enquiries.js` is a public lead-submission endpoint; **no admin portal or read-enquiry endpoint is included**.

## Video assets

Uploaded screenshots contained **video thumbnail stills**, not playable MP4 files. All supplied image thumbnails are included under `client/public/images/` and used in the UI. Video previews display an honest placeholder message until you set the `video` field for each entry in `client/src/content.js` to an approved MP4 URL (for example `/videos/sample.mp4` if you place that file under `client/public/videos/`). Use only consented/licensed doctor imagery and approved medical content.

## Image asset provenance

The images in `client/public/images` were **cropped from the reference screenshots**, retaining the visual choices supplied by the user. They are not separately supplied high-resolution originals. There may be baked-in play overlays, labels and screenshot artifacts. Replace with original logos and source stills for final production sharpness. The site is **not** marketed as independently certified compliant; tailor medical copy and consent flows to applicable requirements.

## Site sections

1. Sticky navigation and video-led hero
2. Four benefits: No Shoot, One Photo, Any Language, Doctor Consent
3. DocTalk product family with three product cards and sample preview modal
4. Video distribution points and stakeholder benefits
5. Photo-to-video workflow
6. Consent explainer with illustrative consent panel
7. Request a Demo form with MongoDB persistence
8. Footer

## Enquiry API

`POST /api/enquiries` JSON body:

```json
{
  "name": "Example Contact",
  "email": "contact@example.com",
  "phone": "+91 9000000000",
  "company": "Example Pharma",
  "product": "DocTalk Quiz",
  "message": "Interested in a demonstration",
  "website": ""
}
```

`GET /api/health` checks API and MongoDB connection state.

## Editing content/colors

- Product text / assets / video files: `client/src/content.js`
- Sections, form and interactions: `client/src/App.jsx`
- Theme colors: `client/tailwind.config.js`
- Global styles: `client/src/index.css`
- Logo and images: `client/public/images/`

## Important limitations

- This is a fully structured development starter with lead capture, **not** a deployed website.
- An active MongoDB connection is required for the API and form to persist enquiries.
- Real sample videos, final product logos and other full-resolution creative assets must be inserted before launch.
- Consent card is a *visual explainer*, not a consent collection/signature system.
- The site does not implement user logins, dashboards, video synthesis, analytics collection, doctor onboarding or a CMS. Those are separate product features.
