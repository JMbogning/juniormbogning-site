# Publications

Organisation recommandée pour les publications :

```text
content/publications/
  fr/
    2026/
      mon-article/
        index.md
  en/
    2026/
      my-article/
        index.md

public/images/publications/
  2026/
    mon-article/
      cover.png
      schema-vpc.png
```

Règles à suivre :

1. Un dossier par article.
2. Un `index.md` par article.
3. Les images publiques de l'article vont dans `public/images/publications/<annee>/<slug>/`.
4. L'image principale peut être :
   - omise si elle s'appelle `cover.png`, `cover.jpg`, `cover.jpeg`, `cover.webp` ou `cover.avif`
   - ou définie dans le front matter avec un chemin relatif comme `cover.png`
5. Le `slug` est dérivé du nom du dossier.
6. Le dossier d'année sert à garder un classement simple quand le volume augmente.

Front matter minimal conseillé :

```yaml
---
title: "Titre de l'article"
excerpt: "Résumé court pour la liste et l'en-tête."
source: "Junior Mbogning"
author: "Junior Mbogning"
translationKey: "cle-partagee-entre-traductions"
publishedAt: "2026-07-10"
category: "Architecture Cloud"
image: "cover.png"
draft: false
---
```

Champs utiles :

- `title` : obligatoire
- `excerpt` : fortement recommandé
- `publishedAt` : obligatoire
- `category` : recommande
- `image` : optionnel si une image `cover.*` existe
- `translationKey` : recommande pour relier les versions FR/EN d'un meme article et generer les balises SEO bilingues
- `draft` : optionnel, permet de préparer un article sans le publier
