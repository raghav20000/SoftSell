# SoftSell - Software License Marketplace

This is a responsive single-page marketing website for SoftSell, a fictional software license resale startup. The website is built using Next.js and Tailwind CSS.

## Features

- Responsive design that works on mobile, tablet, and desktop
- Modern UI with a coherent color palette and typography
- Light/dark mode toggle
- Animations for enhanced user experience
- Form validation for the contact form
- AI-powered chat widget for customer support

## Sections

1. **Hero Section** - With headline, subheading, and CTA buttons
2. **How It Works** - Three-step process with icons
3. **Why Choose Us** - Four key benefits with icons
4. **Customer Testimonials** - Two customer reviews
5. **Contact Form** - With frontend validation
6. **Chat Widget** - AI-powered customer support

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Form Validation**: React Hook Form with Zod
- **Icons**: Lucide React
- **AI Integration**: AI SDK with OpenAI (can be mocked for development)

## Design Choices

- Used a blue color scheme for a professional, trustworthy appearance
- Implemented subtle animations to enhance user engagement
- Created a mobile-first responsive design
- Used a consistent spacing and typography system
- Included accessibility features like proper contrast and semantic HTML

## Bonus Features

- Light/dark mode toggle
- Animations on scroll and hover
- SEO meta tags
- AI-powered chat widget with example questions
- Form validation with error messages

## Development Notes

The chat widget can operate in two modes:
1. **Mock Mode** (default): Uses predefined questions and answers
2. **OpenAI Mode**: Connects to OpenAI API (requires API key)

To switch between modes, change the `useMockMode` state in the ChatWidget component.
