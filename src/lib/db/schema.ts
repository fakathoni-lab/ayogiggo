// Database table definitions for Giggo
// These tables will be created using EZSite Database APIs

export const TABLES = {
  CAMPAIGNS: 'campaigns',
  APPLICATIONS: 'applications',
  SUBMISSIONS: 'submissions',
  WALLETS: 'wallets',
  TRANSACTIONS: 'transactions',
  BRAND_PROFILES: 'brand_profiles',
  CREATOR_PROFILES: 'creator_profiles',
} as const;

// Campaign table schema
export const campaignsTableSchema = {
  name: 'campaigns',
  displayName: 'Campaigns',
  desc: 'Campaign/Gig management table',
  fields: [
    { name: 'brand_id', displayName: 'Brand ID', valueType: 'String', desc: 'User ID of brand owner' },
    { name: 'title', displayName: 'Title', valueType: 'String', desc: 'Campaign title' },
    { name: 'description', displayName: 'Description', valueType: 'String', componentType: 'TextArea', desc: 'Campaign description' },
    { name: 'brief', displayName: 'Brief', valueType: 'String', componentType: 'TextArea', desc: 'Detailed campaign brief' },
    { name: 'category', displayName: 'Category', valueType: 'String', desc: 'Campaign category' },
    { name: 'type', displayName: 'Type', valueType: 'String', componentType: 'Select', options: 'contest:Contest,deal:Deal', desc: 'Campaign type' },
    { name: 'status', displayName: 'Status', valueType: 'String', componentType: 'Select', options: 'draft:Draft,live:Live,judging:Judging,completed:Completed,cancelled:Cancelled', desc: 'Campaign status' },
    { name: 'budget', displayName: 'Budget', valueType: 'Number', desc: 'Total campaign budget' },
    { name: 'cover_image', displayName: 'Cover Image', valueType: 'String', componentType: 'Image', desc: 'Campaign cover image URL' },
    { name: 'start_date', displayName: 'Start Date', valueType: 'DateTime', desc: 'Campaign start date' },
    { name: 'end_date', displayName: 'End Date', valueType: 'DateTime', desc: 'Campaign end date' },
    { name: 'submission_count', displayName: 'Submission Count', valueType: 'Integer', defaultValue: '0', desc: 'Number of submissions' },
    { name: 'view_count', displayName: 'View Count', valueType: 'Integer', defaultValue: '0', desc: 'Number of views' },
    { name: 'prize_breakdown', displayName: 'Prize Breakdown', valueType: 'String', componentType: 'TextArea', desc: 'JSON: Prize breakdown by rank' },
    { name: 'required_hashtags', displayName: 'Required Hashtags', valueType: 'String', desc: 'Comma-separated hashtags' },
    { name: 'platform_requirements', displayName: 'Platform Requirements', valueType: 'String', desc: 'Comma-separated platforms' },
    { name: 'rules', displayName: 'Rules', valueType: 'String', componentType: 'TextArea', desc: 'Campaign rules' },
  ]
};

// Applications table schema
export const applicationsTableSchema = {
  name: 'applications',
  displayName: 'Applications',
  desc: 'Creator applications to campaigns',
  fields: [
    { name: 'campaign_id', displayName: 'Campaign ID', valueType: 'Integer', desc: 'Reference to campaign' },
    { name: 'creator_id', displayName: 'Creator ID', valueType: 'String', desc: 'User ID of creator' },
    { name: 'status', displayName: 'Status', valueType: 'String', componentType: 'Select', options: 'applied:Applied,hired:Hired,rejected:Rejected,completed:Completed', desc: 'Application status' },
    { name: 'cover_letter', displayName: 'Cover Letter', valueType: 'String', componentType: 'TextArea', desc: 'Creator cover letter' },
    { name: 'portfolio_url', displayName: 'Portfolio URL', valueType: 'String', desc: 'Creator portfolio URL' },
  ]
};

// Submissions table schema
export const submissionsTableSchema = {
  name: 'submissions',
  displayName: 'Submissions',
  desc: 'Creator content submissions',
  fields: [
    { name: 'campaign_id', displayName: 'Campaign ID', valueType: 'Integer', desc: 'Reference to campaign' },
    { name: 'creator_id', displayName: 'Creator ID', valueType: 'String', desc: 'User ID of creator' },
    { name: 'application_id', displayName: 'Application ID', valueType: 'Integer', desc: 'Reference to application' },
    { name: 'video_url', displayName: 'Video URL', valueType: 'String', componentType: 'File', desc: 'Submitted video URL' },
    { name: 'thumbnail_url', displayName: 'Thumbnail URL', valueType: 'String', componentType: 'Image', desc: 'Video thumbnail URL' },
    { name: 'title', displayName: 'Title', valueType: 'String', desc: 'Submission title' },
    { name: 'description', displayName: 'Description', valueType: 'String', componentType: 'TextArea', desc: 'Submission description' },
    { name: 'status', displayName: 'Status', valueType: 'String', componentType: 'Select', options: 'pending:Pending,approved:Approved,rejected:Rejected,winner:Winner', desc: 'Submission status' },
    { name: 'feedback', displayName: 'Feedback', valueType: 'String', componentType: 'TextArea', desc: 'Brand feedback' },
    { name: 'views', displayName: 'Views', valueType: 'Integer', defaultValue: '0', desc: 'Number of views' },
    { name: 'likes', displayName: 'Likes', valueType: 'Integer', defaultValue: '0', desc: 'Number of likes' },
  ]
};

