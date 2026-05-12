
import sys

path = '/Users/adrientordjeman/Documents/quartier_ideal/main.js'
with open(path, 'r') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    # Fix the missing braces after services case
    if '</div>' in line and i + 1 < len(lines) and 'const envData' in lines[i+1]:
        new_lines.append('                </div>\n')
        new_lines.append('            `;\n')
        new_lines.append('        }\n')
        new_lines.append('\n')
        new_lines.append('        case \'env\':\n')
    elif 'case \'env\':' in line and 'const envData' in lines[i+1]:
        # Already handled or skip
        continue
    else:
        new_lines.append(line)

with open(path, 'w') as f:
    f.writelines(new_lines)
