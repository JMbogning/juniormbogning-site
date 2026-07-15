# Formulaire de contact avec Google Apps Script

Cette integration permet d'envoyer les messages du formulaire vers `contact@juniormbogning.com` sans backend local.

## 1. Creer le script Google

1. Ouvrir `https://script.google.com/`
2. Creer un nouveau projet
3. Remplacer le contenu par le fichier :

`google-apps-script/contact-form-webapp.gs`

## 2. Deployer en web app

1. Cliquer sur `Deploy`
2. Choisir `New deployment`
3. Type : `Web app`
4. `Execute as` : `Me`
5. `Who has access` : `Anyone`
6. Deployer
7. Copier l'URL qui finit par `/exec`

## 3. Configurer le site

Dans le fichier `.env.local` du projet, ajouter :

```env
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=https://script.google.com/macros/s/your-web-app-id/exec
```

Puis redemarrer le serveur Next.js.

## 4. Protection anti-robot deja en place

Le formulaire envoie :

- un champ piege invisible
- une verification mathematique dynamique
- un temps minimal de remplissage

Le script Google verifie de nouveau ces trois points avant d'envoyer le mail.

## 5. Comportement de secours

Si `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` n'est pas configure, le formulaire revient automatiquement au mode `mailto:`.