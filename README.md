# Phone Verification System

A simple phone verification system built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 📱 Phone number input with automatic formatting
- 🔐 6-digit verification code generation
- ⏱️ Code expiration (10 minutes)
- 📱 Mobile-responsive design
- 🔄 Code resend functionality
- ⚡ Real-time validation and error handling
- 🎨 Modern, clean UI with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Storage**: In-memory (for demo purposes)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd phone-verification
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── send-code/
│   │   │   └── route.ts          # API endpoint for sending verification codes
│   │   └── verify-code/
│   │       └── route.ts          # API endpoint for verifying codes
│   ├── verify/
│   │   └── page.tsx              # Verification page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page (phone input)
├── lib/
│   └── storage.ts                # In-memory storage for verification codes
└── ...
```

## How It Works

1. **Phone Input**: Users enter their phone number on the home page
2. **Code Generation**: The system generates a 6-digit verification code
3. **Code Storage**: The code is stored in memory with a 10-minute expiration
4. **SMS Simulation**: The code is logged to console (in production, integrate with SMS service)
5. **Verification**: Users enter the code on the verification page
6. **Validation**: The system validates the code and marks the phone as verified

## API Endpoints

### POST `/api/send-code`
Sends a verification code to the provided phone number.

**Request Body:**
```json
{
  "phoneNumber": "(555) 123-4567"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Verification code sent successfully",
  "phoneNumber": "(555) 123-4567"
}
```

### POST `/api/verify-code`
Verifies the submitted code against the stored code.

**Request Body:**
```json
{
  "phoneNumber": "(555) 123-4567",
  "code": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Phone number verified successfully",
  "phoneNumber": "(555) 123-4567"
}
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

Create a `.env.local` file in the project root with the following variables:

```bash
# SMS API Configuration
API_KEY=your_sms_api_key_here
```

**Required:**
- `API_KEY` - Your SMS API key for sending verification codes

**Optional (for production):**
- `REDIS_URL` - For persistent storage instead of in-memory

## Production Considerations

1. **Storage**: Replace in-memory storage with Redis or a database
2. **SMS Service**: The app is already integrated with the SMS API service
3. **Rate Limiting**: Add rate limiting to prevent abuse
4. **Security**: Implement proper phone number validation and sanitization
5. **Monitoring**: Add logging and monitoring for production use
6. **Environment Variables**: Ensure `API_KEY` is properly set in production

## License

MIT
