# Nimbus Interactive AI Interface

A responsive, front-end-only AI workspace demo inspired by modern conversational interfaces. It reproduces the interaction patterns of a chat landing page, live conversation, chat search, image creation, app discovery, custom assistant discovery, deep research, theme settings, and pricing—without authentication, payments, persistence, or external APIs.

## Included flows

- Responsive desktop and mobile navigation
- Light, dark, and system appearance modes
- Searchable local chat history panel
- New-chat transition with animated history creation
- Simulated assistant thinking and streaming response
- Image-prompt presets and an animated local generation state
- Searchable Apps directory with category filters and featured carousel
- Explore GPTs-style discovery cards and rankings
- Deep Research-style staged progress and completed mock report
- Individual and business pricing states with an intentionally inert checkout

All content and state are generated in the browser. Messages, files, account details, and payment information are never sent or stored.

## Run locally

Requires Node.js `>=22.13.0`.

```bash
npm ci
npm run dev
```

Open the local URL printed by the development server.

## Validation

```bash
npm run lint
npm test
```

`npm test` performs the production build, validates the deployable artifact, and runs the rendered-HTML smoke test.

## Routes

The demo uses hash-based client routing so every view works on a static front end:

- `#images`
- `#apps`
- `#gpts`
- `#research`
- `#pricing`

## Safety

Nimbus is independent demo branding. Authentication and checkout controls are visual only, and no OpenAI or third-party service is called by the interface.
