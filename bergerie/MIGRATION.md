# Migration vers le dépôt dédié `VincentVaysset/bergerie`

À lancer **sur ton PC, avec Claude Code** (la session cloud n'a pas le droit de créer de dépôt).
Ouvre Claude Code dans le dossier qui contient ton clone de `Conges`, et colle ce message :

---

> Crée le dépôt public `VincentVaysset/bergerie` à partir du dossier `Conges/bergerie/` (contenu **à la racine**), active GitHub Pages sur `main`, et ne touche à rien d'autre. Ne touche jamais aux dépôts `Ovilog` et `Logisol`. N'efface **pas** `bergerie/` de Conges. Étapes :
>
> ```bash
> cd Conges && git pull origin main && cd ..
> gh repo create VincentVaysset/bergerie --public --description "Ma bergerie — plan, lots, barrières et rations"
> mkdir bergerie && cp -r Conges/bergerie/. bergerie/ && cd bergerie
> rm -f MIGRATION.md
> sed -i 's#vincentvaysset.github.io/Conges/bergerie/#vincentvaysset.github.io/bergerie/#g' README.md CLAUDE.md
> git init -b main && git add . && git commit -m "Migration depuis Conges/bergerie"
> git remote add origin https://github.com/VincentVaysset/bergerie.git
> git push -u origin main
> gh api -X POST repos/VincentVaysset/bergerie/pages -f "source[branch]=main" -f "source[path]=/"
> ```
>
> Puis vérifie : `gh api repos/VincentVaysset/bergerie/pages --jq .html_url`, et que `https://vincentvaysset.github.io/bergerie/` répond (1–2 min après). Lance les tests : `npm install && npx playwright install chromium && npm test` (43 ok attendus).

---

Si `gh` manque : `winget install GitHub.cli` puis `gh auth login`.
Pages à la main : Settings → Pages → Deploy from a branch → `main` / `(root)`.

## Ensuite, sur le téléphone

1. Ouvre `https://vincentvaysset.github.io/bergerie/` : tes lots doivent être là (localStorage lié au domaine `vincentvaysset.github.io`, pas au chemin).
2. Par prudence, **avant**, fais un Export depuis l'ancienne adresse (onglet Bergerie).
3. Réinstalle le raccourci depuis la nouvelle adresse, supprime l'ancien.
4. Seulement alors : dis « tu peux effacer `bergerie/` de Conges ».
