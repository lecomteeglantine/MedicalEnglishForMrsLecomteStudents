FGSM3 DAY 1 INDIVIDUAL — HOTFIX 2026-08-31

CAUSE DE LA PANNE IDENTIFIÉE
Le fichier actuellement publié sur GitHub contient une chaîne JavaScript cassée par un retour à la ligne dans le Final Live Shift. Cette erreur de syntaxe empêche tout le moteur JavaScript de s'exécuter, donc le bouton Start ne fonctionne plus.

CORRECTION
Le fichier fgsm3-day1-individual.html de ce ZIP contient la version R5 dont le moteur JavaScript passe le contrôle de syntaxe Node.js.

À FAIRE
1. Sur la branche main du dépôt MedicalEnglishForMrsLecomteStudents, remplacer UNIQUEMENT fgsm3-day1-individual.html par celui de ce ZIP.
2. Commit changes.
3. Attendre la publication GitHub Pages.
4. Sur la page du jeu, faire Ctrl+Shift+R (Windows) ou Cmd+Shift+R (Mac).

IMPORTANT
Ne pas copier/coller le contenu du HTML dans l'éditeur GitHub : uploader directement le fichier afin d'éviter de réintroduire des retours à la ligne dans les chaînes JavaScript.
