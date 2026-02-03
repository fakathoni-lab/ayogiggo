# Pro Video Review System - Technical Documentation

## Overview
Frame-accurate video review system with timestamped comments, similar to Frame.io or Billo. Enables Brands to provide precise feedback on creator submissions with timeline markers.

## Architecture

### Database Schema
**Table: `submission_feedback` (ID: 74437)**
```typescript
{
  id: uuid (PK)
  submission_id: string (FK → submissions)
  user_id: string (FK → auth.users)
  timestamp_seconds: number (e.g., 12.5)
  content: text
  is_resolved: boolean
  created_at: timestamp
}
```

### Components

#### 1. ProVideoPlayer
**Location:** `/src/components/submissions/ProVideoPlayer.tsx`

**Features:**
- Custom HTML5 video player with cyberpunk-styled controls
- Frame-accurate timeline with clickable markers
- Neon gradient progress bar (cyan → purple)
- Watermark overlay for pending/review status videos
- Comment markers (red = unresolved, green = resolved)
- Disabled right-click and download protection

**Props:**
```typescript
{
  videoUrl: string
  comments?: VideoComment[]
  onTimeClick?: (time: number) => void
  onCommentClick?: (comment: VideoComment) => void
  showWatermark?: boolean
  currentTime?: number // External control
}
```

**UX Behaviors:**
- Click timeline → Triggers comment creation at that timestamp
- Click marker → Seeks video + highlights comment in sidebar
- Hover → Show controls overlay
- Auto-hide controls during playback

#### 2. VideoCommentsSidebar
**Location:** `/src/components/submissions/VideoCommentsSidebar.tsx`

**Features:**
- Scrollable list of timestamped comments
- Real-time sync with video playback
- Click comment → Seek video to timestamp
- Resolve/Delete actions (owner only)
- New comment form with timestamp display

**Props:**
```typescript
{
  submissionId: string
  comments: VideoComment[]
  currentUserId: string
  newCommentTimestamp: number | null
  onCommentClick: (comment: VideoComment) => void
  onAddComment: (timestamp: number, content: string) => Promise<void>
  onResolveComment: (commentId: string) => Promise<void>
  onDeleteComment: (commentId: string) => Promise<void>
}
```

**Visual States:**
- Unresolved: Red border, default background
- Resolved: Green border, green/10 background
- Active: Cyan ring-2 border

#### 3. ProVideoReviewInterface
**Location:** `/src/components/submissions/ProVideoReviewInterface.tsx`

**Orchestrator Component** - Connects player + sidebar + database

**Key Responsibilities:**
1. Load comments from Ezsite DB (table 74437)
2. Optimistic UI updates for all mutations
3. Bidirectional sync: video ↔ comments
4. Watermark logic based on submission status

**State Management:**
```typescript
const [comments, setComments] = useState<VideoComment[]>([])
const [clickedTimestamp, setClickedTimestamp] = useState<number | null>(null)
const [seekToTime, setSeekToTime] = useState<number | undefined>()
```

## Data Flow

### 1. Adding a Comment
```
User clicks timeline at 12.5s
  → ProVideoPlayer.onTimeClick(12.5)
  → ProVideoReviewInterface.handleTimelineClick(12.5)
  → setClickedTimestamp(12.5)
  → VideoCommentsSidebar shows input form with "0:12.5"
  → User types feedback + clicks "Add Comment"
  → handleAddComment (Optimistic UI)
      → Immediately add temp comment to state
      → window.ezsite.apis.tableCreate(74437, {...})
      → If success: reload to get real ID
      → If error: revert optimistic update
  → Toast notification
```

### 2. Clicking a Comment
```
User clicks comment in sidebar
  → VideoCommentsSidebar.onCommentClick(comment)
  → ProVideoReviewInterface.handleCommentClick(comment)
  → setSeekToTime(comment.timestamp_seconds)
  → ProVideoPlayer receives currentTime prop
  → videoRef.current.currentTime = timestamp
  → Video seeks to exact frame
```

