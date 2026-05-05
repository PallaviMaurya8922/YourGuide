# Travellor Buddy - Combined App Design Brief

This document combines the current details from every file in the pitch directory into one clean Markdown brief for app design, product planning, and MVP definition.


## Product Name

The product is a single app:

**Travellor Buddy**

Recommended brand/subtitle:

**Your local travel buddy for guides, planning, and smarter city exploration.**

## Product Overview

Travellor Buddy is a mobile-first travel assistance platform that connects travelers with verified local guides and helps them plan structured city trips. It combines a local guide marketplace, a smart trip planner, a visual journey graph, AI-powered historical audio guidance, and group expense management.

The product should feel like:

**Travel companion + smart local friend**

It should not feel:

- Cluttered
- Overly technical
- Too feature-heavy at first glance
- Corporate or cold

## Positioning Statement

Travellor Buddy is an on-demand local guide marketplace combined with a graph-based intelligent trip planner that helps travelers explore cities efficiently, safely, and meaningfully.

Long-term, the product becomes a unified travel support ecosystem powered by both verified local expertise and intelligent automation.

## Core Problem

Travelers visiting unfamiliar cities often face:

- Difficulty discovering reliable local guides
- Lack of trusted and verified guide options
- Language barriers and communication gaps
- Risk of scams or overpriced guide services
- Poor trip planning and inefficient routing
- Fragmented information across multiple apps
- Limited understanding of historical or cultural locations
- No structured way to track visited places
- Difficulty managing group travel expenses

Local guides face:

- Lack of digital visibility
- Fear or hesitation around digital discovery
- Dependency on intermediaries and agents
- Irregular income opportunities
- Limited access to direct traveler bookings

## Proposed Solution

Travellor Buddy solves these problems through:

- Instant discovery of nearby verified local guides
- Transparent hourly pricing
- Language-based guide filtering
- Verified guide profiles with education, ratings, reviews, and pricing
- Direct guide booking without intermediaries
- Smart day-wise itinerary planning
- Distance-based clustering of places
- Visual graph tracking of visited locations
- AI historical audio guide for monuments and places
- Group expense tracking for trips

## Target Users

### Primary Users

- Domestic travelers visiting unfamiliar cities
- Budget travelers
- Students aged approximately 18-30
- Religious tourism visitors
- First-time visitors exploring heritage cities
- Tourists who need language support

### Secondary Users

- Local guides looking for income generation
- Small travel groups
- Friend groups
- Families
- Local experts in heritage, food, religion, and culture

## Initial Launch Cities

Recommended pilot and early launch cities:

- Varanasi
- Ayodhya
- Agra
- Jaipur

These cities are suitable because they have high tourist density, strong heritage/religious tourism, and strong demand for local historical context.

## Design Principles

- Mobile-first
- Minimal cognitive load
- Clean and airy layout
- Trust-first interface
- Verification, ratings, and guide details should be visible
- Action-first design for booking, planning, and exploring
- Warm and human-centric visuals
- Modern but not over-designed
- Clear hierarchy and readable content
- Realistic travel content instead of placeholder text

## Visual Style Guide

### Color Palette

Primary:

- Deep Blue: `#1E3A8A`
- Accent Blue: `#3B82F6`

Secondary:

- Soft Orange: `#F97316`
- Light Background: `#F9FAFB`

Text:

- Primary Text: `#111827`
- Secondary Text: `#6B7280`

Status:

- Success Green: `#10B981`

### Typography

- Headings: Inter or Poppins, bold and clean
- Body: Inter, regular
- Button text: medium weight

### Component Style

- Cards: clean, breathable padding, approximately 16px radius
- Buttons: approximately 24px radius
- Shadows: soft and subtle
- Icons: outline icons with minimal filled usage
- Spacing: consistent 8pt grid
- Light mode UI required

## Product Architecture

The platform has three major product layers:

1. Guide Marketplace
2. Trip Planner
3. AI and travel utility features

High-level platform components:

- Traveler Application
- Guide Dashboard
- Admin Control Panel

This structure supports trust, verification, marketplace governance, and future scalability.

## MVP Scope

The MVP should focus on two core modules:

1. Local Guide Marketplace
2. Smart Trip Planner

These two modules form the foundation of the two-sided travel marketplace.

### MVP Must Include

