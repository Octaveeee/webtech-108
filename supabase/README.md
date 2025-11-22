# Supabase Docker

This is a minimal Docker Compose setup for self-hosting Supabase.

## Expected Structure

- ../ → your Next.js application (art_gallery-nextjs)
- compose.yml → the Docker configuration
- .env.example → required environment variables for the app

## Environment Variables

1. Copy `.env.example` from this folder to `../.env.local`
2. Fill in the values with your Supabase project keys 