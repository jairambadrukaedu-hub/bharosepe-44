# Bharose - Contract Management System

A secure, escrow-based contract management system with contract revision capabilities.

## Features

- **Contract Creation & Management**: Create, send, and manage digital contracts
- **Contract Revision System**: Edit and resend rejected contracts
- **Escrow System**: Secure payment handling with dispute resolution
- **Real-time Updates**: Live contract status updates
- **User Authentication**: Secure login and profile management

## Deployment on Render

This app is configured for automatic deployment on Render using the `render.yaml` configuration.

### Environment Variables

The following environment variables are configured:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY` 
- `VITE_SUPABASE_PROJECT_ID`

## Development

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build
```

## Testing Contract Revisions

1. Create a contract between two users
2. Reject the contract as the recipient with a reason
3. Login as the sender and click "Edit & Resend Contract"
4. Make changes and submit - a new revised contract is created

Check browser console for debug messages starting with 🔄, 🧑, 👨‍💼, 📋, ✅, ❌

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/ce18c92e-bf9d-4696-bd5a-83a160ddaddc) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes it is!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
