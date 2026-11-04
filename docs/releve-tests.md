# Relevé des tests

> Écrivez le résultat attendu avant d'essayer. Un écart n'est pas une faute : notez-le, corrigez, refaites le test.

**Calculs à la main** : stock total 240 plants ; angiospermes 8 espèces et 222 plants ; gymnosperme 2 espèces et 18 plants ; stocks faible N09 et N10 ; espèce la plus abondante NO4 (tomate, 50). Le programme donne les memes résultats (choix 5).

**Tests automatiques** : `npm test` donne 37 tests réussis, 0 échec (outils 3, stockage 3, registre 11, recherche 5, synthèse 6, bonus 9).

**Essais dans le menu** : un ajout valide (encore là après redémarrage), chaque règle refusée, une recherche introuvable, chaque tri, la synthèse, un choix inconnu.

| Action | Attendu | Obtenu | Testeur |
| --- | --- | --- | --- |

| Rechercher n09 (choix 3;1) |`N09\| pin \| gymnosperme\| 8 plants\| 2026-10-24` |conforme | |
| Rechercher `n09`(choix 3, 1) |`pin` `gymnsosperme\| 8 plants\| 2026-10-24` |conforme |execution du programme |
|Rechercher `n81`|`Plant N81 introuvable.` |conforme |execution du programme |
|Filtrer `Gymnosperme`  |N09 et N10 |conforme |execution du programme |
|Trier (croissant)   | commence par N09 puis N10, la liste (choix 2) reste dans l'ordre d'origine |conforme |execution |
|Ajouter N11 (papayer, angiosperme, 15, 2026-10-27)  |ajout, 11 espèces, enregistré dans le fichier |conforme |execution du programme |
|  | | | |
**Sur un autre poste** (`git clone`, `node app.js`, `npm test`, en suivant le README) : j'ai cloné le depot sur le PC de mon voisin, j'ai lancé et j'ai vu que les tests etaient pareils que sur ma machine.