import json

with open("public/commune_safety.json") as f:
    data = json.load(f)

tot_pop = 0
tot_burg = 0
tot_ass = 0
tot_theft = 0

for k, v in data.items():
    if k == 'idf_average': continue
    pop = v['population']
    if pop > 0:
        tot_pop += pop
        tot_burg += v['burglaries']
        tot_ass += v['assaults']
        tot_theft += v['thefts']

avg_burg = round((tot_burg / tot_pop) * 1000, 2)
avg_ass = round((tot_ass / tot_pop) * 1000, 2)
avg_theft = round((tot_theft / tot_pop) * 1000, 2)

data['idf_average'] = {
    'burglaries_rate': avg_burg,
    'assaults_rate': avg_ass,
    'thefts_rate': avg_theft
}

with open("public/commune_safety.json", "w") as f:
    json.dump(data, f)

print(f"Averages: Burglaries: {avg_burg}, Assaults: {avg_ass}, Thefts: {avg_theft}")
