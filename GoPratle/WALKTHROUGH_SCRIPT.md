# GoPratle Assignment: 5-7 Minute Screen Recording Script 🎙️

This script is structured to help you deliver a crisp, professional, and well-paced 5 to 7-minute video walkthrough covering all evaluation criteria required by GoPratle.

---

## ⏱️ Video Timing Overview

| Timestamp | Section | Key Focus |
|---|---|---|
| **0:00 - 1:00** | **Introduction & Problem Understanding** | Overview of assignment, target audience (Planners, Performers, Crew), and core objectives. |
| **1:00 - 2:00** | **Architecture & Key Decisions** | Next.js App Router, Express REST backend, MongoDB schema isolation, and draft autosaving. |
| **2:00 - 3:45** | **Live Application Flow Walkthrough** | Stepper in action: Step 1 (Basics & Category) -> Dynamic Steps 2 & 3 -> Step 4 Review & Submission -> MongoDB Success Modal. |
| **3:45 - 4:45** | **Codebase Walkthrough & Data Flow** | Show Frontend component hierarchy, API client, Express controller, Mongoose sub-schemas, and Postman/Network tab. |
| **4:45 - 5:45** | **Testing, Validation & Edge Cases** | Automated test suite execution (8/8 passing), date-range validation, required fields, and category isolation. |
| **5:45 - 6:30** | **Limitations, Improvements & Conclusion** | Auth/roles, real-time bids/quotes, file upload attachments for moodboards, and closing remarks. |

---

## 🎬 Section-by-Section Speaking Script

### 1. Introduction & Understanding (0:00 - 1:00)
> *"Hello team GoPratle! My name is Arbaz Hasan, and today I'm presenting my full-stack requirement posting engine built for the Full-Stack Developer Intern technical assignment.*
>
> *The goal of this assignment is to design an intuitive, multi-step requirement posting flow where the fields in Steps 2 and 3 dynamically adapt based on the category chosen in Step 1—whether the client is hiring an **Event Planner**, a **Live Performer**, or a **Technical Production Crew**—and finally store clearly categorised data into MongoDB via a Node.js Express backend.*
>
> *From the start, my key assumption was that hiring a Planner requires services, guest count, and theme milestones; hiring a Performer requires sound gear, music genres, and stage riders; while hiring Crew requires headcounts, shift hours, call times, and technical certifications. Therefore, I built a modular architecture to handle these differences cleanly without polluting the database."*

---

### 2. Architecture & Design Decisions (1:00 - 2:00)
> *(Action: Show the repository folder structure or README architecture diagram)*
>
> *"For the tech stack:*
> - *On the **Frontend**, I chose **Next.js App Router** with React. Rather than generic component libraries, I implemented a custom design system with CSS Modules and HSL color tokens, dark-mode glassmorphism, and responsive micro-animations for a wow-factor experience.*
> - *On the **Backend**, I built a modular **Node.js and Express** server with ES Modules, Mongoose ODM, strict input validation, centralized error handling, and automated Jest tests.*
> - *On the **Database**, instead of a flat unstructured document, I created **isolated Mongoose sub-schemas** for `plannerDetails`, `performerDetails`, and `crewDetails` with `default: undefined`. When a Planner is posted, Performer and Crew fields remain strictly absent, ensuring pristine data integrity.*
> - *I also built two quality-of-life features: **local draft autosaving** so clients don't lose data on accidental page reloads, and **1-click Demo Presets** for instant testing."*

---

### 3. Live Application Walkthrough (2:00 - 3:45)
> *(Action: Open browser at `http://localhost:3000`)*
>
> *"Let's walk through the live application flow:*
> 1. ***Step 1 - Event Basics***:
>    - *Notice the top navbar showing a live green dot: our frontend actively monitors `/api/health`.*
>    - *I'll enter the event name: 'Royal Rajputana Wedding 2026'.*
>    - *Select Event Type: 'Wedding'.*
>    - *I can toggle 'Multi-Day Event' to pick a start date and end date.*
>    - *Set location: Udaipur, Rajasthan, and venue name: 'The Oberoi Udaivilas'.*
>    - *Now observe the Category Selector: Event Planner, Performer, or Crew. Each card features tailored branding. Let's select **Event Planner** and click 'Proceed to Step 02'.*
> 2. ***Step 2 - Category Specific (Planner Scope & Aesthetics)***:
>    - *The Stepper dynamically renamed the step to 'Scope & Guests'.*
>    - *Here we see fields strictly for Planners: Planning Scope (Full Planning), Guest Count (450), Theme presets ('Royal Rajputana Vintage'), Budget range (₹6,00,000 to ₹15,00,000), and key services like Vendor Management and Venue Sourcing.*
>    - *Let's click 'Proceed to Step 03'.*
> 3. ***Step 3 - Planner Execution & Milestones***:
>    - *Here we define the coordinator experience tier: 'Luxury & Celebrity Specialist', language requirements (English, Hindi), milestone notes, and moodboard link.*
>    - *Click 'Proceed to Step 04'.*
> 4. ***Step 4 - Review & Submission***:
>    - *Step 4 renders a structured preview card with 1-click edit shortcuts back to any previous step.*
>    - *I'll fill out the poster contact details: Name: Vikramaditya Rathore, Email: vikram@rathoreevents.in, Phone: +919876543210, and Urgency Level: Normal.*
>    - *Now I click **Submit & Publish Requirement**.*
> 5. ***Success Modal & MongoDB Confirmation***:
>    - *The API returns a 201 Created response and generates our unique human-readable reference code: `GP-PLN-2026-XXXXX`.*
>    - *We can copy the ID in 1 click or download a JSON export.*
> 6. ***Live Submissions Dashboard***:
>    - *Clicking 'View in Live Submissions' takes us to the real-time MongoDB explorer.*
>    - *We see live counter cards, category filter tabs, search functionality, and an interactive MongoDB document inspector where we can view the raw JSON and change workflow status from Open to Under Review or Fulfilled."*

