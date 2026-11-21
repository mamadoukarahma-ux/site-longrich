(function () {
  const SITE = window.SITE || { boutique: {}, categories: [], produits: [] };
  const BOUTIQUE = SITE.boutique;
  const CATEGORIES = ["Tous"].concat(SITE.categories || []);
  const PRODUITS = SITE.produits || [];
  const parId = (id) => PRODUITS.find((p) => p.id === id);

  const $ = (id) => document.getElementById(id);
  const fmt = (n) => n.toLocaleString("fr-FR") + " " + (BOUTIQUE.devise || "FCFA");
  const prixTexte = (p) => (p.prix > 0 ? fmt(p.prix) : "Prix sur demande");
  const waLink = (msg) => "https://wa.me/" + BOUTIQUE.whatsapp + (msg ? "?text=" + encodeURIComponent(msg) : "");
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // --- Textes de la boutique ---
  document.title = (BOUTIQUE.enseigne || BOUTIQUE.nom) + " — Produits Longrich";
  $("brand-name").textContent = BOUTIQUE.enseigne || BOUTIQUE.nom;
  $("hero-slogan").textContent = BOUTIQUE.slogan + " · " + BOUTIQUE.ville;
  $("hero-livraison").textContent = (BOUTIQUE.livraison || "Livraison rapide").split(".")[0];
  $("about-text").textContent =
    "Je m'appelle " + BOUTIQUE.nom + ", " + (BOUTIQUE.slogan || "").replace(/^./, (c) => c.toLowerCase()) + " basé à " + BOUTIQUE.ville +
    ". Je vous conseille et vous aide à choisir les produits adaptés à vos besoins. " + (BOUTIQUE.livraison || "");
  $("footer-text").textContent = "© " + new Date().getFullYear() + " " + BOUTIQUE.nom + " · " + BOUTIQUE.ville;

  const helloMsg = "Bonjour " + BOUTIQUE.nom + ", je souhaite avoir des informations sur vos produits Longrich.";
  $("hero-whatsapp").href = waLink(helloMsg);
  $("wa-float").href = waLink(helloMsg);
  [$("hero-whatsapp"), $("wa-float")].forEach((a) => { a.target = "_blank"; a.rel = "noopener"; });

  const contacts = [
    ["WhatsApp", BOUTIQUE.telephone, waLink(helloMsg)],
    ["Téléphone", BOUTIQUE.telephone, "tel:" + String(BOUTIQUE.telephone || "").replace(/\s/g, "")],
    ["E-mail", BOUTIQUE.email, "mailto:" + BOUTIQUE.email],
    ["Facebook", BOUTIQUE.facebook && "Voir la page", BOUTIQUE.facebook],
    ["Instagram", BOUTIQUE.instagram && "Voir le profil", BOUTIQUE.instagram],
  ].filter((c) => c[1]);
  $("contact-list").innerHTML = contacts
    .map(([label, text, href]) => `<li><span>${label}</span><a href="${esc(href)}" target="_blank" rel="noopener">${esc(text)}</a></li>`)
    .join("");

  // --- Produits ---
  let filtre = "Tous";
  function renderFiltres() {
    $("filters").innerHTML = CATEGORIES.map(
      (c) => `<button class="chip ${c === filtre ? "active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`
    ).join("");
  }
  function renderProduits() {
    const liste = PRODUITS.filter((p) => filtre === "Tous" || p.categorie === filtre);
    $("grid").innerHTML = liste.length
      ? liste.map((p) => {
          const dispo = p.disponible !== false;
          return `
        <article class="card${dispo ? "" : " card-out"}">
          <div class="card-media">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.nom)}" loading="lazy">` : esc(p.icone || "🛍️")}
            ${dispo ? "" : `<span class="badge-out">Rupture de stock</span>`}</div>
          <div class="card-body">
            <span class="card-cat">${esc(p.categorie)}</span>
            <h3>${esc(p.nom)}</h3>
            <p>${esc(p.description)}</p>
            <div class="card-foot">
              <span class="price">${prixTexte(p)}</span>
              ${dispo ? `<button class="add-btn" data-add="${esc(p.id)}">Ajouter</button>` : `<span class="out-label">Bientôt de retour</span>`}
            </div>
          </div>
        </article>`;
        }).join("")
      : `<p class="empty">Aucun produit dans cette catégorie pour le moment.</p>`;
  }
  $("filters").addEventListener("click", (e) => {
    const cat = e.target.dataset.cat;
    if (!cat) return;
    filtre = cat;
    renderFiltres();
    renderProduits();
  });
  $("grid").addEventListener("click", (e) => {
    const id = e.target.dataset.add;
    if (!id) return;
    panier[id] = (panier[id] || 0) + 1;
    sauver();
    renderPanier();
    e.target.textContent = "Ajouté ✓";
    setTimeout(() => (e.target.textContent = "Ajouter"), 900);
  });

  // --- Panier (clé = identifiant du produit) ---
  let panier = {};
  try { panier = JSON.parse(localStorage.getItem("panier-v2") || "{}"); } catch (_) { panier = {}; }
  const sauver = () => { try { localStorage.setItem("panier-v2", JSON.stringify(panier)); } catch (_) {} };

  function lignes() {
    return Object.entries(panier)
      .map(([id, q]) => ({ id, q, p: parId(id) }))
      .filter((x) => x.p && x.p.disponible !== false && x.q > 0);
  }
  function renderPanier() {
    const l = lignes();
    $("cart-count").textContent = l.reduce((s, x) => s + x.q, 0);
    $("cart-items").innerHTML = l.length
      ? l.map(({ id, q, p }) => `
          <div class="line">
            <span class="line-name">${esc(p.nom)}</span>
            <div class="qty"><button data-dec="${esc(id)}">−</button>${q}<button data-inc="${esc(id)}">+</button></div>
            <span class="line-price">${prixTexte(p)}</span>
          </div>`).join("")
      : `<p class="empty">Votre panier est vide.</p>`;
    const total = l.reduce((s, x) => s + x.q * (x.p.prix || 0), 0);
    const surDemande = l.some((x) => !(x.p.prix > 0));
    $("cart-total").textContent = total > 0 ? fmt(total) + (surDemande ? " + prix sur demande" : "") : (l.length ? "Sur demande" : fmt(0));
    $("send-order").disabled = !l.length;
  }
  $("cart-items").addEventListener("click", (e) => {
    const { inc, dec } = e.target.dataset;
    if (inc) panier[inc]++;
    if (dec) { panier[dec]--; if (panier[dec] <= 0) delete panier[dec]; }
    sauver();
    renderPanier();
  });

  const ouvrir = () => { $("drawer").hidden = false; $("overlay").hidden = false; };
  const fermer = () => { $("drawer").hidden = true; $("overlay").hidden = true; };
  $("cart-open").addEventListener("click", ouvrir);
  $("step-cart").addEventListener("click", ouvrir);
  $("step-wa").href = waLink("Bonjour " + BOUTIQUE.nom + ", j'ai une question sur la livraison et le paiement.");
  $("cart-close").addEventListener("click", fermer);
  $("overlay").addEventListener("click", fermer);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") fermer(); });

  $("send-order").addEventListener("click", () => {
    const l = lignes();
    if (!l.length) return;
    const nom = $("client-nom").value.trim();
    const adresse = $("client-adresse").value.trim();
    let msg = "Bonjour " + BOUTIQUE.nom + ", je souhaite commander :\n\n";
    l.forEach(({ q, p }) => {
      msg += "• " + q + " x " + p.nom + (p.prix > 0 ? " (" + fmt(p.prix * q) + ")" : "") + "\n";
    });
    msg += "\nTotal : " + $("cart-total").textContent;
    if (nom) msg += "\nNom : " + nom;
    if (adresse) msg += "\nAdresse : " + adresse;
    window.open(waLink(msg), "_blank", "noopener");
  });

  renderFiltres();
  renderProduits();
  renderPanier();
})();
