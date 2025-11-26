# CLAUDE.md

_AI Assistant Guidelines for Ruby on Rails + React Applications_

This file provides guidance to AI assistants (Claude Code, Cursor, GPT, etc.) when working with code in this repository.

## Project Overview

This is a Ruby on Rails application with a React frontend that uses:

- **Backend**: Ruby on Rails 8+ with Devise for authentication
- **Frontend**: React with TypeScript, built using Vite and Inertia.js
- **Styling**: TailwindCSS with shadcn/ui components
- **Database**: SQLite (development) / PostgreSQL (production)
- **Architecture**: Inertia.js bridges Rails and React for SSR-like experience

## Golden Rules for AI Assistants

| Rule    | AI MAY                                                            | AI MUST NOT                                           |
| ------- | ----------------------------------------------------------------- | ----------------------------------------------------- |
| **G-1** | Ask for clarification when requirements are unclear               | Make assumptions about business logic or requirements |
| **G-2** | Generate code in source directories (`app/`, `app/frontend/src/`) | Modify test files without explicit request            |
| **G-3** | Add `AIDEV-NOTE:` comments for complex or non-obvious code        | Delete existing `AIDEV-` comments                     |
| **G-4** | Follow existing code patterns and conventions                     | Introduce new patterns without discussion             |
| **G-5** | Suggest improvements and refactoring                              | Perform large refactors (>300 LOC) without approval   |
| **G-6** | Implement changes and explain what was done                       | Run tests or commit code automatically                |

## Application Context

**IMPORTANT**: Always check the `./docs` or `./context` directory (if present) for detailed application documentation before making changes. These directories contain:

- Database schemas and model relationships
- API endpoints and controller structures
- Frontend component architecture
- Business logic and workflows
- Configuration details

## Key Commands

### Development Setup

```bash
# Install Ruby dependencies
bundle install

# Install Node dependencies
pnpm install  # or npm install / yarn install

# Setup database
bin/rails db:create db:migrate db:seed

# Start development server (both Rails and Vite)
bin/dev
```

### Code Generation

```bash
# IMPORTANT: Use the custom Inertia scaffold generator for React components
bin/rails generate inertia_tw_templates:scaffold ModelName field:type --framework react

# Standard generators
bin/rails generate controller ControllerName
bin/rails generate model ModelName field:type
bin/rails generate migration CreateTableName
```

### Testing

```bash
# Run the test suite
bundle exec rspec

# Run specific test file
bundle exec rspec spec/models/model_name_spec.rb

# Run with coverage
COVERAGE=true bundle exec rspec
```

### Code Quality

```bash
# Run linting/formatting
bundle exec rubocop
bundle exec standardrb --fix

# Security scanning
bundle exec brakeman
```

## Architecture Overview

### Backend Structure

- **Controllers**: `app/controllers/` - Handle HTTP requests and render Inertia responses
- **Models**: `app/models/` - Rails ActiveRecord models
- **Services**: `app/services/` - Business logic and complex operations
- **Jobs**: `app/jobs/` - Background job processing
- **Mailers**: `app/mailers/` - Email notifications

### Frontend Structure

- **Entry Points**: `app/frontend/entrypoints/` - Vite entry points
- **Components**: `app/frontend/src/components/` - React components
  - `ui/` - shadcn/ui base components
  - `common/` - Shared components
  - `[feature]/` - Feature-specific components
- **Hooks**: `app/frontend/src/hooks/` - Custom React hooks
- **Utils**: `app/frontend/src/utils/` - Utility functions
- **Views**: `app/views/` - Inertia pages as React components (.tsx)

## Development Conventions

### Inertia.js Patterns

```ruby
# ✅ CORRECT - Use lowercase snake_case for Inertia paths
render inertia: "users/show", props: { user: @user }

# ❌ INCORRECT - Don't use PascalCase
render inertia: "Users/Show", props: { user: @user }
```

#### Error Handling Pattern

Always format errors for Inertia using a helper method and preserve navigation context:

