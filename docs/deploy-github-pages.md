# Déploiement sur GitHub Pages

Nom de dépôt recommandé :

- `juniormbogning-site`

Pourquoi :

- il est clair et professionnel ;
- il reste valable même si le site évolue ;
- le domaine public reste `juniormbogning.com`, donc le nom du dépôt n'a pas besoin d'être exactement le nom du domaine.

## Ce qui est déjà prêt dans le projet

- export statique Next.js via `next.config.mjs`
- pipeline GitHub Actions dans `.github/workflows/deploy-github-pages.yml`
- domaine public déclaré dans `public/CNAME`
- compatibilité GitHub Pages via `public/.nojekyll`

## Étapes GitHub

1. Créer le dépôt GitHub, par exemple `juniormbogning-site`
2. Pousser le code sur la branche `main`
3. Dans `Settings > Pages`
4. Sous `Build and deployment`, choisir `GitHub Actions`
5. Laisser le workflow déployer le site

## Étapes domaine personnalisé

1. Dans `Settings > Pages > Custom domain`, saisir `juniormbogning.com`
2. Activer `Enforce HTTPS` quand l'option devient disponible
3. Chez le registrar du domaine, pointer le domaine vers GitHub Pages

## DNS GitHub Pages

Pour le domaine racine `juniormbogning.com`, GitHub demande en général des enregistrements `A` vers :

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

Et si tu veux aussi `www.juniormbogning.com`, ajoute un `CNAME` :

- `www` -> `<ton-utilisateur>.github.io`

Ensuite, configure une redirection unique pour garder `https://juniormbogning.com` comme URL canonique principale.