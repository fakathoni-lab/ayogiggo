// EZSite Database Client - Adapter to replace Supabase
import { TABLES } from './schema';

declare global {
  interface Window {
    ezsite: {
      apis: {
        tablePage: (tableId: string, params: any) => Promise<{ data?: any; error?: string }>;
        tableCreate: (tableId: string, data: any) => Promise<{ error?: string }>;
        tableUpdate: (tableId: string, data: any) => Promise<{ error?: string }>;
        tableDelete: (tableId: string, data: any) => Promise<{ error?: string }>;
        GetTableList: () => Promise<{ data?: any[]; error?: string }>;
        getTableDefinition: (name: string) => Promise<{ data?: any; error?: string }>;
      };
    };
  }
}

// Helper to get table ID from table name
const tableIdCache = new Map<string, string>();

async function getTableId(tableName: string): Promise<string> {
  // Check cache first
  if (tableIdCache.has(tableName)) {
    return tableIdCache.get(tableName)!;
  }

  // Fetch from API
  const { data: tables, error } = await window.ezsite.apis.GetTableList();

  if (error) {
    throw new Error(`Failed to get table list: ${error}`);
  }

  const table = tables?.find((t: any) => t.name === tableName);

  if (!table) {
    throw new Error(`Table '${tableName}' not found. Please ensure database is initialized.`);
  }

  // Cache for future use
  tableIdCache.set(tableName, table.name);
  return table.name;
}

// Query builder interface (Supabase-compatible API)
export class QueryBuilder {
  private tableName: string;
  private filters: any[] = [];
  private orderField: string = 'ID';
  private orderAsc: boolean = false;
  private limitValue: number = 1000;
  private selectFields: string = '*';

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  select(fields: string = '*') {
    this.selectFields = fields;
    return this;
  }

  eq(field: string, value: any) {
    this.filters.push({ name: field, op: 'Equal', value: String(value) });
    return this;
  }

  neq(field: string, value: any) {
    this.filters.push({ name: field, op: 'NotEqual', value: String(value) });
    return this;
  }

  gt(field: string, value: any) {
    this.filters.push({ name: field, op: 'GreaterThan', value: String(value) });
    return this;
  }

  gte(field: string, value: any) {
    this.filters.push({ name: field, op: 'GreaterThanOrEqual', value: String(value) });
    return this;
  }

  lt(field: string, value: any) {
    this.filters.push({ name: field, op: 'LessThan', value: String(value) });
    return this;
  }

  lte(field: string, value: any) {
    this.filters.push({ name: field, op: 'LessThanOrEqual', value: String(value) });
    return this;
  }

  ilike(field: string, pattern: string) {
    // Remove % wildcards from pattern
    const value = pattern.replace(/%/g, '');
    this.filters.push({ name: field, op: 'StringContains', value });
    return this;
  }

  or(condition: string) {
    // Parse OR condition like "title.ilike.%term%,description.ilike.%term%"
    const parts = condition.split(',');

    parts.forEach(part => {
      const match = part.match(/(\w+)\.ilike\.%(.+)%/);
      if (match) {
        const [, field, value] = match;
        this.filters.push({ name: field, op: 'StringContains', value });
      }
    });

    return this;
  }

  order(field: string, options?: { ascending?: boolean }) {
    this.orderField = field;
    this.orderAsc = options?.ascending ?? false;
    return this;
  }

  limit(count: number) {
    this.limitValue = count;
    return this;
  }

  async single() {
    this.limitValue = 1;
    const result = await this.execute();

    if (result.error) {
      return { data: null, error: result.error };
    }

    return {
      data: result.data && result.data.length > 0 ? result.data[0] : null,
      error: null
    };
  }

  async maybeSingle() {
    return this.single();
  }

  private async execute() {
    try {
      const tableId = await getTableId(this.tableName);

      const { data, error } = await window.ezsite.apis.tablePage(tableId, {
        PageNo: 1,
        PageSize: this.limitValue,
        OrderByField: this.orderField,
        IsAsc: this.orderAsc,
        Filters: this.filters,
      });

      if (error) {
        return { data: null, error };
      }

      // Return the list of items
      return { data: data?.List || [], error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  }

  // Await support - makes query executable
  then(resolve: any, reject: any) {
    return this.execute().then(resolve, reject);
  }
}

// Database client object (Supabase-compatible)
export const db = {
  from: (tableName: string) => {
    return new QueryBuilder(tableName);
  },

  // Insert operation
  insert: async (tableName: string, data: any | any[]) => {
    try {
      const tableId = await getTableId(tableName);
      const records = Array.isArray(data) ? data : [data];

      // Insert records one by one (EZSite doesn't support batch insert)
      const insertedRecords = [];
      for (const record of records) {
        const { error } = await window.ezsite.apis.tableCreate(tableId, record);
        if (error) {
          return { data: null, error };
        }
        insertedRecords.push(record);
      }

      return {
        data: insertedRecords.length === 1 ? insertedRecords[0] : insertedRecords,
        error: null,
        select: () => ({
          single: async () => ({
            data: insertedRecords[0],
            error: null
          })
        })
      };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  },

  // Update operation
  update: async (tableName: string, data: any) => {
    try {
      const tableId = await getTableId(tableName);
      const { error } = await window.ezsite.apis.tableUpdate(tableId, data);

      if (error) {
        return { data: null, error };
      }

      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  },

  // Delete operation
  delete: async (tableName: string, data: any) => {
    try {
      const tableId = await getTableId(tableName);
      const { error } = await window.ezsite.apis.tableDelete(tableId, data);

      if (error) {
        return { data: null, error };
      }

      return { data: null, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  },
};

// Export auth helper for compatibility with existing code
export const auth = {
  getUser: async () => {
    try {
      const { data: userInfo, error } = await window.ezsite.apis.getUserInfo();

      if (error) {
        return {
          data: { user: null },
          error
        };
      }

      return {
        data: {
          user: userInfo ? {
            id: String(userInfo.ID),
            email: userInfo.Email,
            name: userInfo.Name,
            roles: userInfo.Roles?.split(',') || []
          } : null
        },
        error: null
      };
    } catch (err: any) {
      return {
        data: { user: null },
        error: err.message
      };
    }
  }
};
