DAY 3 — CORRECTIF URGENT R2 — 1 SEPTEMBRE 2026
================================================

BUG CRITIQUE CONFIRME
Le fichier actuellement présent dans la branche main sous le nom
"fgsm3-day3.html" est encore le jeu individuel complet. Il ne sert donc PAS
de page de choix entre l'activité de groupe et l'activité individuelle.

CE ZIP CORRIGE UNIQUEMENT CE POINT, SANS TOUCHER AUX DEUX JEUX.

A FAIRE SUR GITHUB
1. DEZIPPER ce ZIP sur ton ordinateur.
2. Dans la RACINE du dépôt MedicalEnglishForMrsLecomteStudents, remplacer
   UNIQUEMENT le fichier : fgsm3-day3.html
3. Ne pas supprimer et ne pas renommer :
   - fgsm3-day3-go-bag.html
   - fgsm3-day3-individual.html
4. Commit changes.
5. Ouvrir :
   https://lecomteeglantine.github.io/MedicalEnglishForMrsLecomteStudents/fgsm3-day3.html
6. Si l'ancienne page reste affichée : Ctrl+Shift+R sous Windows.

IMPORTANT
N'UPLOAD PAS LE FICHIER ZIP LUI-MEME DANS LE DEPOT EN PENSANT QU'IL SERA
DECOMPRESSE AUTOMATIQUEMENT. GitHub ne remplace pas le HTML à l'intérieur
d'un ZIP : il faut uploader le fichier fgsm3-day3.html extrait du ZIP.

RESULTAT ATTENDU
La page Day 3 affiche deux cartes côte à côte sur ordinateur :
- GROUP ACTIVITY · 3–4 STUDENTS → Humanitarian Go-Bag Challenge
- INDIVIDUAL ACTIVITY → Humanitarian Field Mission
Sur mobile, les cartes passent proprement l'une sous l'autre.

CONTROLES EFFECTUES SUR CE CORRECTIF
- liens vers les deux activités : OK
- liens navigation / privacy / accessibility : présents
- structure HTML : valide au parsing
- IDs : aucun doublon
- responsive : grille 2 colonnes puis 1 colonne sous 760 px
- clavier : focus visible
- prefers-reduced-motion : pris en compte
- fallback de navigation intégré si la feuille CSS partagée tarde à charger
- paramètres de version ajoutés aux ressources partagées pour limiter le cache
