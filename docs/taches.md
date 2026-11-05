# Tableau des tâches

> Planifiez vous-même, puis tenez le tableau à jour. Une preuve : un commit, un test vert, un document.

| Tâche | Prévu | Fait le | Preuve |
| --- | --- | --- | --- |
| Poste et dépôt prêts ; besoin compris ; documents commencés |02/11/2026|02/11/2026 |Dépot github créé |
| Fiche 2 : lire et écrire le JSON |02/11/2026 |02/11/2026 (1h) |commit du fichier stockage.js |
| Fiche 3 : ajouter et lister ; choix 1 et 2 ; erreurs |03/11/2026 |03/11/2026 (1 à 2h) |commit des fichiers associés |
| Fiche 4 : rechercher et trier ; choix 3 et 4 | 03/11/2026|03/11/2026 |commit des fichiers associés |
| Fiche 5 : synthèse ; choix 5 |03/11/2026|03/11/2026 |modification et commit du fichier synthèse.js |
| Tests par un camarade ; mes propres tests | 04/11/2026|04/11/2026 |Fallé Jaures |
| Fiche agronomique ; README ; documents | 04/11/2026|05/11/2026 |commit de le fiche agronomique |
| Dépôt cloné et lancé ailleurs ; démonstration répétée | 04/11/2026|05/11/2026 |Fallé Jaures|

| Bonus | | | |

**Blocages**  app.js ne s'exécutait pas car la fonction main() était appelée sans être définie, et l'import de chargerJson était dupliqué. Résolu en définissant main() avant son appel et en supprimant l'import en double.

la fonction creerPlant n'etait pas importé dans bonus donc le test a montré deux erreurs.
