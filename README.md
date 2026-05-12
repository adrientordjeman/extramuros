# 🧠 Algorithme de Match Rate - Quartier Idéal

Ce document détaille les sources de données, les colonnes utilisées et les formules mathématiques exactes pour chaque métrique du Match Rate.

---

## 1. Immobilier & Budget
*Le score immobilier est un multiplicateur de faisabilité (0.0 à 1.0).*

| Métrique | Calcul / Formule | Source & Colonne |
| :--- | :--- | :--- |
| **Abordabilité** | `if b > median: 0.85 + 0.15 * (b-median)/(p75-median)`<br>`else if b > p25: 0.3 + 0.55 * (b-p25)/(median-p25)` | **Geo-DVF 2025**<br>`median`, `p25`, `p75` |
| **Disponibilité (Maison)** | `if house: pav < 0.05 ? 0.1 : (pav < 0.15 ? 0.4 : 1.0)` | **Calculé (Scripts)**<br>`pav` (ratio pavillonnaire) |
| **Bonus Jardin** | `if garden_checked: score *= (gVol > 0 ? 1.0 : (pav > 0.4 ? 0.8 : 0.5))` | **BPE / IA Satellite**<br>`gVol` (compte jardins) |

---

## 2. Mobilité
*Calculé par destination (travail) puis moyenné.*

| Métrique | Calcul / Formule | Source & Colonne |
| :--- | :--- | :--- |
| **Score Base Durée** | `ratio = dur/lim`<br>`if ratio <= 1: 100 - (ratio*50)`<br>`else: max(0, 50 - (ratio-1)*100)` | **IDFM / OTP**<br>`duration` (sec) |
| **Fiabilité Ligne** | `multiplier = product(TRANSPORT_QUALITY[line])`<br>*Ex: RER A = 0.95, Ligne 14 = 1.05* | **Mapping Manuel**<br>`main.js > TRANSPORT_QUALITY` |
| **Pénalité Changement** | `multiplier *= 0.85 ^ nb_correspondances` | **IDFM Itinerary**<br>`itinerary.length - 1` |

---

## 3. Qualité de Vie
*Fusion de l'environnement (nature, calme) et du contexte social (sérénité, cohésion).*

Le score **Qualité de Vie** est la moyenne pondérée de la qualité environnementale et de la cohésion sociale.

### 🍃 Composante Environnement
| Métrique | Calcul / Formule | Source |
| :--- | :--- | :--- |
| **Indice Nature** | `min(100, nature + blueBonus + parkBonus)` | **Copernicus / OSM** |
| **Calme Sonore** | `100 - malus_bruit` (0 penalty < 45dB) | **Bruitparif** |

### 🛡️ Composante Cohésion Sociale
Indice de sérénité résidentielle (Base 100 pts) :
- **Zone Prioritaire (QPV 2024)** : `-35 pts` (Identifié par contours officiels ANCT).
- **Précarité Économique** : `-1.5 pt` par point de pauvreté au-dessus de 15%.
- **Concentration HLM** : `-0.8 pt` par point de logement social au-dessus de 40%.
- **Fragilité Familiale** : `-1.0 pt` par point de familles monoparentales au-dessus de 20%.

---

## 4. Vie de quartier (Vibes & Tags)
*Le quartier possède-t-il l'ambiance recherchée ?*

L'algorithme n'utilise plus de "score de match" continu pour la vibe, mais une validation binaire (Oui/Non) basée sur un seuil de **60% d'appartenance** à l'archétype.

*   **Multi-Vibe** : Un quartier peut porter plusieurs tags simultanément.
*   **Affichage** : Les tags sont affichés sous forme de badges colorés.
*   **Impact Score** : Vaut **100** si l'archétype match, **0** sinon.

---

## 5. Famille
*Optimisé pour l'éducation et la stabilité résidentielle.*

---

## 6. Calcul du Match Rate Global (Pondéré)
*Le score final est une moyenne pondérée des 5 dimensions.*

- **30% Immobilier** (Prix vs Budget)
- **25% Mobilité** (Temps de trajet & Fiabilité)
- **30% Qualité de Vie** (Nature & Sérénité sociale)
- **10% Vie de quartier** (Archétype match)
- **10% Famille** (Écoles & IPS)

*Note: Si le score Immobilier est de 0 (budget insuffisant), le match rate total est forcé à 0.*

---

## 🛠️ Données Sources & Millésimes
1.  **INSEE** : Bases IRIS 2020/2021/2022 (Filosofi, Logement, Activité, Familles).
2.  **DGFIP** : Demandes de Valeurs Foncières (DVF) traitées pour 2024-2025.
3.  **Ministère de l'Éducation** : IPS 2023-2024 et Registre des établissements.
4.  **Bruitparif** : Cartographie du bruit stratégique (Lden).
5.  **Copernicus** : Urban Atlas 2018/2024 (Tree Cover Density).
6.  **IDFM** : Données temps de parcours et fiabilité théorique des lignes.
# extramuros
