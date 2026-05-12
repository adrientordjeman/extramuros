
import pandas as pd

df = pd.read_csv('/Users/adrientordjeman/Documents/quartier_ideal/data/Balance_Commune_2024_Dec2025.csv', sep=';', low_memory=False, encoding='latin-1')
colombes = df[df['INSEE'] == 25] # Wait, INSEE is 204 in the head? No, 25 is Colombes' code in 92. 
# Ah, I see 92025. In the Balance file, INSEE column might be just the last 3 digits or the full code.
# Let's check.
print(df[df['LBUDG'].str.contains('COLOMBES', na=False)]['INSEE'].unique())
