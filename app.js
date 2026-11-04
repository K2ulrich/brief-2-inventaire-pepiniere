// Inventaire de la pépinière — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { GROUPES, ajouterPlant, formaterPlant, listerPlants, trouverParId } from './src/registre.js';
import { filtrerParGroupe, rechercherParNom, trierParNombrePlants } from './src/recherche.js';
import { SEUIL_STOCK_FAIBLE, especeLaPlusAbondante, stocksFaibles, syntheseParGroupe, totalPlants } from './src/synthese.js';
import { groupeLePlusFourni, modifierPlant, supprimerPlant, trierParNombrePlantsDecroissant } from './src/bonus.js';

const FICHIER_DONNEES = 'donnees/plants.json';

function afficherAccueil() {
  console.log('==================================================');
  console.log('   INVENTAIRE DE LA PÉPINIÈRE');
  console.log('   Pépinière pédagogique');
  console.log('==================================================');
}

function afficherMenu() {
  console.log('\n--------------------- MENU ---------------------');
  console.log('1. Ajouter un plant');
  console.log("2. Lister l'inventaire");
  console.log('3. Rechercher (code, nom, groupe)');
  console.log('4. Trier (nombre de plants)');
  console.log('5. Synthèse des quantités');
  console.log('6. Supprimer un plant');
  console.log('7. Modifier un plant');
  console.log('0. Quitter');
}

async function ajouter(plants) {
  console.log('--- Ajouter un plant ---');
  const questions = [
    ['id', 'Code du plant (ex. N11) : '],
    ['nomCommun', 'Nom commun (ex. Papayer) : '],
    ['groupe', `Groupe botanique (${GROUPES.join(' ou ')}) : `],
    ['nombrePlants', 'Nombre de plants (entier) : '],
    ['dateReleve', 'Date de relevé (AAAA-MM-JJ) : '],
  ];
  
  const reponses = {};
  for (const [champ, question] of questions) {
    const reponse = await demander(question);
    if (reponse === null) {
      return;
    }
    reponses[champ] = reponse;
  }

  const saisie = {
    id: reponses.id.toUpperCase(),
    nomCommun: reponses.nomCommun.toLowerCase(),
    groupe: reponses.groupe.toLowerCase(),
    nombrePlants: reponses.nombrePlants,
    dateReleve: reponses.dateReleve,
  };

  const erreurs = ajouterPlant(plants, saisie);
  if (erreurs.length === 0) {
    await enregistrerJson(FICHIER_DONNEES, plants);
    console.log(`Plant ${saisie.id} ajouté. L'inventaire compte ${plants.length} espèce(s).`);
  } else {
    console.log('Ajout refusé :');
    for (const erreur of erreurs) {
      console.log(`  - ${erreur}`);
    }
    console.log(`L'inventaire compte ${plants.length} espèce(s).`);
  }
}

function lister(plants) {
  console.log(`--- Inventaire (${plants.length} espèce(s)) ---`);
  console.log(listerPlants(plants));
}

async function rechercher(plants) {
  console.log('--- Rechercher ---');
  console.log('1. par code');
  console.log('2. par nom commun');
  console.log("3. Les espèces d'un groupe botanique");
  const choix = await demander('Votre choix : ');
  if (choix === null) {
    return;
  }
  
  if (choix === '1') {
    const reponse = await demander('Code : ');
    if (reponse === null) {
      return;
    }
    const id = reponse.toUpperCase();
    const plant = trouverParId(plants, id);
    console.log(plant === undefined ? `Plants ${id} introuvable.` : formaterPlant(plant));
  } else if (choix === '2') {
    const reponse = await demander('Nom ou partie du nom  : ');
    if (reponse === null) {
      return;
    }
    const nom = reponse.toLowerCase();
    const resultats = rechercherParNom(plants, nom);
    console.log(`${resultats.length} espèce(s) dont le nom contient « ${nom} » :`);
    console.log(listerPlants(resultats));
  } else if (choix === '3') {
    const reponse = await demander(`Groupe botanique (${GROUPES.join(' ou ')}) : `);
    if (reponse === null) {
      return;
    }
    const groupe = reponse.toLowerCase();
    const trouves = filtrerParGroupe(plants, groupe);
    console.log(`${trouves.length} espèce(s) du groupe "${groupe}" :`);
    console.log(listerPlants(trouves));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }
}

