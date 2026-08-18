# Kamek Sayang Sarawak — Global Love-Message Campaign

> **Portfolio maturity:** Working Public Prototype · Moderated Multilingual Community Platform

[Open the verified live demonstration](https://kamek-sayang-sarawak.netlify.app)

Kamek Sayang Sarawak is a digital heritage campaign that invites Sarawakians and friends of Sarawak around the world to leave a message, connect it to a location and contribute to a moderated global expression of affection for the state.

The repository name retains MVP for development history. **Kamek Sayang Sarawak** is the permanent product identity.

## Business problem

Diaspora and community campaigns often generate scattered social-media posts that are difficult to preserve, moderate or present as one coherent story. Campaign organisers also need to distinguish real participation data from decorative demonstration content.

This product explores a focused alternative: one multilingual place to collect, review and display community messages through maps, counters, a message wall and a word cloud.

## Intended users

- Sarawakians living in Malaysia and abroad;
- friends of Sarawak who want to share an appropriate public message;
- authorised campaign moderators;
- cultural, tourism or community organisations evaluating a potential campaign.

## Core capabilities

- a four-language public experience in English, Bahasa Malaysia, Iban and Chinese;
- global and Sarawak-focused visual maps;
- a public message form with explicit display consent;
- optional name, phone and email fields;
- moderation states for pending, approved and hidden submissions;
- a public message wall and word-frequency view;
- message, country and city statistics derived from approved records when configured;
- an administrative review screen with status changes, deletion and CSV export;
- responsive presentation, reduced-motion support and social metadata;
- a Supabase schema with public submission and approved-message visibility rules.

## Strategic value

The platform demonstrates how a place-based campaign can convert emotional participation into a structured and governable digital asset.

With formal campaign ownership and privacy controls, it could:

- create a lasting multilingual record of community sentiment;
- connect diaspora participation back to Sarawak;
- give organisers a moderation workflow instead of relying on uncontrolled feeds;
- provide transparent aggregate patterns from approved submissions;
- support cultural storytelling without presenting unverified reach as fact.

These are potential campaign outcomes, not claims of adoption, official backing, media reach or government endorsement.

## Data and statistics

When a configured data service returns approved submissions, the public statistics are calculated from those records. When no configured data is available, parts of the interface use demonstration content so the visual experience remains understandable.

Demonstration values must never be presented as verified participation. Any public report or partnership proposal should use exported, reviewed records and clearly state the reporting period and methodology.

## What is implemented

The repository contains a Next.js and TypeScript application, multilingual content, interactive globe and map components, public submission APIs, moderation APIs, an administrative interface and a Supabase schema.

### Technology

Next.js 16 · React 19 · TypeScript · Supabase client and Row Level Security schema · Framer Motion · Three.js and react-globe.gl · Tailwind CSS · Netlify Next.js integration

The code supports a no-database fallback for demonstration purposes. A successful-looking local interaction does not by itself prove that a record was durably stored.

## Delivery role

**Ts. Zaiwin Kassim** leads product strategy, stakeholder requirements, solution architecture and supervised AI-assisted delivery with the **KOBIS AI Prodigy Team**. For Kamek Sayang Sarawak, that role covers campaign framing, multilingual participation, data storytelling, moderation and responsible-use boundaries.

This portfolio attribution does not imply commissioning, co-branding, endorsement or official adoption by the Sarawak Government, a tourism body or any external organisation.

## Responsible-use boundaries

- Public messages require moderation before publication.
- Optional phone and email details must never appear in the public message feed.
- The campaign needs an approved privacy notice covering purpose, lawful basis, retention, deletion and moderator access.
- Consent to display a message is not blanket consent to publish contact details or reuse content for unrelated promotion.
- Organisers should provide a process for correction, withdrawal and deletion requests.
- Messages involving hate, harassment, personal accusations, impersonation or sensitive personal information should not be published.
- Special care is required if children may submit messages.
- Admin authentication based on a shared secret is suitable only for a controlled prototype and should be replaced with named accounts, strong authentication and auditable roles before broader use.
- Map coordinates are approximate campaign visualisation data, not proof of a submitter's exact location.
- Language content requires authorised native-speaker and cultural review before an official campaign.

## Current limitations

- the interface can fall back to mock messages and statistics;
- no official campaign owner or partner approval is evidenced by this repository;
- no verified participation totals, geographic reach or impact metrics are claimed;
- the admin workflow uses a shared-secret pattern rather than a production identity system;
- rate limiting, abuse detection, notification and formal audit logs are not documented;
- the public-insert database policy requires deployment-specific security review;
- no automated test suite is listed in the package scripts;
- the translation coverage has not been documented as professionally certified.

## Run locally

Requirements: Node.js and npm.

    npm install
    npm run dev
    npm run lint
    npm run build
    npm start

The development server normally opens at http://localhost:3000.

## Deployment evidence

The connected hosting record identifies **kamek-sayang-sarawak** as the project and reports its current deployment as ready. This verifies the demonstration URL, not campaign adoption or production assurance.

## Repository map

- **app/page.tsx** — public campaign composition
- **app/api/messages** — public approved-message retrieval and submissions
- **app/api/admin** — moderation operations
- **app/admin** — reviewer interface and CSV export
- **components** — maps, counters, forms, message wall and word cloud
- **lib/translations.ts** — four-language content
- **lib/mockData.ts** — clearly separate demonstration content
- **supabase/schema.sql** — message table, moderation status and initial policies
- **netlify.toml** — Next.js hosting integration

## Portfolio evidence

Kamek Sayang Sarawak demonstrates community-product strategy, multilingual experience design, data visualisation, moderated user-generated content and the governance discipline required to separate campaign storytelling from verified participation evidence.
