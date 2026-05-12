import pandas as pd
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

def debug_csv(url, name):
    print(f"--- Debugging {name} ---")
    try:
        df = pd.read_csv(url, sep=';', nrows=1, encoding='utf-8-sig')
        print(f"Columns: {df.columns.tolist()}")
        print(f"First row: {df.iloc[0].to_dict()}")
    except Exception as e:
        print(f"Error: {e}")

res_equip_url = "https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es-equipement/exports/csv"
res_inst_url = "https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es-installation/exports/csv"
caf_hist_url = "https://data.caf.fr/api/explore/v2.1/catalog/datasets/nbpla_pe_com_hist/exports/csv?use_labels=true&delimiter=%3B"

debug_csv(res_equip_url, "RES Equipment")
debug_csv(res_inst_url, "RES Installations")
debug_csv(caf_hist_url, "CAF History")
