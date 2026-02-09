// EZsite API Type Definitions
interface Window {
  ezsite: {
    apis: {
      // Auth APIs
      register: (params: {email: string;password: string;}) => Promise<{error?: string;}>;
      login: (params: {email: string;password: string;}) => Promise<{error?: string;}>;
      logout: () => Promise<{error?: string;}>;
      getUserInfo: () => Promise<{
        data?: {
          ID: string;
          Name: string;
          Email: string;
          CreateTime: string;
          Roles: string;
        };
        error?: string;
      }>;
      sendResetPwdEmail: (params: {email: string;}) => Promise<{error?: string;}>;
      resetPassword: (params: {token: string;password: string;}) => Promise<{error?: string;}>;

      // Database APIs
      listTables: (params: {
        tableName: string;
        filters?: Array<{
          name: string;
          op: 'Equal' | 'GreaterThan' | 'GreaterThanOrEqual' | 'LessThan' | 'LessThanOrEqual' | 'StringContains' | 'StringIn' | 'StringStartsWith' | 'StringEndsWith' | 'InList' | 'NotEqual';
          value: string;
        }>;
        pageNo?: number;
        pageSize?: number;
        orderByField?: string;
        isAsc?: boolean;
      }) => Promise<{
        data?: {
          list: Array<any>;
          total: number;
        };
        error?: string;
      }>;

      insertToTable: (params: {
        tableName: string;
        records: Array<any>;
      }) => Promise<{error?: string;}>;

      updateTable: (params: {
        tableName: string;
        record: any;
      }) => Promise<{error?: string;}>;

      deleteFromTable: (params: {
        tableName: string;
        record: any;
      }) => Promise<{error?: string;}>;
    };
  };
}