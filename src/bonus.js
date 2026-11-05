// BONUS — Pour aller plus loin. Facultatif : commencez seulement quand le socle est complet.
// Fiche : fiches/7-bonus.md · Vérifier : npm run test:bonus
// Pas de modèle pour ce fichier : à vous de combiner ce que vous avez appris.
import { versNombre } from './outils.js';
import { trouverParId, verifierPlant, creerPlant } from './registre.js';
import { syntheseParGroupe } from './synthese.js';

// Les champs qu'on a le droit de modifier. L'identifiant n'en fait pas partie.
export const CHAMPS_MODIFIABLES = ['nomCommun', 'groupe', 'nombrePlants', 'dateReleve'];

// Supprime de l'inventaire le plant qui a cet identifiant.
// Renvoie le plant supprimé, ou undefined s'il n'existe pas (l'inventaire ne change pas).
export function supprimerPlant(plants, id) {
  const index = plants.findIndex(plant => plant.id === id);
  if (index === -1) {
    return undefined;
  }
  return plants.splice(index, 1)[0];
}

// Modifie un champ d'un plant. valeur arrive sous forme de TEXTE, comme dans le menu.
// Renvoie un tableau d'erreurs : [] si la modification est faite.
// Erreurs : identifiant inconnu · champ 'id' (l'identifiant n'est pas modifiable) · champ absent de
// CHAMPS_MODIFIABLES · valeur refusée par les règles de l'ajout. S'il y a une erreur, rien ne change.
// nombrePlants est enregistré comme un nombre.
export function modifierPlant(plants, id, champ, valeur) {
  const plant = trouverParId(plants, id);
  if (plant === undefined) {
    return [`Le plant ${id} est introuvable.`];
  }
  if (champ === 'id') {
    return ["Le champ 'id' ne peut pas être modifié."];
  }
  if (!CHAMPS_MODIFIABLES.includes(champ)) {
    return [`Champ inconnu '${champ}'. Champs possibles : ${CHAMPS_MODIFIABLES.join(', ')}.`];
  }

  const saisie = { ...plant, nombrePlants: String(plant.nombrePlants), [champ]: valeur };
  const autresPlants = plants.filter((autre) => autre !== plant);
  const erreurs = verifierPlant(saisie, autresPlants);
  if (erreurs.length > 0) {
    return erreurs;
  }

  plant[champ] = creerPlant(saisie)[champ];
  return [];
}

// Renvoie une COPIE triée par nombre de plants décroissant.
// Deux plants de même nombre gardent leur ordre d'origine. Le tableau reçu ne change pas.
export function trierParNombrePlantsDecroissant(plants) {
  return [...plants].sort((a, b) => b.nombrePlants - a.nombrePlants);
}

// Renvoie { groupe, plants } pour le groupe botanique qui a le plus de plants au total,
// le premier rencontré en cas d'égalité, ou null si l'inventaire est vide.
// Exemple : groupeLePlusFourni(donnees) → { groupe: 'angiosperme', plants: 222 }
export function groupeLePlusFourni(plants) {
  let meilleur = null;
  for (const [groupe, resume] of Object.entries(syntheseParGroupe(plants))) {
    if (meilleur === null || resume.plants > meilleur.plants) {
      meilleur = { groupe, plants: resume.plants };
    }
  }
  return meilleur;
}
