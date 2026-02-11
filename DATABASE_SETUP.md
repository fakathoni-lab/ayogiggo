# Giggo Database Setup - EZSite Integration

## Overview

Giggo now uses **EZSite Built-in Database (PostgreSQL)** instead of Supabase. All database operations have been migrated to use EZSite Database CRUD APIs.

## Database Architecture

### Tables Created

The following tables are automatically initialized when the app starts:

1. **campaigns** - Campaign/Gig management
2. **applications** - Creator applications to campaigns
3. **submissions** - Creator content submissions
4. **wallets** - User wallet balances
5. **transactions** - Transaction ledger for audit trail
6. **brand_profiles** - Brand company profiles
7. **creator_profiles** - Creator profiles

### Automatic Initialization

Tables are automatically created on first app load via:
- Location: `src/lib/db/init.ts`
- Trigger: `App.tsx` → `useEffect` → `ensureTablesExist()`
- Behavior: Checks for existing tables, creates missing ones

## Database Client API

### Location
- **Schema Definitions**: `src/lib/db/schema.ts`
- **Database Client**: `src/lib/db/client.ts`
- **Initialization**: `src/lib/db/init.ts`

### Query Builder (Supabase-Compatible)

The database client provides a Supabase-compatible API for easy migration:

```typescript
import { db } from '@/lib/db/client';
import { TABLES } from '@/lib/db/schema';

// SELECT queries
const { data, error } = await db
  .from(TABLES.CAMPAIGNS)
  .select('*')
  .eq('status', 'live')
  .order('ID', { ascending: false });

// INSERT
const { data, error } = await db.insert(TABLES.CAMPAIGNS, {
  title: 'My Campaign',
  description: 'Campaign description',
  budget: 1000,
  // ... other fields
});

// UPDATE
const { data, error } = await db.update(TABLES.CAMPAIGNS, {
  ID: 123,
  status: 'live'
});

// DELETE
const { error } = await db.delete(TABLES.CAMPAIGNS, {
  ID: 123
});
```

### Supported Filter Operators

- `eq(field, value)` - Equal
- `neq(field, value)` - Not Equal
- `gt(field, value)` - Greater Than
- `gte(field, value)` - Greater Than or Equal
- `lt(field, value)` - Less Than
- `lte(field, value)` - Less Than or Equal
- `ilike(field, pattern)` - Case-insensitive contains
- `or(condition)` - OR condition

### Query Modifiers

- `.select(fields)` - Select specific fields (default: '*')
- `.order(field, { ascending: boolean })` - Order results
- `.limit(count)` - Limit result count
- `.single()` - Return single result
- `.maybeSingle()` - Return single result or null

## Migrated Hooks

### Campaign Hooks (`src/hooks/useCampaigns.tsx`)

✅ Migrated to EZSite Database:
- `usePublicCampaigns()` - Fetch live campaigns (public view)
- `useBrandCampaigns()` - Fetch brand's campaigns
- `usePublicCampaign(id)` - Fetch single campaign (public)
- `useBrandCampaign(id)` - Fetch single campaign (brand owner)
- `useCreateCampaign()` - Create new campaign

### Application Hooks (`src/hooks/useApplications.tsx`)

✅ Migrated to EZSite Database:
- `useCreatorApplications()` - Fetch creator's applications
- `useCreateApplication()` - Submit application to campaign
- `useBrandHiredApplications()` - Fetch hired applications for brand

## Data Mapping

### EZSite → Application Data

EZSite database uses uppercase field names by default. The client automatically maps:

| EZSite Field | Application Field |
|--------------|-------------------|
| `ID`         | `id`              |
| `CreatedTime`| `created_at`      |
| `UpdatedTime`| `updated_at`      |

### JSON Fields

Some fields store JSON data as strings:

- **prize_breakdown**: `JSON.stringify(array)` → `JSON.parse(string)`
- **required_hashtags**: `array.join(',')` → `string.split(',')`
- **platform_requirements**: `array.join(',')` → `string.split(',')`

## Authentication Integration

### EZSite Auth

The app uses EZSite built-in authentication:

```typescript
// Get current user
const { data: userInfo, error } = await window.ezsite.apis.getUserInfo();

// User object structure:
// {
//   ID: number,
//   Email: string,
//   Name: string,
//   Roles: "RoleCode1,RoleCode2"
// }
```

### Auth Helper

For Supabase compatibility, use:

```typescript
import { auth } from '@/lib/db/client';

const { data, error } = await auth.getUser();
// Returns: { data: { user: { id, email, name, roles } }, error }
```

## Testing Data Connection

### Check Tables

Open browser console and run:

```javascript
// List all tables
const tables = await window.ezsite.apis.GetTableList();
console.log(tables);

// Check specific table
const campaigns = await window.ezsite.apis.tablePage('campaigns', {
  PageNo: 1,
  PageSize: 10,
  OrderByField: 'ID',
  IsAsc: false,
  Filters: []
});
console.log(campaigns);
```

### Create Test Campaign

```javascript
// Create a test campaign
const { error } = await window.ezsite.apis.tableCreate('campaigns', {
  brand_id: 'test-user-id',
  title: 'Test Campaign',
  description: 'This is a test campaign',
  category: 'Tech',
  type: 'contest',
  status: 'draft',
  budget: 1000,
  start_date: new Date().toISOString(),
  end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  submission_count: 0,
  view_count: 0
});

if (error) {
  console.error('Error:', error);
} else {
  console.log('Test campaign created!');
}
```

## Security Notes

### Row Level Security (RLS)

EZSite database has built-in security:
- Tables are isolated per project
- User authentication required for all operations
- No direct SQL access from client

### Best Practices

1. **Always validate user authentication** before database operations
2. **Filter by user ID** for user-specific data
3. **Use transactions** for critical operations (via SQL API if needed)
4. **Log errors** but never expose sensitive data

## Troubleshooting

### Tables Not Created

If tables aren't auto-created:

1. Check browser console for initialization errors
2. Verify EZSite APIs are available: `window.ezsite.apis`
3. Manually initialize: `import { initializeTables } from '@/lib/db/init'; await initializeTables();`

### Query Errors

Common issues:

- **"Table not found"**: Run table initialization
- **"Field not found"**: Check schema definitions in `src/lib/db/schema.ts`
- **Empty results**: Check filters and user authentication

### Type Errors

If TypeScript complains:

1. Check field name mapping (ID vs id, CreatedTime vs created_at)
2. Ensure proper type casting for enums (status, type, etc.)
3. Parse JSON fields before use

## Next Steps

### Remaining Hooks to Migrate

The following hooks still need migration:

- [ ] `useSubmissions.tsx` - Video submissions
- [ ] `useWallet.tsx` - Wallet operations
- [ ] `useAnalytics.tsx` - Analytics data
- [ ] `useCreatorProfile.tsx` - Creator profiles
- [ ] `usePublicProfile.tsx` - Public profiles

### Additional Features

- [ ] Implement real-time updates using EZSite WebSocket (if available)
- [ ] Add caching layer for frequently accessed data
- [ ] Implement optimistic UI updates
- [ ] Add batch operations support

## Support

For EZSite Database API documentation, refer to:
- Skill: `frontend-ezsite-database-crud`
- Skill: `frontend-ezsite-database-sql` (for complex queries)