```ruby
# In your controller - add this helper method
def format_errors_for_inertia(record)
  record.errors.attribute_names.index_with do |attr|
    record.errors.full_messages_for(attr)
  end
end

# Use redirect_back_or_to to preserve the page context
def create
  @resource = Resource.new(resource_params)

  if @resource.save
    redirect_to resources_url, notice: "Resource was successfully created."
  else
    # AIDEV-NOTE: Redirect back preserves origin page (dashboard, index, etc)
    # Modal stays open, Inertia soft-navigates with errors
    redirect_back_or_to resources_url, inertia: { errors: format_errors_for_inertia(@resource) }
  end
end
```

**Key principles:**
- Pass errors via Inertia props, NOT flash messages
- Use `redirect_back_or_to` to maintain user context
- Format errors with full messages for i18n support
- Errors structure: `{ field_name: ["Error message 1", "Error message 2"] }`

### React Component Guidelines

- Extract components when they exceed 200 lines
- Use TypeScript interfaces for prop types
- Follow naming conventions: PascalCase for components, camelCase for functions
- Co-locate related components in feature folders
- Use custom hooks for complex state logic

#### Form Component Pattern

Forms should accept an `onSuccess` callback for modal workflows and properly handle errors:

```typescript
interface FormProps {
  resource: any;
  onSubmit: (form: any) => void;
  onSuccess?: () => void;  // Optional callback for modal close
  submitText: string;
}

export default function Form({ resource, onSubmit, onSuccess, submitText }: FormProps) {
  const form = useForm({ /* initial data */ });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // AIDEV-NOTE: Wrap form methods to inject onSuccess callback
    const formWithCallback = {
      ...form,
      post: (url: string, options = {}) => {
        return form.post(url, {
          ...options,
          onSuccess: () => { if (onSuccess) onSuccess(); }
        });
      },
      patch: (url: string, options = {}) => {
        return form.patch(url, {
          ...options,
          onSuccess: () => { if (onSuccess) onSuccess(); }
        });
      }
    };

    onSubmit(formWithCallback);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      {errors.field && (
        <p className="text-sm font-medium text-destructive">
          {(errors.field as string[]).join(", ")}
        </p>
      )}
    </form>
  );
}
```

**Key principles:**
- Always define TypeScript interfaces for component props
- Accept optional `onSuccess` callback for modal workflows
- Type cast errors as `string[]` before joining: `(errors.field as string[]).join(", ")`
- Wrap form methods to inject callbacks when needed

#### Empty Object Pattern

When creating forms for new resources, define empty objects with proper defaults:

```typescript
// AIDEV-NOTE: Empty object with defaults for creating new resources
const emptyResource = {
  title: "",
  description: "",
  status: "",
  published: false,
};

<New resource={emptyResource} isModal={true} onSuccess={() => setDialogOpen(false)} />
```

#### Table Meta Pattern

Use TanStack Table's `meta` option to pass callbacks for row actions:

```typescript
const table = useReactTable({
  data,
  columns,
  // ... other options
  meta: {
    onEdit: handleEdit,
    onDelete: handleDelete,
  },
});

// In column definition
{
  id: "actions",
  cell: ({ row, table }) => {
    const onEdit = (table.options.meta as any)?.onEdit;
    return (
      <Button onClick={() => onEdit?.(row.original)}>
        Edit
      </Button>
    );
  },
}
```

**Key principles:**
- Pass callbacks via `meta` instead of props drilling
- Use type-safe access: `(table.options.meta as any)?.callback`
- Check callback existence with optional chaining: `callback?.()`

### Import Conventions

Maintain consistent import patterns across the frontend codebase:

```typescript
// ✅ CORRECT - Use path aliases for cleaner imports
import { Button } from "@ui/button";
import { Card, CardContent } from "@ui/card";
import * as routes from "@src/routes";
import { SiteHeader } from "@src/components/common/site-header";

// ❌ INCORRECT - Avoid complex relative paths
import { Button } from "../../../components/ui/button";
import { Card } from "../../ui/card";
```

**Import order (recommended):**
1. External dependencies (React, Inertia, libraries)
2. `@ui/` components (shadcn/ui)
3. `@src/` imports (routes, hooks, utils)
4. Local imports (relative paths for same directory)
5. Type imports (if separated)

**Path aliases:**
- `@ui/` → `app/frontend/src/components/ui/`
- `@src/` → `app/frontend/src/`
- Configure in `tsconfig.json` and `vite.config.ts`