// Wallets table schema
export const walletsTableSchema = {
  name: 'wallets',
  displayName: 'Wallets',
  desc: 'User wallet balances',
  fields: [
    { name: 'user_id', displayName: 'User ID', valueType: 'String', desc: 'User ID' },
    { name: 'balance', displayName: 'Balance', valueType: 'Number', defaultValue: '0', desc: 'Available balance' },
    { name: 'pending_balance', displayName: 'Pending Balance', valueType: 'Number', defaultValue: '0', desc: 'Pending balance' },
    { name: 'total_earned', displayName: 'Total Earned', valueType: 'Number', defaultValue: '0', desc: 'Total earned amount' },
    { name: 'total_withdrawn', displayName: 'Total Withdrawn', valueType: 'Number', defaultValue: '0', desc: 'Total withdrawn amount' },
  ]
};

// Transactions table schema
export const transactionsTableSchema = {
  name: 'transactions',
  displayName: 'Transactions',
  desc: 'Transaction ledger for audit trail',
  fields: [
    { name: 'user_id', displayName: 'User ID', valueType: 'String', desc: 'User ID' },
    { name: 'type', displayName: 'Type', valueType: 'String', componentType: 'Select', options: 'earning:Earning,withdrawal:Withdrawal,payment:Payment,refund:Refund', desc: 'Transaction type' },
    { name: 'amount', displayName: 'Amount', valueType: 'Number', desc: 'Transaction amount' },
    { name: 'status', displayName: 'Status', valueType: 'String', componentType: 'Select', options: 'pending:Pending,completed:Completed,failed:Failed', desc: 'Transaction status' },
    { name: 'reference_id', displayName: 'Reference ID', valueType: 'String', desc: 'Reference to related entity' },
    { name: 'reference_type', displayName: 'Reference Type', valueType: 'String', desc: 'Type of reference (campaign, submission, etc)' },
    { name: 'description', displayName: 'Description', valueType: 'String', componentType: 'TextArea', desc: 'Transaction description' },
    { name: 'metadata', displayName: 'Metadata', valueType: 'String', componentType: 'TextArea', desc: 'Additional metadata (JSON)' },
  ]
};

// Brand Profiles table schema
export const brandProfilesTableSchema = {
  name: 'brand_profiles',
  displayName: 'Brand Profiles',
  desc: 'Brand company profiles',
  fields: [
    { name: 'user_id', displayName: 'User ID', valueType: 'String', desc: 'User ID' },
    { name: 'company_name', displayName: 'Company Name', valueType: 'String', desc: 'Company name' },
    { name: 'company_logo', displayName: 'Company Logo', valueType: 'String', componentType: 'Image', desc: 'Company logo URL' },
    { name: 'website', displayName: 'Website', valueType: 'String', desc: 'Company website' },
    { name: 'industry', displayName: 'Industry', valueType: 'String', desc: 'Company industry' },
    { name: 'description', displayName: 'Description', valueType: 'String', componentType: 'TextArea', desc: 'Company description' },
  ]
};

// Creator Profiles table schema
export const creatorProfilesTableSchema = {
  name: 'creator_profiles',
  displayName: 'Creator Profiles',
  desc: 'Creator profiles',
  fields: [
    { name: 'user_id', displayName: 'User ID', valueType: 'String', desc: 'User ID' },
    { name: 'display_name', displayName: 'Display Name', valueType: 'String', desc: 'Creator display name' },
    { name: 'avatar_url', displayName: 'Avatar URL', valueType: 'String', componentType: 'Image', desc: 'Creator avatar URL' },
    { name: 'bio', displayName: 'Bio', valueType: 'String', componentType: 'TextArea', desc: 'Creator bio' },
    { name: 'portfolio_url', displayName: 'Portfolio URL', valueType: 'String', desc: 'Portfolio URL' },
    { name: 'social_links', displayName: 'Social Links', valueType: 'String', componentType: 'TextArea', desc: 'JSON: Social media links' },
    { name: 'categories', displayName: 'Categories', valueType: 'String', desc: 'Comma-separated categories' },
    { name: 'reliability_score', displayName: 'Reliability Score', valueType: 'Integer', defaultValue: '0', desc: 'Creator reliability score' },
    { name: 'total_gigs', displayName: 'Total Gigs', valueType: 'Integer', defaultValue: '0', desc: 'Total gigs completed' },
    { name: 'total_earnings', displayName: 'Total Earnings', valueType: 'Number', defaultValue: '0', desc: 'Total earnings' },
  ]
};
