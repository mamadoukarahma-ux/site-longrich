(function () {
  const $ = (id) => document.getElementById(id);
  const fmt = (n) => n.toLocaleString("fr-FR") + " " + BOUTIQUE.devise;
  const prixTexte = (p) => (p.prix > 0 ? fmt(p.prix) : "Prix sur demande");
  const waLink = (msg) => "https://wa.me/" + BOUTIQUE.whatsapp + (msg ? "?text=" + encodeURIComponent(msg) : "");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // --- Textes de la boutique ---
  document.title = BOUTIQUE.nom + " — Produits Longrich";
  $("brand-name").textContent = BOUTIQUE.nom;
  $("hero-slogan").textContent = BOUTIQUE.slogan + " · " + BOUTIQUE.ville;
  $("hero-livraison").textContent = BOUTIQUE.livraison.split(".")[0];
  $("about-text").textContent =
    "Je m'appelle " + BOUTIQUE.nom + ", " + BOUTIQUE.slogan.toLowerCase() + " basé à " + BOUTIQUE.ville +
    ". Je vous conseille et vous aide à choisir les produits adaptés à vos besoins. " + BOUTIQUE.livraison;
  $("footer-text").textContent = "© " + new Date().getFullYear() + " " + BOUTIQUE.nom + " · " + BOUTIQUE.ville;

  const helloMsg = "Bonjour " + BOUTIQUE.nom + ", je souhaite avoir des informations sur vos produits Longrich.";
  $("hero-whatsapp").href = waLink(helloMsg);
  $("wa-float").href = waLink(helloMsg);
  [$("hero-whatsapp"), $("wa-float")].forEach((a) => { a.target = "_blank"; a.rel = "noopener"; });

  const contacts = [
    ["WhatsApp", BOUTIQUE.telephone, waLink(helloMsg)],
    ["Téléphone", BOUTIQUE.telephone, "tel:" + BOUTIQUE.telephone.replace(/\s/g, "")],
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
    $("grid").innerHTML = PRODUITS.map((p, i) => ({ p, i }))
      .filter(({ p }) => filtre === "Tous" || p.categorie === filtre)
      .map(({ p, i }) => `
        <article class="card">
          <div class="card-media">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.nom)}" loading="lazy">` : esc(p.icone || "🛍️")}</div>
          <div class="card-body">
            <span class="card-cat">${esc(p.categorie)}</span>
            <h3>${esc(p.nom)}</h3>
            <p>${esc(p.description)}</p>
            <div class="card-foot">
              <span class="price">${prixTexte(p)}</span>
              <button class="add-btn" data-add="${i}">Ajouter</button>
            </div>
          </div>
        </article>`)
      .join("");
  }
  $("filters").addEventListener("click", (e) => {
    const cat = e.target.dataset.cat;
    if (!cat) return;
    filtre = cat;
    renderFiltres();
    renderProduits();
  });
  $("grid").addEventListener("click", (e) => {
    const i = e.target.dataset.add;
    if (i === undefined) return;
    panier[i] = (panier[i] || 0) + 1;
    sauver();
    renderPanier();
    e.target.textContent = "Ajouté ✓";
    setTimeout(() => (e.target.textContent = "Ajouter"), 900);
  });

  // --- Panier ---
  let panier = {};
  try { panier = JSON.parse(localStorage.getItem("panier") || "{}"); } catch (_) { panier = {}; }
  const sauver = () => { try { localStorage.setItem("panier", JSON.stringify(panier)); } catch (_) {} };

  function lignes() {
    return Object.entries(panier)
      .filter(([i, q]) => PRODUITS[i] && q > 0)
      .map(([i, q]) => ({ i, q, p: PRODUITS[i] }));
  }
  function renderPanier() {
    const l = lignes();
    $("cart-count").textContent = l.reduce((s, x) => s + x.q, 0);
    $("cart-items").innerHTML = l.length
      ? l.map(({ i, q, p }) => `
          <div class="line">
            <span class="line-name">${esc(p.nom)}</span>
            <div class="qty"><button data-dec="${i}">−</button>${q}<button data-inc="${i}">+</button></div>
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
    if (inc !== undefined) panier[inc]++;
    if (dec !== undefined) { panier[dec]--; if (panier[dec] <= 0) delete panier[dec]; }
    sauver();
    renderPanier();
  });

  const ouvrir = () => { $("drawer").hidden = false; $("overlay").hidden = false; };
  const fermer = () => { $("drawer").hidden = true; $("overlay").hidden = true; };
  $("cart-open").addEventListener("click", ouvrir);
  $("cart-close").addEventListener("click", fermer);
  $("overlay").addEventListener("click", fermer);

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
