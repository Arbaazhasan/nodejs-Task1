import './globals.css';

export const metadata = {
  title: 'GoPratle | Event Requirement Posting Engine',
  description:
    'Dynamic multi-step requirement posting flow for Event Planners, Performers, and Production Crew. Built with Next.js, Node.js, Express, and MongoDB.',
  keywords: [
    'GoPratle',
    'Event Management',
    'Requirement Posting',
    'Event Planner',
    'Performer Hiring',
    'Crew Booking',
    'Next.js',
    'Full-Stack',
  ],
  authors: [{ name: 'Arbaz Hasan' }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>{children}</body>
    </html>
  );
}
