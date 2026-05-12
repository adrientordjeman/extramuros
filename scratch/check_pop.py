
import pandas as pd
df = pd.read_csv('/Users/adrientordjeman/Documents/quartier_ideal/data/base-ic-couples-familles-menages-2022.CSV', sep=';', low_memory=False)
df['COM'] = df['COM'].astype(str).str.zfill(5)
colombes_pop = df[df['COM'] == '92025']['C22_PMEN'].sum()
print(f"Colombes Population: {colombes_pop}")
