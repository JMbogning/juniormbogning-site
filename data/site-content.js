export const siteContent = {
  logo: "/images/logo-junior-mbogning.png",
  heroImage: "/images/photo-junior-mbogning.jpg",
  fr: {
    nav: [
      { href: "/", label: "Accueil", key: "home" },
      { href: "/projets", label: "Projets", key: "projects" },
      { href: "/publications", label: "Articles", key: "publications" },
      { href: "/contact", label: "Contact", key: "contact" }
    ],
    switcher: { fr: "FR", en: "EN" },
    cta: "Contact",
    socialTitle: "Réseaux sociaux",
    socialLinks: [
      { label: "LinkedIn", href: "https://fr.linkedin.com/in/juniormbogning/", platform: "linkedin" },
      { label: "X", href: "", platform: "x" }
    ],
    photoCredit: "© Junior Mbogning",
    heroTitle: "Junior Mbogning",
    heroSubtitle: "Sécuriser, automatiser et moderniser les infrastructures numériques",
    aboutTitle: "À propos",
    about: [
      "Junior Mbogning est actuellement <strong>doctorant en informatique.</strong> Il est également <strong>Senior Cloud Platform / DevSecOps Engineer</strong>, spécialisé dans la conception, l'automatisation et la sécurisation des infrastructures Cloud natives à grande échelle.",
      "Expert des technologies Cloud et DevSecOps, il accompagne les organisations dans la modernisation de leurs systèmes d'information à travers l'automatisation des infrastructures, l'industrialisation des déploiements applicatifs et l'intégration de la sécurité au cœur du cycle de développement logiciel. Ses domaines d'expertise couvrent notamment <strong>Kubernetes, les plateformes Cloud, l'Infrastructure as Code, les chaînes CI/CD sécurisées et la résilience des infrastructures critiques.</strong>",
      "Originaire du Cameroun, Junior Mbogning a construit son parcours entre le Cameroun et la France, en développant une expertise à la fois académique et opérationnelle sur la <strong>sécurisation des plateformes Cloud natives</strong>, la <strong>gouvernance des déploiements</strong> et la <strong>résilience des environnements Kubernetes</strong>. À travers ses travaux de recherche et ses réalisations professionnelles, il rapproche les exigences de sécurité des réalités de production des architectures modernes.",
      "Ses travaux actuels portent plus spécifiquement sur l'intégration de la sécurité dans les chaînes de delivery, la fiabilisation des infrastructures as Code, le durcissement des clusters Kubernetes et l'industrialisation des plateformes cloud. Il défend une approche pragmatique où <strong>automatisation, conformité, observabilité et résilience</strong> sont pensées ensemble dès la conception.",
      "Ainsi, il intervient régulièrement lors des ateliers techniques et programmes de formation consacrés au Cloud, à Kubernetes et au DevSecOps. Il partage également son expertise à travers des contenus techniques et des retours d'expérience destinés à accompagner les professionnels dans l'adoption des meilleures pratiques d'ingénierie et de sécurité.",
      "Junior Mbogning est titulaire d'un <strong>Mastère en Cybersécurité et Cyberdéfense de Télécom Paris</strong> (Institut Polytechnique de Paris, France) et d'un <strong>Master en Ingénierie Informatique de l'Université de Ngaoundéré</strong> (Cameroun). Il détient plusieurs certifications professionnelles internationales parmi lesquelles <strong>AWS Certified Solutions Architect - Associate, AWS Certified Solutions Architect - Professional, HashiCorp Certified Terraform Associate ainsi que les certifications Kubernetes CKA, CKAD et CKS</strong> délivrées par la Cloud Native Computing Foundation (CNCF)."
    ],
    publicationsTitle: "Articles",
    publicationsIntro:
      "Une sélection d'articles techniques, de retours d'expérience et d'analyses consacrés à la sécurisation des plateformes Cloud natives, aux chaînes CI/CD, à Kubernetes et aux pratiques DevSecOps.",
    projectsTitle: "Projets",
    projectsIntro:
      "Une sélection de projets orientés plateforme, automatisation et sécurité Cloud native : industrialisation d'infrastructures, durcissement Kubernetes, pipelines sécurisés, observabilité et résilience des environnements de production.",
    projectsSectionTitle: "Études de cas et réalisations",
    projectsSectionText:
      "Cette page présentera progressivement les projets menés par Junior Mbogning autour du Platform Engineering, du DevSecOps, de l'Infrastructure as Code, de Kubernetes et de la sécurisation des chaînes de déploiement, avec le contexte, les choix techniques, les résultats obtenus et les enseignements clés.",
    contactTitle: "Contacter Junior Mbogning",
    contactIntro:
      "Vous souhaitez partager un message, transmettre une invitation ou prendre contact pour une intervention ? Utilisez le formulaire ci-dessous.",
    contactAsideTitle: "Prendre contact",
    contactAsideText:
      "Pour toute demande de conférence, d'interview, de participation à un panel ou de message institutionnel, ce formulaire vous permet de centraliser votre demande.",
    publicationLayout: {
      article: "Article",
      featured: "Article à la une",
      back: "Retour aux publications",
      readArticle: "Lire l'article",
      allCategories: "Toutes les catégories",
      categoriesLabel: "Filtrer par catégorie",
      empty: "Aucun article ne correspond à cette catégorie pour le moment.",
      sidebarTitle: "Ce que vous trouverez dans cet article",
      sidebarText:
        "Une lecture centrée sur les choix d'architecture, les pratiques d'industrialisation, la sécurité intégrée au delivery et les retours d'expérience exploitables.",
      comments: {
        eyebrow: "Discussion",
        title: "Commentaires",
        intro:
          "Les lecteurs peuvent réagir, poser une question ou prolonger l'échange. Une connexion GitHub est demandée pour publier un commentaire.",
        setup:
          "Le module de commentaires GitHub n'est pas encore configuré. Ajoutez les variables Giscus pour activer la discussion sur cette page."
      }
    },
    pagination: {
      browse: "Parcourir",
      results: "éléments",
      page: "Page",
      of: "sur",
      previous: "Précédent",
      next: "Suivant"
    },
    footer: "© 2026 Junior Mbogning",
    form: {
      locale: "fr",
      name: "Nom",
      namePlaceholder: "Votre nom *",
      email: "Email",
      emailPlaceholder: "vous@example.com *",
      subject: "Sujet",
      subjectPlaceholder: "Objet de votre message *",
      message: "Message",
      messagePlaceholder: "Votre message *",
      submit: "Envoyer",
      sending: "Envoi...",
      success: "Votre message a été transmis.",
      successFallback: "Votre messagerie a été préparée pour envoyer le message.",
      intro: "Merci de remplir le formulaire ci-dessous pour partager votre demande.",
      requiredLegend: "* Champs requis",
      privacy: "Vos informations sont utilisées uniquement pour répondre à votre message.",
      recipientEmail: "contact@juniormbogning.com",
      websiteLabel: "Site web",
      antiBotQuestionPrefix: "Vérification anti-robot : combien font",
      antiBotLoading: "Chargement de la vérification anti-robot",
      antiBotPlaceholder: "Votre réponse *",
      tooFast: "Envoi bloqué : merci de prendre quelques secondes pour remplir le formulaire.",
      invalidChallenge: "Vérification anti-robot incorrecte. Merci de réessayer.",
      blocked: "Envoi bloqué.",
      submitError: "Une erreur est survenue lors de l'envoi. Merci de réessayer.",
      emailBodyName: "Nom",
      emailBodyEmail: "Email"
    }
  },
  en: {
    nav: [
      { href: "/en", label: "Welcome", key: "home" },
      { href: "/en/projects", label: "Projects", key: "projects" },
      { href: "/en/publications", label: "Articles", key: "publications" },
      { href: "/en/contact", label: "Contact", key: "contact" }
    ],
    switcher: { fr: "FR", en: "EN" },
    cta: "Contact",
    socialTitle: "Social links",
    socialLinks: [
      { label: "LinkedIn", href: "https://fr.linkedin.com/in/juniormbogning/", platform: "linkedin" },
      { label: "X", href: "", platform: "x" }
    ],
    photoCredit: "© Junior Mbogning",
    heroTitle: "Junior Mbogning",
    heroSubtitle: "Securing, automating and modernizing digital infrastructure",
    aboutTitle: "About",
    about: [
      "Junior Mbogning is currently a <strong>PhD candidate in Computer Science.</strong> He is also a <strong>Senior Cloud Platform / DevSecOps Engineer</strong>, focused on designing, automating and securing large-scale cloud-native infrastructures.",
      "An expert in Cloud and DevSecOps technologies, he helps organizations modernize their information systems through infrastructure automation, industrialized application delivery and the integration of security throughout the software development lifecycle. His areas of expertise notably include <strong>Kubernetes, Cloud platforms, Infrastructure as Code, secure CI/CD pipelines and the resilience of critical infrastructures.</strong>",
      "Originally from Cameroon, Junior Mbogning has built his journey between Cameroon and France, developing both academic and operational expertise in <strong>securing cloud-native platforms</strong>, <strong>governing delivery pipelines</strong> and <strong>improving the resilience of Kubernetes-based environments</strong>. Through his research and professional work, he helps align security requirements with the operational realities of modern production systems.",
      "His current work focuses more specifically on embedding security into delivery workflows, strengthening Infrastructure as Code practices, hardening Kubernetes platforms and industrializing cloud environments at scale. He promotes a pragmatic approach where <strong>automation, compliance, observability and resilience</strong> are designed together from the start.",
      "He regularly contributes to technical workshops and training programs focused on Cloud, Kubernetes and DevSecOps. He also shares his expertise through technical content and field feedback designed to help professionals adopt strong engineering and security practices.",
      "Junior Mbogning holds an <strong>advanced degree in Cybersecurity and Cyber Defense from Telecom Paris</strong> (Institut Polytechnique de Paris, France) and a <strong>Master's degree in Computer Engineering from the University of Ngaoundere</strong> (Cameroon). He also holds several international professional certifications, including <strong>AWS Certified Solutions Architect - Associate, AWS Certified Solutions Architect - Professional, HashiCorp Certified Terraform Associate, and the Kubernetes CKA, CKAD and CKS certifications</strong> issued by the Cloud Native Computing Foundation (CNCF)."
    ],
    publicationsTitle: "Articles",
    publicationsIntro:
      "A curated selection of technical articles, hands-on lessons and engineering insights focused on cloud-native security, CI/CD pipelines, Kubernetes and DevSecOps practices.",
    projectsTitle: "Projects",
    projectsIntro:
      "A selection of projects centered on platform engineering, automation and cloud-native security: infrastructure industrialization, Kubernetes hardening, secure delivery pipelines, observability and production resilience.",
    projectsSectionTitle: "Case studies and implementations",
    projectsSectionText:
      "This page will progressively showcase Junior Mbogning's work across Platform Engineering, DevSecOps, Infrastructure as Code, Kubernetes and secure delivery chains, including the context, technical decisions, outcomes and key lessons learned.",
    contactTitle: "Contact Junior Mbogning",
    contactIntro:
      "For speaking requests, invitations, interviews or direct messages, use the form below to share the details of your request.",
    contactAsideTitle: "Get in touch",
    contactAsideText:
      "This channel is suited for conference invitations, media requests, institutional outreach and curated speaking opportunities.",
    publicationLayout: {
      article: "Article",
      featured: "Featured article",
      back: "Back to publications",
      readArticle: "Read article",
      allCategories: "All categories",
      categoriesLabel: "Filter by category",
      empty: "No articles match this category yet.",
      sidebarTitle: "What this article covers",
      sidebarText:
        "A focused read on architecture decisions, platform industrialization, security built into delivery workflows and practical engineering feedback.",
      comments: {
        eyebrow: "Discussion",
        title: "Comments",
        intro:
          "Readers can react, ask a question or continue the conversation. A GitHub sign-in is required before posting a comment.",
        setup:
          "The GitHub comment module is not configured yet. Add the Giscus environment variables to enable discussions on this page."
      }
    },
    pagination: {
      browse: "Browse",
      results: "items",
      page: "Page",
      of: "of",
      previous: "Previous",
      next: "Next"
    },
    footer: "© 2026 Junior Mbogning",
    form: {
      locale: "en",
      name: "Name",
      namePlaceholder: "Your name *",
      email: "Email",
      emailPlaceholder: "you@example.com *",
      subject: "Subject",
      subjectPlaceholder: "Message subject *",
      message: "Message",
      messagePlaceholder: "Your message *",
      submit: "Send",
      sending: "Sending...",
      success: "Your message has been sent.",
      successFallback: "Your email client has been prepared to send the message.",
      intro: "Please complete the form below to share your request.",
      requiredLegend: "* Required fields",
      privacy: "Your information is only used to respond to your message.",
      recipientEmail: "contact@juniormbogning.com",
      websiteLabel: "Website",
      antiBotQuestionPrefix: "Anti-bot check: what is",
      antiBotLoading: "Loading anti-bot check",
      antiBotPlaceholder: "Your answer *",
      tooFast: "Submission blocked: please take a few seconds to complete the form.",
      invalidChallenge: "Incorrect anti-bot check. Please try again.",
      blocked: "Submission blocked.",
      submitError: "An error occurred while sending the message. Please try again.",
      emailBodyName: "Name",
      emailBodyEmail: "Email"
    }
  }
};