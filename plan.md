# Startup Idea Swarm — Plan d'exécution

## Contexte fondateur
- Stack: Next.js 14, FastAPI, Python, TypeScript, Supabase, Redis
- Background: Dev fullstack + économie L3 + closeur freelance
- Langues: FR natif, EN C2, VI bilingue, DE B1
- Domaines de conviction: DeFi/Web3, fashion/luxe, cinéma, finance, compliance, SaaS B2B
- Mindset: bootstrap-first → VC path
- Location: Paris
- Contraintes: MVP < $5K, solo/1-2 co-fondateurs, $10K MRR avant seed

## Pipeline

### Stage 1 — Scout Agents (×5, parallèle)
Chaque Scout génère 1 idée brute dans un vertical assigné:
- Scout #1 → DeFi/fintech/compliance (closest to founder)
- Scout #2 → Developer tools / AI infrastructure
- Scout #3 → Marketplace / creator economy
- Scout #4 → Vertical contre-intuitif (fort TAM, loin du profil)
- Scout #5 → Libre — l'idée la plus audacieuse

**Output:** 5 idées brutes JSON

### Stage 2 — Market Agent (séquentiel)
Évalue TAM + TIMING + MOAT pour chaque idée
**Input:** Stage 1 output
**Output:** State enrichi avec scores marché

### Stage 3 — Founder-Fit Agent (séquentiel)
Évalue FOUNDER + SPEED pour chaque idée
**Input:** Stage 2 output
**Output:** State enrichi avec scores fondateur

### Stage 4 — Revenue Agent (séquentiel)
Évalue PMF + REVENUE + business model
**Input:** Stage 3 output
**Output:** State enrichi avec scores revenu

### Stage 5 — VC Lens Agent (séquentiel)
Applique thèses YC/a16z/Sequoia/Kima, écrit YC pitch
**Input:** Stage 4 output
**Output:** State complet avec VC analysis

### Stage 6 — Critic Agent (séquentiel)
Synthèse finale, scoring pondéré, classement, rapport
**Input:** Stage 5 output
**Output:** Rapport Markdown final structuré

## Livrable final
Rapport startup_ideas_report.md classant les 5 idées par conviction
