
import sys

path = '/Users/adrientordjeman/Documents/quartier_ideal/main.js'
with open(path, 'r') as f:
    lines = f.readlines()

# Search for the spot after case 'infra' returns
# 905:                 </div>
# 906:             `;
# 907: 

new_lines = []
inserted = False
for i, line in enumerate(lines):
    new_lines.append(line)
    if '</div>' in line and i + 1 < len(lines) and '`;' in lines[i+1] and not inserted:
        # Check if we are in the infra case
        # We look back a bit
        is_infra = False
        for j in range(max(0, i-50), i):
            if 'case \'infra\':' in lines[j]:
                is_infra = True
                break
        
        if is_infra:
            new_lines.append(lines[i+1]) # Append the `;`
            new_lines.append('        }\n')
            new_lines.append('\n')
            new_lines.append('        case \'env\':\n')
            new_lines.append('            const envData = matchData.details?.env || {};\n')
            new_lines.append('            const calmScore = Math.max(0, 100 - (props.noise || 0));\n')
            new_lines.append('            const landscapeLabel = envData.nature > 60 || envData.isBlue || envData.nearPark ? \'Qualité Supérieure\' : \'Standard\';\n')
            new_lines.append('\n')
            new_lines.append('            const pavPctRaw = (props.pav || 0) * 100;\n')
            new_lines.append('            const pavPct = pavPctRaw > 0 && pavPctRaw < 1 ? pavPctRaw.toFixed(1) : Math.round(pavPctRaw);\n')
            new_lines.append('            const aptPct = 100 - Math.round(pavPctRaw);\n')
            new_lines.append('            const gardenStatus = (props.gVol > 1 && props.pav > 0.05) ? \'✔️ Présents\' : (props.pav > 0.3 ? \'❓ Probables\' : \'❌ Rares\');\n')
            new_lines.append('\n')
            new_lines.append('            return `\n')
            new_lines.append('                <div class=\"px-4 pb-4 space-y-4\">\n')
            new_lines.append('                    <!-- Habitat Summary -->\n')
            new_lines.append('                    <div class=\"pt-2 border-t border-gray-100\">\n')
            new_lines.append('                        <div class=\"grid grid-cols-2 gap-2 mt-1\">\n')
            new_lines.append('                            <div class=\"bg-blue-50/50 p-2.5 rounded-xl border border-blue-100/30\">\n')
            new_lines.append('                                <div class=\"flex justify-between items-center mb-1\">\n')
            new_lines.append('                                    <span class=\"text-[8px] font-bold text-blue-500 uppercase\">Maisons</span>\n')
            new_lines.append('                                    <span class=\"text-[9px] font-black text-blue-700\">${pavPct}%</span>\n')
            new_lines.append('                                </div>\n')
            new_lines.append('                                <div class=\"w-full bg-blue-100 h-1.5 rounded-full overflow-hidden\">\n')
            new_lines.append('                                    <div class=\"bg-blue-500 h-full\" style=\"width: ${pavPctRaw}%\"></div>\n')
            new_lines.append('                                </div>\n')
            new_lines.append('                            </div>\n')
            new_lines.append('                            <div class=\"bg-indigo-50/50 p-2.5 rounded-xl border border-indigo-100/30\">\n')
            new_lines.append('                                <div class=\"flex justify-between items-center mb-1\">\n')
            new_lines.append('                                    <span class=\"text-[8px] font-bold text-indigo-500 uppercase\">Apparts.</span>\n')
            new_lines.append('                                    <span class=\"text-[9px] font-black text-indigo-700\">${aptPct}%</span>\n')
            new_lines.append('                                </div>\n')
            new_lines.append('                                <div class=\"w-full bg-indigo-100 h-1.5 rounded-full overflow-hidden\">\n')
            new_lines.append('                                    <div class=\"bg-indigo-500 h-full\" style=\"width: ${aptPct}%\"></div>\n')
            new_lines.append('                                </div>\n')
            new_lines.append('                            </div>\n')
            new_lines.append('                        </div>\n')
            new_lines.append('                        <div class=\"flex items-center justify-between px-2 py-1.5 bg-emerald-50/30 rounded-lg border border-emerald-100/20 mt-2\">\n')
            new_lines.append('                            <span class=\"text-[9px] text-emerald-700 uppercase font-bold flex items-center gap-1\">🌳 Jardins</span>\n')
            new_lines.append('                            <span class=\"text-[10px] font-black ${gardenStatus.includes(\'✔️\') ? \'text-emerald-600\' : \'text-gray-500\'}\">${gardenStatus}</span>\n')
            new_lines.append('                        </div>\n')
            new_lines.append('                    </div>\n')
            new_lines.append('\n')
            new_lines.append('                    <div class=\"pt-2 border-t border-gray-100\">\n')
            new_lines.append('                        <div class=\"flex justify-between text-[9px] mb-1.5\">\n')
            new_lines.append('                            <span class=\"text-gray-500 font-bold uppercase tracking-wider\">Qualité Paysagère</span>\n')
            new_lines.append('                            <span class=\"font-bold text-emerald-600\">${landscapeLabel}</span>\n')
            new_lines.append('                        </div>\n')
            new_lines.append('                        <div class=\"flex gap-1.5 flex-wrap\">\n')
            new_lines.append('                            <span class=\"text-[8px] px-1.5 py-0.5 rounded-full ${props.nature > 50 ? \'bg-green-100 text-green-700\' : \'bg-gray-100 text-gray-500\'} font-bold\">🌳 Végétalisation</span>\n')
            new_lines.append('                            ${envData.isBlue ? \'<span class=\"text-[8px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold\">💧 Bords de l\\\'eau</span>\' : \'\'}\n')
            new_lines.append('                            ${envData.nearPark ? `<span class=\"text-[8px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold\">🌲 Proximité ${envData.nearParkName || \'Parc\'}</span>` : \'\'}\n')
            new_lines.append('                        </div>\n')
            new_lines.append('                    </div>\n')
            new_lines.append('\n')
            new_lines.append('                    <div class=\"pt-1 border-t border-gray-100\">\n')
            new_lines.append('                        <div class=\"flex justify-between text-[9px] mb-1.5 pt-2\">\n')
            new_lines.append('                            <span class=\"text-gray-500 font-bold uppercase tracking-wider\">Calme Sonore</span>\n')
            new_lines.append('                            <span class=\"font-black text-blue-600\">${calmScore}%</span>\n')
            new_lines.append('                        </div>\n')
            new_lines.append('                        <div class=\"w-full bg-gray-100 h-1 rounded-full overflow-hidden\">\n')
            new_lines.append('                            <div class=\"bg-blue-500 h-full transition-all duration-700\" style=\"width: ${calmScore}%\"></div>\n')
            new_lines.append('                        </div>\n')
            new_lines.append('                    </div>\n')
            new_lines.append('                </div>\n')
            new_lines.append('            `;\n')
            new_lines.append('\n')
            
            # Skip the next few lines which were corrupted by the tool
            # (the messed up `;` and the missing `case social` which might have been deleted)
            inserted = True
            # We don't skip the next line because it might be the start of case social
            # Wait, let's see where the next case starts
            
with open(path, 'w') as f:
    f.writelines(new_lines)
