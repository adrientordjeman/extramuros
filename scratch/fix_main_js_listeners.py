path = '/Users/adrientordjeman/Documents/quartier_ideal/main.js'
with open(path, 'r') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if 'window.selectedVibes = ' in line or 'window.setPropertyType = function' in line:
        if 'window.selectedVibes' in line:
            continue # We will insert it anyway
        
        new_lines.append("window.selectedVibes = ['bobo'];\n")
        new_lines.append("\n")
        new_lines.append("document.addEventListener('DOMContentLoaded', () => {\n")
        new_lines.append("    document.querySelectorAll('.vibe-chip').forEach(chip => {\n")
        new_lines.append("        chip.addEventListener('click', () => {\n")
        new_lines.append("            const vibe = chip.dataset.vibe;\n")
        new_lines.append("            if (chip.classList.contains('active')) {\n")
        new_lines.append("                if (window.selectedVibes.length > 1) {\n")
        new_lines.append("                    window.selectedVibes = window.selectedVibes.filter(v => v !== vibe);\n")
        new_lines.append("                    chip.classList.remove('active');\n")
        new_lines.append("                }\n")
        new_lines.append("            } else {\n")
        new_lines.append("                window.selectedVibes.push(vibe);\n")
        new_lines.append("                chip.classList.add('active');\n")
        new_lines.append("            }\n")
        new_lines.append("            window.updateFilters();\n")
        new_lines.append("        });\n")
        new_lines.append("    });\n")
        new_lines.append("});\n")
        new_lines.append("\n")
    new_lines.append(line)

with open(path, 'w') as f:
    f.writelines(new_lines)
