#!/bin/bash
# CORNAi — Push schema vers Neon

echo " CORNAi  Push du schma vers Neon..."
npx drizzle-kit push
echo " Schma pouss !"

echo ""
echo " Seed de la knowledge base..."
npx tsx scripts/seed-knowledge-base.ts
echo " Seed termin !"