### 3. Resolving a Comment
```
Brand clicks "Resolve" button
  → VideoCommentsSidebar.handleResolve(commentId)
  → Optimistic: set comment.is_resolved = true
  → window.ezsite.apis.tableUpdate(74437, {ID, is_resolved: true})
  → If error: revert to is_resolved = false
```

## Security & RLS

**Database Access:**
- Only Brand (campaign owner) and Creator (applicant) can view/edit
- User ID from `useAuth()` hook
- All mutations validate user ownership

**Watermark Protection:**
- Enabled when `status === 'submitted' || 'redo_requested'`
- CSS overlay: "PREVIEW ONLY - GIGGO"
- `onContextMenu={e => e.preventDefault()}`
- `controlsList="nodownload"`

## Performance Optimizations

1. **Optimistic UI:** All mutations show instant feedback
2. **Debounced Progress:** Video timeUpdate throttled
3. **Lazy Markers:** Only render visible timeline markers
4. **Skeleton Loading:** Instant perceived load time
5. **Framer Motion:** Smooth 60fps animations

## Styling (Cyberpunk Theme)

**Color Palette:**
- Primary: `cyan-500` → `purple-500` gradients
- Success: `green-500/10` background, `green-500` border
- Warning: `red-500` with pulse animation
- Background: `bg-black` for video container

**Key Classes:**
```css
.progress-bar → bg-gradient-to-r from-cyan-500 to-purple-500
.marker-unresolved → bg-red-500 border-red-300 animate-pulse
.marker-resolved → bg-green-500 border-green-300
.watermark → text-white/30 rotate-[-30deg]
```

## Integration with Existing System

**SubmissionReviewCard.tsx:**
```tsx
// Added import
import { ProVideoReviewInterface } from "./ProVideoReviewInterface"

// Added state
const [showVideoReview, setShowVideoReview] = useState(false)

// Added toggle button
{submission.video_url && (
  <Button onClick={() => setShowVideoReview(!showVideoReview)}>
    <Video /> Review Video with Comments
  </Button>
)}

// Added expandable section
<AnimatePresence>
  {showVideoReview && submission.video_url && user?.id && (
    <ProVideoReviewInterface
      submissionId={submission.id}
      videoUrl={submission.video_url}
      currentUserId={user.id}
      submissionStatus={submission.status}
    />
  )}
</AnimatePresence>
```

## Testing Checklist

- [ ] Click timeline → Comment form appears with correct timestamp
- [ ] Add comment → Marker appears on timeline
- [ ] Click marker → Video seeks to exact timestamp
- [ ] Click comment in sidebar → Video seeks
- [ ] Resolve comment → Marker turns green
- [ ] Delete comment → Marker disappears
- [ ] Watermark shows for pending/redo status
- [ ] Watermark hides for approved/declined
- [ ] Right-click disabled on video
- [ ] Mobile responsive (stacked layout)
- [ ] Optimistic UI reverts on error
- [ ] Multiple comments at same timestamp handled

## Future Enhancements

1. **Drawing Tools:** Arrow/circle annotations on video frame
2. **Emoji Reactions:** Quick feedback without typing
3. **Comment Threads:** Replies to specific feedback
4. **Version History:** Compare before/after revisions
5. **Export Report:** PDF with screenshot + comments
6. **Keyboard Shortcuts:** Space (play/pause), J/L (seek)
7. **Frame Stepping:** Left/Right arrows for frame-by-frame

## GIGGO Constitution Compliance

✅ **Security:** RLS enforced via user_id filtering
✅ **Validation:** Zod schemas for comment content
✅ **UX:** Skeleton loaders + Optimistic UI
✅ **Feedback:** Toast (Sonner) for all actions
✅ **Performance:** No 'any' types, strict TypeScript
✅ **Database:** Ezsite Database only (table 74437)
✅ **Design:** Cyberpunk neon aesthetic with Framer Motion

---

**Built for Giggo** | Frame-Accurate Creator Feedback System
