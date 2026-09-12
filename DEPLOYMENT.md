# QualityOS deployment

- Frontend: React + Vite static build
- Hosting: Vercel
- Database: Supabase project `epimelis`
- Isolation: dedicated PostgreSQL schema `qualityos`
- API: JWT-verified Supabase Edge Function `qualityos-api`

The browser has no database service credentials. The API exposes a fixed read model and one validated intervention-write operation. Direct `anon` and `authenticated` access to the schema is revoked.

## Local commands

```bash
npm install
npm run dev
npm run build
```

The schema contains `professionals`, `bookings`, `customer_outcomes`, `training_modules`, `interventions`, and `quality_snapshots`.

All demo records are synthetic and must be replaced with approved operational data before internal production use.
