// Synthèse des quantités disponibles.
// Fiche : fiches/5-synthese.md · Vérifier : npm run test:synthese

// Seuil de suivi des stocks faibles, en nombre de plants. C'est un repère pédagogique,
// pas une recommandation de production.
export const SEUIL_STOCK_FAIBLE = 10;

// Renvoie le nombre total de plants. Liste vide : 0.
export function totalPlants(plants) {
  let total = 0;
  for (const plant of plants) {
    total += plant.nombrePlants;
  }
  return total;
}

// Renvoie un objet : pour chaque groupe, le nombre d'espèces (de lignes) et le total de plants.
// Exemple : { angiosperme: { especes: 8, plants: 222 }, gymnosperme: { especes: 2, plants: 18 } }
// Liste vide : {} (un objet vide).
export function syntheseParGroupe(plants) {
  const synthese = {};
  for (const plant of plants) {
    const cle = plant.groupe;
    if (synthese[cle] === undefined ) {
      synthese[cle] = { especes: 0, plants: 0 };
    }
    synthese[cle].especes += 1;
    synthese[cle].plants += plant.nombrePlants;
  }
  return synthese;
}

// Renvoie un NOUVEAU tableau avec les plants dont le nombre est INFÉRIEUR OU ÉGAL au seuil.
// Exemple : stocksFaibles(donnees, 10) → N09 (8 plants) et N10 (10 plants)
export function stocksFaibles(plants, seuil) {
  return plants.filter(plant => plant.nombrePlants <= seuil);
}

// Renvoie le plant (la ligne d'inventaire) qui a le plus grand nombre de plants,
// le premier rencontré en cas d'égalité, ou null si l'inventaire est vide.
// Exemple : especeLaPlusAbondante(donnees) → N04 (tomate, 50 plants)
export function especeLaPlusAbondante(plants) {
  let meilleur = null;
  for (const plant of plants) {
    if (meilleur === null || plant.nombrePlants > meilleur.nombrePlants) {
      meilleur = plant;
    }
  }
  return meilleur;
  }