### Navigation Patterns

#### Active Route Detection

Implement active state detection for navigation items (e.g., sidebar):

```typescript
import { usePage } from "@inertiajs/react";

export function NavMain({ items }: { items: NavItem[] }) {
  const { url: currentUrl } = usePage();

  // AIDEV-NOTE: Check if current URL matches item URL for active state
  const isActiveRoute = (itemUrl: string) => {
    // Exact match for root path
    if (itemUrl === "/" && currentUrl === "/") return true;
    // For other paths, check if current URL starts with the item URL
    if (itemUrl !== "/" && currentUrl.startsWith(itemUrl)) return true;
    return false;
  };

  return (
    <nav>
      {items.map((item) => (
        <NavLink
          key={item.url}
          href={item.url}
          isActive={isActiveRoute(item.url)}
        >
          {item.title}
        </NavLink>
      ))}
    </nav>
  );
}
```

**Key principles:**
- Use `usePage().url` to get current URL in Inertia
- Handle root path (`/`) separately with exact match
- Use `startsWith()` for nested routes (e.g., `/articles/1` matches `/articles`)
- Apply active state to navigation components via `isActive` prop

### Testing Patterns

```ruby
# Controller specs - stub authentication
RSpec.describe UsersController, type: :controller do
  let(:user) { create(:user) }
  before do
    allow(controller).to receive(:current_user).and_return(user)
  end
end

# Request specs - use sign_in helper
RSpec.describe "Users", type: :request do
  let(:user) { create(:user) }
  before { sign_in user }
end
```

## AIDEV Anchor Comments

Add specially formatted comments for important context:

```ruby
# AIDEV-NOTE: Performance critical - avoid N+1 queries
# AIDEV-TODO: Refactor when user count exceeds 10k
# AIDEV-QUESTION: Should this handle soft deletes?
```

**Guidelines**:

- Keep comments concise (≤ 120 chars)
- Update relevant anchors when modifying code
- Never remove `AIDEV-` comments without explicit instruction
- Add anchors for complex, important, or potentially confusing code

## Commit Guidelines

### Message Format

```bash
# Standard format: type: description
feat: add user profile management
fix: resolve N+1 query in dashboard
refactor: extract notification service
docs: update API documentation
test: add coverage for user authentication
```

### Rules

- One logical change per commit
- Never include AI attribution in commits
- Write messages as if written by a human developer
- Reference issue numbers when applicable: `fix: resolve login issue (#123)`

## Git Workflow

- **Never commit without explicit user request**
- Implement changes and explain what was done
- User reviews changes before committing
- Only commit when user explicitly asks (e.g., "commit this", "make a commit")

## AI Assistant Workflow

When responding to instructions:

1. **Understand Context**: Review relevant documentation and existing code
2. **Clarify if Needed**: Ask targeted questions for ambiguous requirements
3. **Plan Approach**: Break down complex tasks into steps
4. **Implement**: Make changes following conventions
5. **Explain**: Describe what was changed and why
6. **Update Documentation**: Add/update AIDEV comments where appropriate
7. **Request Review**: Ask user to review before proceeding

## Common Pitfalls to Avoid

- Mixing testing frameworks (RSpec vs Minitest syntax)
- Forgetting to activate virtual environment
- Creating ERB views instead of React components
- Modifying generated files (e.g., schema.rb)
- Making large refactors without discussion
- Assuming business logic requirements
- Auto-committing or auto-testing code

## When to Ask for Clarification

Always ask when:

- Requirements involve business logic
- Changes affect >3 files or >300 lines
- Introducing new dependencies or patterns
- Uncertain about performance implications
- Dealing with security-sensitive code
- Migration involves data transformation

## Performance Considerations

- Use Rails eager loading to avoid N+1 queries
- Implement pagination for large datasets
- Add database indexes for frequently queried columns
- Use background jobs for time-consuming operations
- Cache expensive computations
- Optimize React re-renders with memo and callbacks

## Security Best Practices

- Never commit credentials or secrets
- Use Rails strong parameters
- Validate and sanitize user input
- Use CSRF protection
- Implement proper authorization (not just authentication)
- Be cautious with user-generated content

---

_Remember: This is a collaborative process. The AI assists development but critical decisions remain with humans._