- City selection
- Guide listing
- Guide profile
- Guide language, pricing, rating, and education details
- Booking request flow
- Guide onboarding/profile creation
- Guide availability
- Guide verification details
- Admin verification/moderation
- Basic trip planner
- City selection for planning
- Number of travel days
- Place selection
- Auto-generated day-wise itinerary
- Basic distance-based clustering of locations

### Optional MVP Feature

- Simple visual graph tracking of visited places

### Delayed / Future Features

- AI camera-based travel assistant
- Historical place audio guide
- Expense splitting system
- Hotel booking integrations
- Restaurant recommendation engine
- Bike rental recommendations
- Payment gateway automation
- Advanced itinerary regeneration

## Core Feature 1: Local Guides Connect

Local Guides Connect is the primary marketplace feature. It connects travelers with verified local guides and gives local people a new income opportunity.

### Traveler Features

- Select city
- Browse available guides
- Search or filter guides
- Filter by language
- Filter by price range
- Filter by rating
- Filter by availability
- View guide profile
- View guide profile image
- View guide name
- View guide rating
- View spoken languages
- View hourly rate
- View education or expertise
- View experience
- View reviews
- View short guide description
- Request booking
- Book guide buddy

### Guide Features

- Register as a guide
- Complete AI test and mock test
- Create guide profile
- Add age
- Add education
- Add expertise
- Add languages
- Add hourly price
- Add availability
- Upload verification details
- Accept or reject booking requests

### Admin Features

- Guide profile verification
- Booking monitoring
- Marketplace moderation
- Verification management

### Verification Concept

Every guide should pass a basic assessment before becoming visible. The assessment can include:

- AI test
- Mock test
- Basic knowledge test
- Document or profile verification

### Marketplace Benefits

For travelers:

- More reliable pricing
- Better trust
- More language choices
- Less dependency on random intermediaries
- Clear guide comparison

For guides:

- Digital visibility
- Direct customer access
- Less dependency on agents
- New income source
- Competitive edge for new guides

### Pricing Note

One source mentions negotiable pricing but marks it as crossed out. For design clarity, the MVP should show transparent hourly pricing first. Negotiation can be reconsidered later.

## Core Feature 2: Smart Trip Planner

The Smart Trip Planner helps users create structured day-wise travel plans within a city.

### Planner Inputs

- Select city
- Select number of travel days
- Select places to visit
- Select interests
- Select budget level
- Set availability days
- Optionally choose priority places
- Optionally set extra time for specific places

Suggested interest chips:

- Temples
- Food
- History
- Culture
- Heritage
- Shopping
- Nature

### Planner Output

- Day-wise itinerary cards
- Ordered places per day
- Time suggestions
- Distance information
- Small map preview
- Editable route planning
- Manual adjustments
- Save plan

### Planning Logic

The planner should use:

- Day-wise itinerary generation
- Distance-based clustering of locations
- Editable route graph
- Ordered place sequence

### Free Planner Features

- Day-wise itinerary generation
- Adjustable and editable graph roadmap
- Basic distance-based clustering
- Manual route adjustments

### Paid Planner Features

- Dynamic itinerary regeneration
- Automatic re-routing if the user falls behind schedule
- Priority-based planning
- Time allocation customization
- Adaptive route changes
- Nearby restaurant suggestions
- Nearby hotel suggestions
- Nearby bike rental suggestions
- Editing of time and priority list

### Planner CTAs

- Optimize Route
- Edit Plan
- Save Plan

## Core Feature 3: Travel Graph Tracking

Travel Graph Tracking is a unique UI feature that visually records the travel sequence.

### Concept

The app displays visited locations as a connected graph:

- Each node represents a visited place
- Lines represent the travel path
- Current location is highlighted
- Visited places are marked by the guide or user

### User Value

Travelers can:

- Revisit their journey sequence
- Understand which places were covered
- Add notes to locations
- Memorize the trip better
- Open details for each visited place

### Graph UI Requirements

- Clean white canvas
- Blue nodes
- Smooth transitions
- Tappable nodes
- Location images where useful
- Small descriptions
- Personal notes section per node
- Current position highlight

### Graph Interactions

- Tap node to open place details
- Add notes per location
- Mark a place as visited
- View travel sequence

## Core Feature 4: AI Historical Audio Guide

The Historical Places Audio Guide is a future/Phase 3 feature designed for independent exploration.

### Flow

