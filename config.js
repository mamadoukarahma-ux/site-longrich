// =====================================================================
//  CONFIGURATION DU SITE — modifiez uniquement ce fichier
// =====================================================================

const BOUTIQUE = {
  nom: "Prénom Nom",                  // Nom de votre sœur
  slogan: "Distributrice indépendante Longrich",
  ville: "Dakar, Sénégal",            // Ville / pays
  whatsapp: "221770000000",           // Numéro WhatsApp au format international, SANS + ni espaces
  telephone: "+221 77 000 00 00",     // Numéro affiché sur le site
  email: "",                          // Optionnel
  facebook: "",                       // Lien Facebook (optionnel)
  instagram: "",                      // Lien Instagram (optionnel)
  devise: "FCFA",
  livraison: "Livraison possible partout en ville. Envoi possible dans les autres régions.",
};

// Catégories affichées dans les filtres
const CATEGORIES = ["Tous", "Hygiène", "Soins du corps", "Maison", "Bien-être"];

// Liste des produits.
// - prix : mettez les vrais prix (0 = "Prix sur demande")
// - image : mettez la photo dans le dossier "images" puis écrivez par ex. "images/dentifrice.jpg"
//           (laissez "" pour afficher l'icône à la place)
const PRODUITS = [
  {
    nom: "Dentifrice au charbon de bambou",
    categorie: "Hygiène",
    prix: 0,
    icone: "🪥",
    image: "",
    description: "Dentifrice au charbon de bambou pour une sensation de fraîcheur et des dents propres au quotidien.",
  },
  {
    nom: "Serviettes hygiéniques Anion",
    categorie: "Hygiène",
    prix: 0,
    icone: "🌸",
    image: "",
    description: "Serviettes fines et confortables, disponibles en version jour et nuit.",
  },
  {
    nom: "Savon au charbon de bambou",
    categorie: "Soins du corps",
    prix: 0,
    icone: "🧼",
    image: "",
    description: "Savon doux pour le visage et le corps, pour une peau nette et fraîche.",
  },
  {
    nom: "Crème à la perle",
    categorie: "Soins du corps",
    prix: 0,
    icone: "✨",
    image: "",
    description: "Crème hydratante pour une peau douce et lumineuse.",
  },
  {
    nom: "Shampoing",
    categorie: "Soins du corps",
    prix: 0,
    icone: "🧴",
    image: "",
    description: "Shampoing pour des cheveux propres, doux et faciles à coiffer.",
  },
  {
    nom: "Lessive Superbklean",
    categorie: "Maison",
    prix: 0,
    icone: "🫧",
    image: "",
    description: "Lessive efficace pour un linge propre et parfumé.",
  },
  {
    nom: "Thé Longrich",
    categorie: "Bien-être",
    prix: 0,
    icone: "🍵",
    image: "",
    description: "Thé à déguster chaud ou froid, à tout moment de la journée.",
  },
  {
    nom: "Couches pour bébé",
    categorie: "Hygiène",
    prix: 0,
    icone: "👶",
    image: "",
    description: "Couches douces et absorbantes pour le confort de bébé.",
  },
];
