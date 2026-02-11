// Database initialization utility
import {
  campaignsTableSchema,
  applicationsTableSchema,
  submissionsTableSchema,
  walletsTableSchema,
  transactionsTableSchema,
  brandProfilesTableSchema,
  creatorProfilesTableSchema,
} from './schema';

declare global {
  interface Window {
    ezsite: {
      apis: {
        CreateOrUpdateTable: (schema: any) => Promise<{ error?: string }>;
        GetTableList: () => Promise<{ data?: any[]; error?: string }>;
      };
    };
  }
}

const tableSchemas = [
  campaignsTableSchema,
  applicationsTableSchema,
  submissionsTableSchema,
  walletsTableSchema,
  transactionsTableSchema,
  brandProfilesTableSchema,
  creatorProfilesTableSchema,
];

export async function initializeTables() {
  console.log('🗄️ Initializing database tables...');

  try {
    // Check if tables already exist
    const { data: existingTables } = await window.ezsite.apis.GetTableList();
    const existingTableNames = existingTables?.map((t: any) => t.name) || [];

    for (const schema of tableSchemas) {
      if (existingTableNames.includes(schema.name)) {
        console.log(`✅ Table '${schema.name}' already exists`);
        continue;
      }

      console.log(`📝 Creating table '${schema.name}'...`);
      const { error } = await window.ezsite.apis.CreateOrUpdateTable(schema);

      if (error) {
        console.error(`❌ Failed to create table '${schema.name}':`, error);
        throw new Error(`Failed to create table '${schema.name}': ${error}`);
      }

      console.log(`✅ Table '${schema.name}' created successfully`);
    }

    console.log('🎉 All tables initialized successfully!');
    return { success: true };
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    return { success: false, error };
  }
}

// Auto-initialize on app load (call this from App.tsx)
export async function ensureTablesExist() {
  if (typeof window === 'undefined' || !window.ezsite?.apis) {
    console.warn('⚠️ EZSite APIs not available yet, skipping table initialization');
    return;
  }

  const result = await initializeTables();
  if (!result.success) {
    console.error('Failed to initialize database tables. Some features may not work correctly.');
  }
}