1. User opens Audio Guide
2. Camera opens
3. User captures a monument or historical place
4. Image is uploaded or processed
5. AI recognizes the place
6. App generates an audio explanation
7. User listens to the audio guide

### Output

- Place title
- Audio play button
- Historical/cultural description
- Optional YouTube video recommendations
- Manual search fallback

### Fallback

If AI cannot recognize the image:

- User can select city name
- User can select place name
- User can manually search

## Core Feature 5: Expense Management

Expense Management is a free future feature for group travel.

### Group Features

- Create travel group
- Add members
- Add expenses
- Track who paid
- Track amount
- Track split information
- Maintain payment history
- View balance summary
- Settle payments manually

### Scope

The intended feature is similar to Splitwise, excluding email notifications.

### UI Elements

- Group name
- Member list
- Expense list
- Add expense floating action button
- Balance summary
- Payment history

## Mobile App Structure

Recommended bottom navigation with 5 tabs:

1. Home
2. Explore
3. Planner
4. Trips
5. Profile

### Tab Purpose

- Home: dashboard and quick access
- Explore: guide discovery and marketplace
- Planner: trip planner
- Trips: graph tracking, saved trips, journey history
- Profile: user account, saved guides, settings

## Screen 1: Home Dashboard

### Top Section

- Greeting, example: "Hello Jitendra"
- Search bar with prompt: "Where do you want to go?"

### Middle Section

- Horizontal scroll of popular cities
- Promotional banner: "Book a local guide instantly"

### Quick Actions

- Book Guide
- Plan Trip
- Explore Nearby
- Audio Guide

### Bottom Section

- Recommended guides
- Trending places

## Screen 2: Guide Listing

### Top Filters

Use horizontal scroll filters:

- Language
- Price range
- Rating
- Availability

### Guide Card Content

Each guide card should include:

- Profile image
- Name
- Rating, example: 4.7
- Languages
- Price per hour
- Short description
- Book Now button

## Screen 3: Guide Profile

### Top Area

- Guide image
- Guide name
- Rating

### Details

- Languages spoken
- Education
- Expertise
- Experience
- Hourly rate
- Reviews

### CTA

- Sticky bottom button: Book Guide

## Screen 4: Trip Planner

### Input Form

- Select city
- Number of days
- Interests
- Budget level
- Places to visit

### Output View

Display day-wise cards:

- Day 1
- Day 2
- Day 3

Each place item should include:

- Place name
- Suggested time
- Distance
- Small map preview

### CTAs

- Optimize Route
- Edit Plan
- Save

## Screen 5: Travel Graph Tracking

### Visual Direction

- Node-based journey graph
- Connected dots representing the travel path
- Place nodes
- Current position highlight
- Blue nodes on a clean white canvas

### Interactions

- Tap node to view place details
- Add notes
- View sequence
- Mark visited

## Screen 6: AI Audio Guide

### Flow

- Open camera
- Capture monument
- Show processing state
- Show identified place
- Play audio
- Read description
- Watch optional video

### Fallback UI

- Manual search input
- City selection
- Place selection

## Screen 7: Expense Manager

### Group View

- Group name
- Members list
- Balance summary

### Expense List

Each expense should include:

- Who paid
- Amount
- Split information
- Date or payment history

### Actions

- Add expense
- View balance summary
- Settle manually

## Screen 8: Profile

Profile screen should include:

- User information
- Past trips
- Saved guides
- Settings
- Logout

## Core User Flows

### Flow 1: Book Guide

Home -> Explore -> Select Guide -> View Profile -> Book

### Flow 2: Plan Trip

Home -> Plan Trip -> Input Details -> View Plan -> Save

### Flow 3: Use Audio Guide

Home -> Audio Guide -> Camera -> Capture -> Listen

## Microinteractions

- Button tap: subtle scale animation
- Loading: skeleton UI, not only spinner
- Graph nodes: smooth transitions
- Success state: small check animation
- Booking request: clear pending/confirmed status
- Planner generation: progressive loading cards

## Empty States and Edge Cases

### No Guides Available

Show:

- Nearby cities
- Change filters
- Request a guide
- Save search

### AI Does Not Detect Place

Show:

- Manual place search
- Select city
- Select place from list

### Empty Planner

Show:

- Suggested places
- Popular templates
- Interest chips

### Offline / Low Connectivity

Show:

