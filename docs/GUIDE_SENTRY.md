# Guide: Sentry

Run the Sentry Wizard for Remix:

```sh
pnpx @sentry/wizard@latest -i remix
```

How it looks like:

```sh
Running Sentry Wizard...
version: 3.X.Y | sentry-cli version: 1.X.Y
Sentry Wizard will help you to configure your project
Thank you for using Sentry :)
Skipping connection to Sentry due files already patched

┌  Sentry Remix Wizard
◇  ──────────────────────────────────────────────────────────────────────────────╮
│  The Sentry Remix Wizard will help you set up Sentry for your application.                        │
│  Thank you for using Sentry :)                                                                    │
│  Version: 3.X.Y                                                                                  │
│  This wizard sends telemetry data and crash reports to Sentry.
│  This helps us improve the Wizard.
│  Turn this off at any time by running sentry-wizard --disable-telemetry.
├────────────────────────────────────────────────────────────────────────────────╯
◇  Are you using Sentry SaaS or self-hosted Sentry?
│  Sentry SaaS (sentry.io)
◇  Do you already have a Sentry account?
│  Yes
●  If the browser window didn't open automatically,****
│  please open the following link to log into Sentry:
│  https://sentry.io/account/settings/wizard/token
◇  Login complete.
◇  Select your Sentry project.
│  organization-name/javascript-remix
◇  Installed @sentry/remix with PNPM.
◆  Added auth token to .sentryclirc for you to test uploading source maps locally.
◆  Created .sentryclirc.
◆  Added .sentryclirc to .gitignore.
◆  Successfully updated build script in package.json to generate and upload sourcemaps.
◆  Successfully instrumented root route root.tsx.
●  Found entry files entry.client.tsx and entry.server.tsx.
◆  Successfully initialized Sentry on client entry point entry.client.tsx
▲  Could not find function handleError in entry.server.tsx. Creating one for you.
◆  Instrumented handleError in entry.server.tsx
◆  Successfully initialized Sentry on server entry point entry.server.tsx.
└
Sentry has been successfully configured for your Remix project.
You can now deploy your project to see Sentry in action.
To learn more about how to use Sentry with Remix, visit our documentation:
https://docs.sentry.io/platforms/javascript/guides/remix/
🎉  Successfully set up Sentry for your project 🎉
```

Files that need to be changed or checked:

- `.gitignore`: Ignore `.sentryclirc`
- `package.json`: Change `build` script to use `sentry-upload-sourcemaps`
- `.env.example`: Add **`SENTRY_DSN`**
- `.env`: Add `SENTRY_DSN`
- `app/utils/env.server.ts`: Add `SENTRY_DSN`
- `app/document.ts`: Add `window.ENV`
- `app/entry.client.tsx`: Add `Sentry.init`
- `app/entry.server.tsx`: Add `Sentry.init`
