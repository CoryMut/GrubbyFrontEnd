This is the repository for the front-end of the Grubby the Grape website, currently hosted at https://grubbythegrape.com/

The purpose of the website was to create a place for the comics to be stored and shared! It is constantly being worked on, but it currently features an area to view the latest comic, react to the comics using supported emoji, a place to view and search for all the comics in the series, and the ability to save your favorites. Last but not least, you can make Grubby tell you an infinite number of dad jokes!

It was made using React and the major components have basic tests (more on this to come) using jest.

The comics can be viewed without an account. Basic users can make an account in order to react to the comic with an emoji and to save their favorites. Some routes are protected and require admin access. Admins can uploaded and edit comics.

## Deployment

The frontend is hosted on **Vercel** (free tier). The backend API is hosted on **Railway**.

### Environment Variables

Set the following environment variables in the Vercel project dashboard (Settings → Environment Variables):

| Variable                     | Value                                                    |
| ---------------------------- | -------------------------------------------------------- |
| `REACT_APP_SERVER_URL`       | `https://grubbybackend-production.up.railway.app`        |
| `REACT_APP_CDN`              | `https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com` |
| `REACT_APP_GOOGLE_CLIENT_ID` | `your-google-client-id.apps.googleusercontent.com`       |

> **Note:** `REACT_APP_*` variables are baked in at build time by Create React App, so they must be set in Vercel before deploying.

See `.env.example` for a reference of all required environment variables.

---

## Migration Guide: DigitalOcean App Platform → Vercel

### Overview

This guide covers migrating the frontend from DigitalOcean App Platform to Vercel (free tier) and updating the backend API URL to Railway.

---

### Step 1 — Create a Vercel Account

1. Go to [https://vercel.com](https://vercel.com) and sign up with your GitHub account.
2. This allows Vercel to access your repositories and set up automatic deployments.

---

### Step 2 — Import the Repository

1. From the Vercel dashboard, click **Add New → Project**.
2. Find and select the **GrubbyFrontEnd** repository.
3. Vercel will auto-detect it as a Create React App project.
4. Leave **Framework Preset** as `Create React App`.
5. Leave **Root Directory** as `./` (the repo root).
6. Leave **Build Command** as `npm run build` and **Output Directory** as `build` — these are already set in `vercel.json`.
7. **Do not deploy yet** — configure environment variables first (Step 3).

---

### Step 3 — Set Environment Variables

Before the first deploy, add the required environment variables:

1. In the project setup screen (or later via **Settings → Environment Variables**), add:

    | Variable                     | Value                                                    | Environments                     |
    | ---------------------------- | -------------------------------------------------------- | -------------------------------- |
    | `REACT_APP_SERVER_URL`       | `https://grubbybackend-production.up.railway.app`        | Production, Preview, Development |
    | `REACT_APP_CDN`              | `https://grubbythegrape.sfo2.cdn.digitaloceanspaces.com` | Production, Preview, Development |
    | `REACT_APP_GOOGLE_CLIENT_ID` | `your-google-client-id.apps.googleusercontent.com`       | Production, Preview, Development |

2. Click **Save** after adding each variable.

> **Important:** These variables are compiled into the JavaScript bundle at build time. If you change them later, you must trigger a new deployment for the change to take effect.

---

### Step 4 — Deploy

1. Click **Deploy**. Vercel will clone the repo, run `npm run build`, and publish the `build/` directory.
2. Once complete, Vercel will provide a `.vercel.app` preview URL. Test it to confirm the app loads and API calls reach Railway correctly.

---

### Step 5 — Connect Your Custom Domain

1. In the Vercel project, go to **Settings → Domains**.
2. Add `grubbythegrape.com` (and `www.grubbythegrape.com` if needed).
3. Vercel will display DNS records to add. In your DNS provider (e.g., Namecheap, Cloudflare, etc.):
    - For the **apex domain** (`grubbythegrape.com`): add an **A record** pointing to `76.76.21.21`, or use an **ALIAS/ANAME** record pointing to `cname.vercel-dns.com`.
    - For **www**: add a **CNAME record** pointing to `cname.vercel-dns.com`.
4. DNS propagation can take up to 48 hours, but is usually within minutes.
5. Vercel automatically provisions a free TLS/SSL certificate via Let's Encrypt once DNS is verified.

---

### Step 6 — Verify Everything Works

- [ ] Site loads at your custom domain over HTTPS
- [ ] API calls succeed (login, comics load, emotes work, etc.)
- [ ] React Router deep links work (e.g., navigating directly to `/comics/1` doesn't 404)
- [ ] CDN images load correctly

---

### Step 7 — Tear Down DigitalOcean App Platform

Once you have confirmed the Vercel deployment is stable:

1. Log in to [DigitalOcean](https://cloud.digitalocean.com).
2. Navigate to **Apps** and select the frontend app.
3. Go to **Settings → Destroy App** and confirm deletion.
4. This stops all billing for the App Platform app.

> **Tip:** Keep the DigitalOcean app running in parallel for a day or two during DNS propagation to avoid downtime.

---

### Local Development

To run the app locally against the Railway backend:

```bash
cp .env.example .env.local
npm install
npm run start-dev
```

`.env.local` is gitignored and will not be committed.