- Limited functionality message
- Saved trips
- Cached itinerary
- Retry option

## Business Model

### Primary Revenue

- Commission per successful guide booking
- Suggested commission range: 10%-25%

### Future Revenue Streams

- Premium trip planner subscription
- One-time paid advanced planner
- Premium guide listings
- Featured guide listings
- Specialized language guides
- Tour bundles
- Priority booking access
- AI premium services

## Launch Strategy

### Phase 1: MVP Validation

- Select one pilot city
- Onboard 10-20 verified guides
- Release internal MVP
- Launch core marketplace
- Launch basic smart trip planner
- Collect early user feedback

### Phase 2: Optimization

- Improve booking workflow
- Improve itinerary optimization
- Improve distance clustering
- Add ratings and reviews

### Phase 3: Ecosystem Expansion

- Expand to additional cities
- Introduce AI camera travel assistant
- Add historical audio guide
- Add expense management
- Add contextual recommendations

## Competitive Positioning

Travellor Buddy differs from traditional travel apps because it combines:

- Real-time human assistance
- Verified local guide marketplace
- Structured itinerary planning
- Visual travel graph tracking
- AI-based historical context

The hybrid model is:

**Human guidance + smart planning automation**

## Technical Architecture

### Suggested Technology Stack

Frontend:

- React
- Next.js

Backend:

- Node.js
- Express

Database:

- PostgreSQL

Maps:

- Google Maps API

Authentication:

- Firebase Auth
- JWT

Hosting:

- Render
- Railway

## Database Design: MVP Level

### Users

Fields:

- `id`
- `name`
- `email`
- `phone`
- `role` (`traveler` or `guide`)

### Guides

Fields:

- `id`
- `user_id`
- `city`
- `languages`
- `hourly_rate`
- `verified_status`
- `rating`

### Bookings

Fields:

- `id`
- `user_id`
- `guide_id`
- `date`
- `status`

### Places

Fields:

- `id`
- `name`
- `city`
- `latitude`
- `longitude`
- `category`

### Itinerary

Fields:

- `id`
- `user_id`
- `day_number`
- `place_id`
- `order_index`

## Early Success Metrics

Track these during validation:

- Number of onboarded guides
- Number of verified guides
- Number of completed bookings
- Repeat traveler usage
- Average booking value
- Booking conversion rate
- Planner usage rate
- Saved itinerary count

## App Design Requirements

The final app design should include:

- Full mobile app UI
- Component library
- Design system
- Screen flows
- Clickable prototype if supported
- Reusable components
- Light mode screens
- Realistic content
- Clear visual hierarchy
- Clean spacing
- Trust-focused guide marketplace UI
- Friendly, useful planner UI
- Distinctive graph tracking experience

## Suggested Component Library

Core components:

- Bottom navigation
- City selector
- Search bar
- Filter chips
- Guide card
- Guide profile header
- Rating display
- Language chips
- Price label
- Primary CTA button
- Secondary button
- Booking status badge
- Day itinerary card
- Place row
- Map preview
- Graph node
- Graph path line
- Note input
- Audio player
- Expense row
- Member avatar/list
- Balance summary
- Empty state panel
- Skeleton loader

## Suggested Information Architecture

### Traveler App

- Home
- Explore Guides
- Guide Profile
- Booking Request
- Planner Input
- Planner Result
- Saved Trips
- Travel Graph
- Audio Guide
- Expense Groups
- Profile

### Guide Dashboard

- Guide profile
- Verification status
- Availability
- Booking requests
- Past bookings
- Reviews

### Admin Panel

- Guide verification queue
- Guide profile review
- Booking monitoring
- User management
- Marketplace moderation

## Recommended MVP Design Priority

For a strong first design, focus on these screens first:

1. Home Dashboard
2. Guide Listing
3. Guide Profile
4. Booking Request
5. Trip Planner Input
6. Day-wise Itinerary Result
7. Travel Graph Preview
8. Profile

AI Audio Guide and Expense Manager can be shown as future-ready modules but should not dominate the first version.

## Design Tone

The app should feel:

- Trustworthy
- Local
- Friendly
- Useful
- Warm
- Clear
- Travel-focused
- Simple enough for first-time users

The app should avoid:

- Dense dashboards
- Overly technical AI language
- Too many competing CTAs
- Generic travel stock-app feeling
- Hiding trust details
- Making guide booking feel risky or unclear
