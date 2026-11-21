// =====================================================================
//  CONFIGURATION DU SITE — modifiez uniquement ce fichier
// =====================================================================

const BOUTIQUE = {
  nom: "Mamadou KA",
  slogan: "Distributeur indépendant Longrich",
  ville: "Touba Darou Minan, Sénégal",
  whatsapp: "221773058430",           // Numéro WhatsApp au format international, SANS + ni espaces
  telephone: "+221 77 305 84 30",     // Numéro affiché sur le site
  email: "",                          // Optionnel
  facebook: "",                       // Lien Facebook (optionnel)
  instagram: "",                      // Lien Instagram (optionnel)
  devise: "FCFA",
  livraison: "Livraison possible à Touba et environs. Envoi possible dans les autres régions du Sénégal.",
};

// Catégories affichées dans les filtres
const CATEGORIES = ["Tous", "Soins du corps", "Hygiène", "Bien-être", "Compléments alimentaires"];

// Liste des produits.
// - prix : mettez les vrais prix en FCFA (0 = "Prix sur demande")
// - image : photo placée dans le dossier "images"
const PRODUITS = [
  {
    nom: "Huile de bain parfum olive",
    categorie: "Soins du corps",
    prix: 0,
    icone: "🫒",
    image: "images/huile-bain-olive.jpg",
    description: "Golden Olive Scented Bath Oil : huile de bain au doux parfum d'olive pour une peau douce et nourrie.",
  },
  {
    nom: "Lait corporel SOD",
    categorie: "Soins du corps",
    prix: 0,
    icone: "🧴",
    image: "images/lait-sod.jpg",
    description: "Sheep Placenta SOD Milk Lotion : lait hydratant pour une peau douce, souple et éclatante.",
  },
  {
    nom: "Savon au charbon de bambou",
    categorie: "Soins du corps",
    prix: 0,
    icone: "🧼",
    image: "images/savon-charbon.jpg",
    description: "Natural Essence Bamboo Charcoal Soap : savon pour le visage et le corps, pour une peau nette et fraîche.",
  },
  {
    nom: "Coffret soins Longrich",
    categorie: "Soins du corps",
    prix: 0,
    icone: "🎁",
    image: "images/coffret-soins.jpg",
    description: "Sélection de soins : crème mains, savons au charbon de bambou, huile Snake Oil, lait SOD… Composition à confirmer sur WhatsApp.",
  },
  {
    nom: "Gel à l'extrait de bile de serpent",
    categorie: "Soins du corps",
    prix: 0,
    icone: "✨",
    image: "images/gel-bile-serpent.jpg",
    description: "Soin Longrich à l'extrait de bile de serpent. Demandez conseil pour son utilisation.",
  },
  {
    nom: "Déodorant roll-on anti-transpirant",
    categorie: "Hygiène",
    prix: 0,
    icone: "💧",
    image: "images/deodorant.jpg",
    description: "Antiperspirant Dew 50 ml : protection contre les odeurs et sensation de fraîcheur toute la journée.",
  },
  {
    nom: "Dentifrice au thé blanc",
    categorie: "Hygiène",
    prix: 0,
    icone: "🪥",
    image: "images/dentifrice-the-blanc.jpg",
    description: "White Tea Multi-Effect Toothpaste : dentifrice au thé blanc pour une haleine fraîche et des gencives saines.",
  },
  {
    nom: "Brown Tea NutriVRich",
    categorie: "Bien-être",
    prix: 0,
    icone: "🍵",
    image: "images/brown-tea.jpg",
    description: "Thé brun en sachets (15 × 3 g), à déguster chaud à tout moment de la journée.",
  },
  {
    nom: "Vitamine C à croquer",
    categorie: "Compléments alimentaires",
    prix: 0,
    icone: "🍊",
    image: "images/vitamine-c.jpg",
    description: "Comprimés à croquer goût orange (60 comprimés). Complément alimentaire, source de vitamine C.",
  },
  {
    nom: "Calcium-Fer-Zinc & Glucosamine",
    categorie: "Compléments alimentaires",
    prix: 0,
    icone: "💊",
    image: "images/calcium-glucosamine.jpg",
    description: "Comprimés Calcium/Fer/Zinc goût lait et Glucosamine-Chondroïtine. Compléments alimentaires, vendus ensemble ou séparément.",
  },
  {
    nom: "Pack compléments Bone-M",
    categorie: "Compléments alimentaires",
    prix: 0,
    icone: "📦",
    image: "images/pack-complements.jpg",
    description: "Pack de compléments alimentaires Longrich (Bone-M et autres). Composition et conseils sur WhatsApp.",
  },
];
