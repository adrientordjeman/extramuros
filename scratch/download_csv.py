import pandas as pd
import ssl
import urllib.request
ssl._create_default_https_context = ssl._create_unverified_context

url = "https://static.data.gouv.fr/resources/bases-statistiques-communale-departementale-et-regionale-de-la-delinquance-enregistree-par-la-police-et-la-gendarmerie-nationales/20260326-124144/donnee-data.gouv-2025-geographie2025-produit-le2026-02-03.csv.gz"
df = pd.read_csv(url, sep=';', usecols=['indicateur'], compression='gzip')
print("Unique indicateurs:", df['indicateur'].unique().tolist())
