# Inventaire de la pépinière

> Projet individuel du SAS DFS, brief 2 (sujet : [SUJET.md](SUJET.md)). Remplacez chaque ✏️ par votre texte, puis supprimez cette ligne.

## Contexte

L'outil est destiné à un responsable d'une pepinière pédagogique, qui compte des plants étiquetés de plusieurs espèces et applique la classification botanique fournie par le coach agronomie (angiospermes ou gymnospermes). Son besoin est de retrouver une espèce, lire son groupe botanique et voir les quantités disponibles, alors que son inventaire est dispersé. Ce programme à pour but de faciliter son travail. Il saisit un code, un nom commun, un groupe, un nombre de plants et la date du relevé. Le programme lui affiche l'inventaire, les resultats de recherche et de tri, et une synthèse (stock total, quantités par groupe, espèce la plus abondante, stocks faibles). L'outil ne reconnait pas les espèces : le groupe est saisi tel que fourni par le coach, et il ne donne aucune consigne de production.

## Prérequis et lancement

- Node.js 20 ou plus récent, Git ; aucune bibliothèque à installer.

```bash
git clone https://github.com/VOTRE-COMPTE/brief-2-inventaire-pepiniere.git
cd brief-2-inventaire-pepiniere
node app.js
npm test
```

Sous PowerShell, si `npm` est bloqué : `npm.cmd test`.

## Fonctionnalités

✏️ *Cochez seulement ce qui marche : `- [x]`.*

- [x] Données lues et enregistrées dans `donnees/plants.json`
- [x] Ajouter un plant, saisies invalides refusées sans arrêter le programme
- [x] Lister l'inventaire, message si l'inventaire est vide
- [x] Rechercher par code ou par nom ; filtrer par groupe botanique
- [x] Trier par nombre de plants
- [x] Synthèse : stock total, espèces et plants par groupe, espèce la plus abondante, stocks faibles (≤ 10 plants)
- [ ] Bonus : supprimer et modifier un plant (choix 6 et 7)
- [ ] Bonus : tri décroissant, groupe le plus fourni

## Données

✏️ *Le fichier, le nombre de lignes, les champs (voir [docs/dictionnaire-donnees.md](docs/dictionnaire-donnees.md)), l'unité. Rappelez qu'elles sont fictives et que les groupes sont fournis par le coach.*

Fichier `donnees/plants.json` : 10 lignes au depart ( une ligne = une espèce et son nombre de plants), toutes relevées le 24 octobre 2026. Champs : `id`, `nomCommun`, `groupe`, `nombrePlants` (nombre de plants, entier), `dateReleve`.

## Limites

✏️ *Au moins trois. Par exemple : le seuil de 10 plants est un repère de suivi, pas une recommandation de production.*

Les groupes botaniques sont fournis et validés par le coach, le programme n'identifie aucune espèce.
Un seul utilisateur à la fois, le fichier JSON n'est pas protégé contre une modification simultanée.
Pas d'historique des relevés : une ligne ne garde que sa dernière date.

## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

ESSIBAH BEAUFILS ULRICH KONAN_K2ulrich
Aide d'une IA (Claude) pour l'explication des fichiers md.
