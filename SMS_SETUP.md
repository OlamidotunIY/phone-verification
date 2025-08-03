# SMS API Setup Guide

## Quick Setup

1. **Create Environment File**
   ```bash
   # Create .env.local file in the project root
   echo "API_KEY=your_sms_api_key_here" > .env.local
   ```

2. **Get Your API Key**
   - Contact your SMS service provider to get your API key
   - Replace `your_sms_api_key_here` in the `.env.local` file with your actual API key

3. **Restart Development Server**
   ```bash
   npm run dev
   ```

## How It Works

The SMS integration automatically:

1. **Formats Phone Numbers**: Converts `(555) 123-4567` to `2345551234567` (adds Nigerian country code)
2. **Generates OTP**: Creates a 6-digit verification code
3. **Sends SMS**: Uses the SphereX SMS service to deliver the code
4. **Handles Errors**: Gracefully handles SMS failures while still generating codes

## SMS Message Format

The SMS sent to users will look like:
```
Your OTP is 123456. Do not share with anyone, it expires in 10 mins.
```

## Testing

1. Enter a phone number on the home page
2. Check the console for SMS delivery status
3. The verification code will be sent via SMS to the provided number
4. Enter the code on the verification page

## Troubleshooting

- **SMS Not Sending**: Check that your `API_KEY` is correctly set in `.env.local`
- **Invalid Phone Number**: Ensure the phone number is in the correct format
- **API Errors**: Check the console for detailed error messages

## Production Deployment

For production deployment:

1. Set the `API_KEY` environment variable in your hosting platform
2. Ensure the SMS API service is accessible from your production server
3. Monitor SMS delivery rates and API responses