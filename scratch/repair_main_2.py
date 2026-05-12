
import sys

path = '/Users/adrientordjeman/Documents/quartier_ideal/main.js'
with open(path, 'r') as f:
    content = f.read()

# Fix social case
content = content.replace('const d = matchData.categories?.social?.details || {};', 'case \'social\': {\n            const d = matchData.categories?.social?.details || {};')

# Correct env case
correct_env = """        case 'env':
            const envData = matchData.details?.env || {};
            const calmScore = Math.max(0, 100 - (props.noise || 0));
            const landscapeLabel = envData.nature > 60 || envData.isBlue || envData.nearPark ? 'Qualité Supérieure' : 'Standard';

            const pavPctRaw = (props.pav || 0) * 100;
            const pavPct = pavPctRaw > 0 && pavPctRaw < 1 ? pavPctRaw.toFixed(1) : Math.round(pavPctRaw);
            const aptPct = 100 - Math.round(pavPctRaw);
            const gardenStatus = (props.gVol > 1 && props.pav > 0.05) ? '✔️ Présents' : (props.pav > 0.3 ? '❓ Probables' : '❌ Rares');

            return `
                <div class="px-4 pb-4 space-y-4">
                    <!-- Habitat Summary -->
                    <div class="pt-2 border-t border-gray-100">
                        <div class="grid grid-cols-2 gap-2 mt-1">
                            <div class="bg-blue-50/50 p-2.5 rounded-xl border border-blue-100/30">
                                <div class="flex justify-between items-center mb-1">
                                    <span class="text-[8px] font-bold text-blue-500 uppercase">Maisons</span>
                                    <span class="text-[9px] font-black text-blue-700">${pavPct}%</span>
                                </div>
                                <div class="w-full bg-blue-100 h-1.5 rounded-full overflow-hidden">
                                    <div class="bg-blue-500 h-full" style="width: ${pavPctRaw}%"></div>
                                </div>
                            </div>
                            <div class="bg-indigo-50/50 p-2.5 rounded-xl border border-indigo-100/30">
                                <div class="flex justify-between items-center mb-1">
                                    <span class="text-[8px] font-bold text-indigo-500 uppercase">Apparts.</span>
                                    <span class="text-[9px] font-black text-indigo-700">${aptPct}%</span>
                                </div>
                                <div class="w-full bg-indigo-100 h-1.5 rounded-full overflow-hidden">
                                    <div class="bg-indigo-500 h-full" style="width: ${aptPct}%"></div>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center justify-between px-2 py-1.5 bg-emerald-50/30 rounded-lg border border-emerald-100/20 mt-2">
                            <span class="text-[9px] text-emerald-700 uppercase font-bold flex items-center gap-1">🌳 Jardins</span>
                            <span class="text-[10px] font-black ${gardenStatus.includes('✔️') ? 'text-emerald-600' : 'text-gray-500'}">${gardenStatus}</span>
                        </div>
                    </div>

                    <div class="pt-2 border-t border-gray-100">
                        <div class="flex justify-between text-[9px] mb-1.5">
                            <span class="text-gray-500 font-bold uppercase tracking-wider">Qualité Paysagère</span>
                            <span class="font-bold text-emerald-600">${landscapeLabel}</span>
                        </div>
                        <div class="flex gap-1.5 flex-wrap">
                            <span class="text-[8px] px-1.5 py-0.5 rounded-full ${props.nature > 50 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'} font-bold">🌳 Végétalisation</span>
                            ${envData.isBlue ? '<span class="text-[8px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">💧 Bords de l\'eau</span>' : ''}
                            ${envData.nearPark ? `<span class="text-[8px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">🌲 Proximité ${envData.nearParkName || 'Parc'}</span>` : ''}
                        </div>
                    </div>

                    <div class="pt-1 border-t border-gray-100">
                        <div class="flex justify-between text-[9px] mb-1.5 pt-2">
                            <span class="text-gray-500 font-bold uppercase tracking-wider">Calme Sonore</span>
                            <span class="font-black text-blue-600">${calmScore}%</span>
                        </div>
                        <div class="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                            <div class="bg-blue-500 h-full transition-all duration-700" style="width: ${calmScore}%"></div>
                        </div>
                    </div>
                </div>
            `;\n"""

content = content.replace('case \'social\': {', correct_env + '        case \'social\': {')

with open(path, 'w') as f:
    f.write(content)
