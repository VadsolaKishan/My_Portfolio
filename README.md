# Futuristic 3D Portfolio (Dark Sky · AI · Cyber)

Single-page, placement-ready portfolio with:
- Dark-sky animated background (twinkling stars + particles + shooting stars)
- 3D hologram hero (Three.js via react-three-fiber)
- Cyber “encryption lock” unlock interaction
- Floating AI chatbot assistant
- 3D tilt project cards + neon/glass UI
- Orbiting skills system
- Rating widget, academic timeline, holographic resume download, contact form

## Setup

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Customize your info

- Projects: [src/data/projects.ts](src/data/projects.ts)
- Skills orbit: [src/data/skills.ts](src/data/skills.ts)
- Academics timeline: [src/data/academic.ts](src/data/academic.ts)
- Chatbot knowledge + links: [src/data/chatbot.ts](src/data/chatbot.ts)
- Contact/social links: [src/components/Contact.tsx](src/components/Contact.tsx)

## Contact form (send email to you)

This project uses EmailJS so submissions go to your inbox without a backend.

1. Create an EmailJS account and set up an Email Service + Email Template.
2. Create a local `.env` file (see [.env.example](.env.example)) and fill in:
	- `VITE_EMAILJS_SERVICE_ID`
	- `VITE_EMAILJS_TEMPLATE_ID`
	- `VITE_EMAILJS_PUBLIC_KEY`
3. In your EmailJS template, add variables matching the code:
	- `from_name`, `from_email`, `message`, `reply_to`

## Resume

Replace the placeholder file at [public/resume.pdf](public/resume.pdf) with your real PDF (keep the filename the same).
