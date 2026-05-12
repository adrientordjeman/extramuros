
path = '/Users/adrientordjeman/Documents/quartier_ideal/main.js'
with open(path, 'r') as f:
    content = f.read()

# Fix the specific line: l'eau
content = content.replace("l'eau", "l\\'eau")

with open(path, 'w') as f:
    f.write(content)
