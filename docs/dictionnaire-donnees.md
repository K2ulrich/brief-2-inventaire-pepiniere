# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ | Signification | Type | Règle de validation | Unité | Exemple |
| --- | --- | --- | --- | --- | --- |
| `id` | Identifiant unique | texte | non vide, absent des données | — | `N09`|
| `nomCommun`|Nom commun de l'espèce |texte |non vide |--- | `pin`|
| `groupe` |Groupe botanique fourni par le coach |texte |`angiosperme` ou `gymnosperme` |--- |`gymnosperme` |
| `nombreDeplant` |Nombre de plants disponibles |nombre |entier positif ou nul |plants |`8` |
| `dateReleve` | Date du comptage | texte |date réelle au format,`AAAA-MM-JJ` |--- | `2026-10-24` |

**Listes de valeurs autorisées** : `groupe`{ `angiosperme`, `gymnosperme`}.

**Sources** : `SUJET.md` et `donnees/plants.json`(données fictives); groupes fournis par le coach agronomie.