---

### 4. Code & Data Flow Deep-Dive (3:45 - 4:45)
> *(Action: Switch to VS Code / IDE)*
>
> *"Let's look under the hood at the code implementation:*
> - ***Frontend API Service (`client/src/services/api.js`)***:
>   - *A centralized fetch client handling base URLs, JSON headers, and HTTP error normalization.*
> - ***Backend Controller (`server/src/controllers/requirementController.js`)***:
>   - *In `createRequirement`, we first validate the request body against our schema.*
>   - *We prune unused category objects, generate a reference ID using `generateReferenceId()`, and persist the document to MongoDB.*
>   - *`getRequirements` handles category filtering, search queries using case-insensitive regex, and pagination.*
> - ***Mongoose Schema (`server/src/models/Requirement.js`)***:
>   - *Notice how `plannerDetailsSchema`, `performerDetailsSchema`, and `crewDetailsSchema` are separate subdocuments with `default: undefined`. This guarantees that a Performer posting never has empty planner fields.*
> - ***Network Tab / API Response***:
>   - *(Show Network inspect tab showing `POST /api/requirements` returning `{ success: true, data: { referenceId, category, ... } }`)."*

---

### 5. Automated Testing & Edge Cases (4:45 - 5:45)
> *(Action: Open terminal and run `npm run test:backend`)*
>
> *"Quality and edge cases were a priority:*
> - *I wrote automated tests in Jest + Supertest utilizing an in-memory MongoDB server (`mongodb-memory-server`) so tests are completely isolated and self-contained.*
> - *Let's run `npm run test:backend`... As you can see, all 8 tests pass:*
>   - *Health check endpoint verification.*
>   - *Successful creation for Event Planner.*
>   - *Successful creation for Performer.*
>   - *Successful creation for Production Crew.*
>   - *Rejection of invalid payloads (short names, malformed email, missing required fields).*
>   - *Category filtering (`?category=planner`).*
>   - *Full-text search keyword filtering.*
>   - *Aggregate metrics calculations at `/api/requirements/stats`.*
> - ***Edge Cases Handled***:
>   - *End date before start date validation.*
>   - *Minimum duration check (15 mins) for performers.*
>   - *Zero or negative headcount prevention.*
>   - *Draft recovery in `localStorage` if browser crashes or reloads."*

---

### 6. Limitations & Future Improvements (5:45 - 6:30)
> *"While this application meets all technical specifications, here are key improvements I would implement in a production rollout at GoPratle:*
> 1. ***Authentication & Role-Based Access Control (RBAC)***: Integrating NextAuth or JWT so registered event planners, artists, and crew agencies have dedicated profile dashboards.
> 2. ***Direct Bidding & Proposal Workflow***: Allowing verified performers or crew to submit bids or rate cards directly on open postings.
> 3. ***Cloud Media Uploads (S3/Cloudinary)***: Allowing direct upload of stage technical riders, audio demos, and moodboard PDF decks rather than URL links.
> 4. ***Real-time WebSockets / Push Notifications***: Notifying posters instantly when a talent expresses interest in their requirement.
>
> *Thank you so much for reviewing my assignment! I thoroughly enjoyed building this flow and look forward to discussing how I can contribute as a Full-Stack Developer Intern at GoPratle."*

---

## 💡 Quick Tips for Your Recording
1. **Screen Resolution**: Record at 1080p (1920x1080) for clear text readability.
2. **Audio**: Use headphones or a clean microphone in a quiet room.
3. **Pacing**: Speak at a steady, enthusiastic pace—don't rush through the live demo.
4. **Mouse Pointer**: Highlight key buttons and cards with your cursor as you speak about them.
