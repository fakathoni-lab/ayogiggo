/**
 * Video Comment Types for Pro Review System
 * Frame-accurate timestamped feedback system
 */

export interface VideoComment {
  id: string;
  submission_id: string;
  user_id: string;
  timestamp_seconds: number;
  content: string;
  is_resolved: boolean;
  created_at?: string;
}

export interface VideoCommentCreate {
  submission_id: string;
  user_id: string;
  timestamp_seconds: number;
  content: string;
  is_resolved?: boolean;
}

export interface VideoCommentUpdate {
  ID: number;
  is_resolved?: boolean;
  content?: string;
}

export type VideoCommentFilter = {
  name: "submission_id" | "user_id" | "is_resolved";
  op: "Equal" | "StringContains";
  value: string | number | boolean;
};
