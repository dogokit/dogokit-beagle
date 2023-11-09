# Guide: Codebase

> 🚧 WIP

Codebase structure to understand.

---

## For Application

### Routes

Remix (React Router) routes inside `/app/routes`

- `/*`: Commonly used routes
- `/_root_.*`: Root routes for owner or super admin
- `/_admin.*`: Admin routes
- `/_user.*`: User routes
- `/_page.*`: Public page routes

### Components

React JSX components inside `/app/components`

- `/ui`: Common UI components with Tailwind CSS and Radix UI
- `/shared`: Shared UI components for complex and custom logic
- `/layout`: Layout UI components to be used in layout routes

### Hooks

React Hooks inside `/app/hooks`

- `/use-*`: Various React hooks

### Utils

Utilities inside `/app/utils`

- `/*`: Various utils functions

---

## For Development

### package.json Script

...

### Scripts

- `/scripts`: Various development scripts.
