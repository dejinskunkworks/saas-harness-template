#!/usr/bin/env bash
set -euo pipefail

echo ""
echo "╔══════════════════════════════════════╗"
echo "║   SaaS Harness Template Setup        ║"
echo "╚══════════════════════════════════════╝"
echo ""

# Prompt for project name
read -rp "Project name (kebab-case, e.g. invoice-ninja): " PROJECT_NAME
if [[ -z "$PROJECT_NAME" ]]; then
  echo "Error: Project name is required."
  exit 1
fi

# Prompt for display name
DEFAULT_DISPLAY=$(echo "$PROJECT_NAME" | sed -E 's/(^|-)(\w)/\U\2/g; s/-/ /g')
read -rp "Display name [$DEFAULT_DISPLAY]: " DISPLAY_NAME
DISPLAY_NAME="${DISPLAY_NAME:-$DEFAULT_DISPLAY}"

# Prompt for description
read -rp "Project description [AI-Native SaaS Platform]: " DESCRIPTION
DESCRIPTION="${DESCRIPTION:-AI-Native SaaS Platform}"

echo ""
echo "Renaming project..."

# Replace in all relevant files
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.json" -o -name "*.md" -o -name "*.yml" -o -name "*.yaml" -o -name "*.mjs" \) \
  ! -path "./node_modules/*" \
  ! -path "./.git/*" \
  ! -path "./setup.sh" \
  -exec sed -i "s/saas-harness-template/$PROJECT_NAME/g" {} +

find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.json" -o -name "*.md" -o -name "*.yml" -o -name "*.yaml" -o -name "*.mjs" \) \
  ! -path "./node_modules/*" \
  ! -path "./.git/*" \
  ! -path "./setup.sh" \
  -exec sed -i "s/SaaS Harness Template/$DISPLAY_NAME/g" {} +

find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.json" -o -name "*.md" -o -name "*.yml" -o -name "*.yaml" -o -name "*.mjs" \) \
  ! -path "./node_modules/*" \
  ! -path "./.git/*" \
  ! -path "./setup.sh" \
  -exec sed -i "s/AI-Native SaaS Starter/$DESCRIPTION/g" {} +

echo "Reinitializing git..."
rm -rf .git
git init
git add -A
git commit -m "chore: initialize $DISPLAY_NAME from saas-harness-template"

echo ""
echo "Installing dependencies..."
pnpm install

echo ""
echo "╔══════════════════════════════════════╗"
echo "║   Setup complete!                    ║"
echo "╚══════════════════════════════════════╝"
echo ""
echo "Next steps:"
echo "  1. Edit src/lib/constants.ts — add your roles, regions, domain constants"
echo "  2. Update supabase/migrations/00004_create_memberships.sql — match your roles"
echo "  3. Update src/lib/supabase/types.ts — match your DB schema"
echo "  4. Add domain modules in src/modules/ — follow example-module pattern"
echo "  5. Set up Supabase project and copy .env.example to .env.local"
echo "  6. Push to GitHub: git remote add origin <your-repo-url> && git push -u origin master"
echo ""
echo "Run 'pnpm dev' to start developing!"
