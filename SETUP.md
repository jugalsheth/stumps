# Cricket Tracker - Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your credentials.

3. **Set Up Database**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## Environment Variables Required

### Required
- `DATABASE_URL` - PostgreSQL connection string
- `CRICKET_API_KEY` - Your cricket API key
- `CRICKET_API_URL` - API endpoint (e.g., https://api.cricapi.com/v1)

### Optional (for full functionality)
- `UPSTASH_REDIS_REST_URL` & `UPSTASH_REDIS_REST_TOKEN` - For Redis caching
- `NEXT_PUBLIC_VAPID_PUBLIC_KEY` & `VAPID_PRIVATE_KEY` - For push notifications
- `NEXT_PUBLIC_APP_URL` - Your app URL (defaults to localhost:3000)

## Cricket API Setup

The app works with any cricket API that provides:
- Match listings
- Live scores
- Team data
- Player data
- News feed

### Recommended APIs:
1. **CricAPI** - https://www.cricapi.com/
2. **RapidAPI Cricket** - https://rapidapi.com/cricket-api
3. **Custom API** - Modify `lib/api/cricket-client.ts` to match your API

### Mock Data
The app includes mock data for development when the API is not configured.

## Database Setup

### Using Supabase (Recommended for Quick Start)
1. Create a new Supabase project
2. Copy the connection string to `DATABASE_URL`
3. Run migrations:
   ```bash
   npx prisma migrate dev
   ```

### Using Local PostgreSQL
1. Install PostgreSQL
2. Create database:
   ```sql
   CREATE DATABASE cricket_tracker;
   ```
3. Update `DATABASE_URL` in `.env.local`
4. Run migrations:
   ```bash
   npx prisma migrate dev
   ```

## Push Notifications Setup

1. Generate VAPID keys:
   ```bash
   npx web-push generate-vapid-keys
   ```

2. Add keys to `.env.local`:
   ```
   NEXT_PUBLIC_VAPID_PUBLIC_KEY="your-public-key"
   VAPID_PRIVATE_KEY="your-private-key"
   ```

3. Register service worker (automatic on first load)

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms
- Ensure Node.js 18+ is supported
- Set environment variables
- Run `npm run build` and `npm start`

## Troubleshooting

### API Errors
- Check your API key is correct
- Verify API endpoint URL
- App will use mock data if API fails

### Database Errors
- Verify `DATABASE_URL` is correct
- Run `npx prisma generate` after schema changes
- Check database is accessible

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run build`

## Next Steps

1. Configure your cricket API
2. Set up database
3. Customize team colors in `lib/utils/constants.ts`
4. Add your logo and branding
5. Configure analytics (optional)

## Support

For issues, check:
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