async function trier(plants) {
  console.log('--- Trier ---');
  console.log('1. par nombre de plants (croissant)');
  console.log('2. par nombre de plants (décroissant)');
  const choix = await demander('Votre choix : ');
  if (choix === null) {
    return;
  }
  
  if (choix === '1') {
    console.log(listerPlants(trierParNombrePlants(plants)));
  } else if (choix === '2') {
    console.log(listerPlants(trierParNombrePlantsDecroissant(plants)));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }
}
function synthese(plants) {
  console.log("--- Synthèse de l'inventaire ---");
  console.log(`Nombre d'espèces : ${plants.length}`);
  console.log(`Stock total : ${totalPlants(plants)} plants`);

  console.log('par groupe botanique :');
  for (const [groupe, resume] of Object.entries(syntheseParGroupe(plants))) {
    console.log(`  - ${groupe} : ${resume.especes} espèce(s), ${resume.plants} plants`);
  }

  const fourni = groupeLePlusFourni(plants);
  if (fourni === null) {
    console.log('Groupe le plus fourni : aucune donnée');
  } else {
    console.log(`Groupe le plus fourni : ${fourni.groupe} (${fourni.plants} plants)`);
  }

  const abondante = especeLaPlusAbondante(plants);
  if (abondante === null) {
    console.log('Espèce la plus abondante : aucune donnée');
  } else {
    console.log(`Espèce la plus abondante : ${formaterPlant(abondante)}`);
  }

  const faibles = stocksFaibles(plants, SEUIL_STOCK_FAIBLE);
  console.log(`Stocks faibles (≤ ${SEUIL_STOCK_FAIBLE} plants) : ${faibles.length}`);
  for (const plant of faibles) {
    console.log(`  ${formaterPlant(plant)}`);
  }
  console.log(`Rappel : le seuil de ${SEUIL_STOCK_FAIBLE} plants est un repère pédagogique de suivi, pas une recommandation de production.`);
}

async function supprimer(plants) {
  const reponse = await demander('Identifiant : ');
  if (reponse === null) {
    return;
  }
  const id = reponse.toUpperCase();
  const retire = supprimerPlant(plants, id);
  if (retire === undefined) {
    console.log(`Plant ${id} introuvable.`);
    return;
  }
  await enregistrerJson(FICHIER_DONNEES, plants);
  console.log(`Plant ${id} supprimé. L'inventaire compte ${plants.length} espèce(s).`);
}

async function modifier(plants) {
  const reponseId = await demander('Identifiant : ');
  if (reponseId === null) {
    return;
  }
  const champ = await demander('Champ à modifier (nomCommun, groupe, nombrePlants, dateReleve) : ');
  if (champ === null) {
    return;
  }
  const reponseValeur = await demander('Nouvelle valeur : ');
  if (reponseValeur === null) {
    return;
  }

  const id = reponseId.toUpperCase();
  const valeur = champ === 'nomCommun' || champ === 'groupe' ? reponseValeur.toLowerCase() : reponseValeur;
  const erreurs = modifierPlant(plants, id, champ, valeur);
  if (erreurs.length === 0) {
    await enregistrerJson(FICHIER_DONNEES, plants);
    console.log(`Plant ${id} modifié.`);
  } else {
    console.log('Modification refusée :');
    for (const erreur of erreurs) {
      console.log(`  - ${erreur}`);
    }
  }
}

async function charger() {
  try {
    const plants = await chargerJson(FICHIER_DONNEES);
    if (!Array.isArray(plants)) {
      throw new Error("le fichier ne contient pas un tableau");
    }
    console.log(`${plants.length} espèce(s) chargée(s) depuis ${FICHIER_DONNEES}.`);
    return plants;
  } catch (erreur) {
    console.log(`Impossible de lire ${FICHIER_DONNEES} : ${erreur.message}. L'inventaire démarre vide.`);
    return [];
  }
}

async function main() {
  ouvrirSaisie();
  afficherAccueil();
  const plants = await charger();

  while (true) {
    afficherMenu();
    const choix = await demander('Votre choix : ');
    if (choix === null || choix === '0') {
      console.log('Au revoir !');
      break;
    }

    try {
      switch (choix) {
        case '1':
          await ajouter(plants);
          break;
        case '2':
          lister(plants);
          break;
        case '3':
          await rechercher(plants);
          break;
        case '4':
          await trier(plants);
          break;
        case '5':
          synthese(plants);
          break;
        case '6':
          await supprimer(plants);
          break;
        case '7':
          await modifier(plants);
          break;
        default:
          console.log(`Choix inconnu : « ${choix} ». Tapez un chiffre du menu.`);
      }
    } catch (erreur) {
      if (erreur.message.startsWith('TODO')) {
        console.log(`À compléter : ${erreur.message}`);
      } else {
        console.log(`Erreur inattendue : ${erreur.message}`);
      }
    }
  }

  fermerSaisie();
}

main();
