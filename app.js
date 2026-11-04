// Inventaire de la pépinière — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { GROUPES, ajouterPlant, formaterPlant, listerPlants, trouverParId } from './src/registre.js';
import { filtrerParGroupe, rechercherParNom, trierParNombrePlants } from './src/recherche.js';
import { SEUIL_STOCK_FAIBLE, especeLaPlusAbondante, stocksFaibles, syntheseParGroupe, totalPlants } from './src/synthese.js';

const FICHIER_DONNEES = 'donnees/plants.json';

function afficherAccueil() {
  console.log('==================================================');
  console.log('   INVENTAIRE DE LA PÉPINIÈRE');
  console.log('   Pépinière pédagogique');
  console.log('==================================================');
}

function afficherMenu() {
  console.log('\n-------------------- MENU --------------------');
  console.log('1. Ajouter un plant');
  console.log("2. Lister l'inventaire");
  console.log('3. Rechercher (code, nom, groupe)');
  console.log('4. Trier (nombre de plants)');
  console.log('5. Synthèse des quantités)');
  console.log('6. Supprimer un plant');
  console.log('7. modifier un plant');
  console.log('0. Quitter');
}

async function ajouter(plants) {
  console.log('--- Ajouter un plant ---');
  const questions = [
    ['id', 'Code du plant (ex. N11) : '],
    ['nomCommun', 'Nom commun (ex. Papayer) : '],
    ['groupe', `Groupe botanique(${GROUPES.join('ou ')}) : `],
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
