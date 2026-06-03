# Student Dashboard — Next-Gen Learning Platform

A premium, fully-animated student dashboard prototype built with **Next.js 15 (App Router)**, **Supabase**, **Tailwind CSS**, and **Framer Motion**. Features a dark-mode-only Bento Grid layout with hardware-accelerated animations, server-side data fetching, and zero layout shifts.

## 🚀 Live Demo

> **Deploy to Vercel**: Push to GitHub → Vercel auto-deploys. Add Supabase env vars in Vercel project settings. Done in <2 minutes.
>
> **Repository**: [github.com/Vishal-Bisht/Student-Dashboard](https://github.com/Vishal-Bisht/Student-Dashboard)

## Tech Stack

| Tool | Purpose |
|---|---|
| **Next.js 15 (App Router)** | Framework, Server Components, Suspense |
| **Supabase** | PostgreSQL database + `@supabase/ssr` for secure server-side access |
| **Tailwind CSS** | Utility-first styling with a custom design system |
| **Framer Motion** | Spring-physics animations, stagger, layout animations |
| **Lucide React** | Dynamically rendered icons from database `icon_name` field |
| **TypeScript** | End-to-end type safety |

---

## Setup

### 1. Clone & install

```bash
git clone https://github.com/Vishal-Bisht/Student-Dashboard.git
cd Student-Dashboard
npm install
```

### 2. Supabase setup

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase-seed.sql`
3. Grab your project URL and anon key from **Settings → API**

### 3. Environment variables

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the dashboard.

### 5. Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Then add your Supabase env vars in the Vercel project settings.

---

## 📊 Features

### Bento Grid Layout
- **Hero Tile**: Welcome greeting with daily learning streak indicator
- **Course Cards**: Dynamically fetched from Supabase with animated progress bars
- **Activity Tile**: Contribution graph / activity visualization
- **Stats Tile**: Key metrics display
- **Responsive**: Desktop (3-col), Tablet (2-col), Mobile (1-col stacked)

### Animations
- ✨ **Staggered entrance**: Tiles fade and slide up sequentially
- 🎯 **Spring physics**: Natural, non-linear hover elevations (scale + glow)
- 📍 **Layout animations**: Sidebar nav highlight snaps between items using `layoutId`
- 📊 **Progress bar animation**: Animates from 0% to final value on visibility
- ⏸️ **Skeleton pulses**: Loading states with subtle pulsing skeletons

## 🏗️ Architecture

### Data Fetching Strategy (Server Components)

All database queries happen on the server, never exposing credentials to the browser:

- **`lib/supabase-server.ts`** — Creates a secure Supabase client using `@supabase/ssr` with Next.js `cookies()` API
- **`lib/data.ts`** — Exports async functions like `getCourses()` that are called directly in Server Components
- **`components/dashboard/CoursesGrid.tsx`** — Server Component that `await`s the database query and renders course cards

**Why this approach?**
1. ✅ Secrets stay on the server (environment variables never exposed to browser)
2. ✅ Zero client-side data fetching overhead
3. ✅ Database logic is co-located with rendering
4. ✅ Automatic caching via Next.js (configured via `revalidate: 60`)

### Client vs Server Components

**Server Components** (data-fetching layer):
- `components/dashboard/CoursesGrid.tsx` — fetches courses from Supabase

**Client Components** (interactivity & animations):
- `components/dashboard/Sidebar.tsx` — navigation state, collapse toggle
- `components/dashboard/CourseCard.tsx` — progress bar animations, hover effects
- `components/dashboard/HeroTile.tsx`, `ActivityTile.tsx`, `StatsTile.tsx` — entrance animations

### Suspense & Loading States

```tsx
<Suspense fallback={<CoursesLoadingSkeleton />}>
  <CoursesGrid />
</Suspense>
```

- Skeleton loaders appear **immediately** while the async database query runs
- Uses CSS animation (`pulse_glow`) for subtle pulsing effect
- Route-level `app/loading.tsx` covers the initial page visit

### Animation Architecture

**Entrance animations** — staggered with computed delay:
```typescript
const delay = 0.05 + (index * 0.08);
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay, type: "spring", stiffness: 300, damping: 25 }}
```

**Hover effects** — spring physics with zero layout shift:
```typescript
whileHover={{ scale: 1.018 }}
transition={{ type: "spring", stiffness: 300, damping: 20 }}
```
✅ Only `scale` and `opacity` change — no `width`, `height`, or `margin` mutations → **zero repaints**

**Progress bars** — visibility-triggered animation:
- Uses `useInView` from `react-intersection-observer`
- Only animates when card enters viewport
- Prevents unnecessary calculations off-screen

**Navigation highlight** — `layoutId` magic:
```typescript
{isActive && (
  <motion.span
    layoutId="nav-highlight"
    className="...highlight..."
    transition={{ type: "spring", stiffness: 400, damping: 30 }}
  />
)}
```
The highlight element smoothly animates to the active nav item without re-mounting.

### Type Safety

Full TypeScript coverage:

**`types/index.ts`**:
```typescript
export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}
```

All components use these interfaces for props and Supabase queries.

### Responsive Design

| Breakpoint | Layout | Sidebar |
|---|---|---|
| **Mobile** `<768px` | 1-column stacked | Bottom nav (sticky) |
| **Tablet** `768–1024px` | 2-column grid | Collapsed (icons only, 68px) |
| **Desktop** `>1024px` | 3-column grid | Full sidebar (220px) |

---

## 🔧 Key Implementation Details

### Dynamic Icon Rendering

Lucide doesn't provide a string→component map. Solution:

```typescript
const iconName = "code-2";
const PascalCased = toPascalCase(iconName); // "Code2"
const IconComponent = (LucideIcons as Record<string, any>)[PascalCased];
const Icon = IconComponent || BookOpen; // fallback
```

### Supabase Database Schema

```sql
CREATE TABLE courses (
  id uuid PRIMARY KEY,
  title TEXT NOT NULL,
  progress INTEGER NOT NULL,
  icon_name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);
```

See `supabase-seed.sql` for example data.

### Environment Variables

**`.env.local` (never commit)**:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

**`.env.example` (safe to commit)**:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

---

## 🎨 Design System

**Color Palette** (Tailwind config):
- **Background**: `bg-base` (#080B0F), `bg-surface` (#0D1117), `bg-elevated` (#131920)
- **Accents**: `accent-cyan` (#00E5FF), `accent-violet` (#A78BFA), `accent-emerald` (#10B981)

**Animations**:
- **Shimmer**: Loading skeleton effect
- **Pulse Glow**: Subtle opacity pulse
- **Streak In**: Progress bar fill animation

---

## 🚧 Challenges & Lessons Learned

### 1. Dynamic Icon Rendering from Database

**Challenge**: Lucide doesn't provide a string→component registry. Storing icon names as strings in the database meant we needed runtime resolution.

**Solution**: Convert the snake_case icon name to PascalCase, then use dynamic lookups on the Lucide namespace:
```typescript
const toPascalCase = (str: string) => 
  str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
```

**Lesson**: Always plan for flexibility when integrating third-party icon libraries. Consider a fallback strategy.

### 2. @supabase/ssr in Next.js 15 Server Components

**Challenge**: `cookies()` is async in Next.js 15, but the Supabase SSR client's `setAll` handler expects synchronous operations. Server Components cannot mutate headers directly.

**Solution**: Wrap the `setAll` handler in a try/catch. Per Supabase docs, failures are expected and safe to silently ignore in Server Components — only Route Handlers and Server Actions can actually set cookies.

```typescript
setAll(cookiesToSet) {
  try {
    cookiesToSet.forEach(({ name, value, options }) =>
      cookieStore.set(name, value, options)
    );
  } catch {
    // Intentional silent catch for Server Components
  }
}
```

**Lesson**: When using experimental APIs (like Supabase SSR with Server Components), read the fine print. Error handling isn't always about fixing the error — sometimes it's about graceful degradation.

### 3. Zero Layout Shifts with Animations

**Challenge**: Initial hover states and animations can trigger layout recalculations if they modify `width`, `height`, `padding`, or `margin`. This causes jank and poor performance metrics.

**Solution**: Only animate `transform` (scale, translate) and `opacity`. All hover effects use:
```typescript
whileHover={{ scale: 1.018 }}
whileTap={{ scale: 0.98 }}
// Never: whileHover={{ width: "...", padding: "..." }}
```

**Lesson**: Performance-first design means understanding browser rendering. `transform` and `opacity` are "free" — they don't trigger reflows.

### 4. Suspense Boundaries vs Route-Level Loading States

**Challenge**: Should we use `app/loading.tsx` or wrap components in `<Suspense>`?

**Solution**: Use both:
- **Route-level `loading.tsx`**: Covers the initial page load (navigation)
- **Suspense boundaries**: Granular control within the page (e.g., fallback skeleton for courses while hero tile renders)

This provides both a fast initial response and smooth, progressive UI updates.

**Lesson**: Suspense is powerful, but route-level loading states are a coarser safety net for slower first loads.

### 5. Responsive Sidebar Complexity

**Challenge**: A sidebar that transforms from full-width → icon-only → hidden across three breakpoints while maintaining smooth animations and state.

**Solution**: Use Framer Motion's `animate` prop with computed width:
```typescript
animate={{ width: collapsed ? 68 : 220 }}
transition={{ type: "spring", stiffness: 300, damping: 30 }}
```

Hide/show text and logo with `<AnimatePresence>` to prevent layout thrashing.

**Lesson**: Framer Motion's spring animations handle responsive transitions gracefully — use them to choreograph complex state changes.

---

## 📚 Resources

- **Next.js Docs**: [nextjs.org](https://nextjs.org) — App Router, Server Components, Suspense
- **Supabase SSR**: [supabase.com/docs/guides/auth/server-side-rendering](https://supabase.com/docs/guides/auth/server-side-rendering)
- **Framer Motion**: [framer.com/motion](https://framer.com/motion) — Spring physics, layout animations
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com) — Utility-first styling

---

## 📄 License

MIT — feel free to fork and build on this!

---

**Built with ❤️ by Vishal Bisht**
