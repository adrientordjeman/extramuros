import os

path = "/Users/adrientordjeman/Documents/quartier_ideal/main.js"
with open(path, "r") as f:
    content = f.read()

start_marker = 'case \'vibe\': {'
end_marker = 'case \'env\': {'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker, start_idx)

if start_idx != -1 and end_idx != -1:
    new_vibe_case = """case 'vibe': {
            const node = window.pointsByInsee?.[props.code] || {};
            const commerces = node.commerces || [];
            const amenities = node.amenities || [];
            
            const counts = {
                bakery: commerces.filter(c => c.properties.category === 'boulangerie').length,
                pharmacy: commerces.filter(c => c.properties.category === 'pharmacie').length,
                supermarket: commerces.filter(c => c.properties.category === 'supermarché' || c.properties.category === 'bio').length,
                restaurant: commerces.filter(c => c.properties.category === 'restaurant').length,
                bar: commerces.filter(c => c.properties.category === 'bar' || c.properties.category === 'pub').length,
                gym: amenities.filter(a => a.properties.category === 'gym').length,
                culture: amenities.filter(a => ['cinema', 'theatre', 'library', 'culture'].includes(a.properties.category)).length
            };

            return `
                <div class="space-y-3 mt-2 pt-2 border-t border-gray-100">
                    <div class="bg-indigo-50/50 p-2.5 rounded-xl border border-indigo-100/50">
                        <div class="text-[8px] font-black text-indigo-400 uppercase tracking-widest mb-2">Offre Commerciale</div>
                        <div class="grid grid-cols-2 gap-y-2 gap-x-4">
                            <div class="flex justify-between items-center">
                                <span class="text-[9px] text-gray-500 font-bold">🥖 Boulangeries</span>
                                <span class="text-[10px] font-black text-gray-800">${counts.bakery}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-[9px] text-gray-500 font-bold">🍴 Restaurants</span>
                                <span class="text-[10px] font-black text-gray-800">${counts.restaurant}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-[9px] text-gray-500 font-bold">🛒 Supermarchés</span>
                                <span class="text-[10px] font-black text-gray-800">${counts.supermarket}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-[9px] text-gray-500 font-bold">💊 Pharmacies</span>
                                <span class="text-[10px] font-black text-gray-800">${counts.pharmacy}</span>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-2">
                        <div class="bg-gray-50 p-2 rounded-lg border border-gray-100">
                            <span class="text-[8px] text-gray-400 uppercase font-black block mb-1">Culture & Loisirs</span>
                            <span class="text-[10px] font-bold text-gray-700">🎭 ${counts.culture} lieux</span>
                        </div>
                        <div class="bg-gray-50 p-2 rounded-lg border border-gray-100">
                            <span class="text-[8px] text-gray-400 uppercase font-black block mb-1">Sport & Bien-être</span>
                            <span class="text-[10px] font-bold text-gray-700">💪 ${counts.gym} centres</span>
                        </div>
                    </div>
                </div>
            `;
        }
        """
    new_content = content[:start_idx] + new_vibe_case + content[end_idx:]
    with open(path, "w") as f:
        f.write(new_content)
    print("Successfully rewritten vibe case.")
else:
    print(f"Could not find markers: start={start_idx}, end={end_idx}")
    # Try alternate markers if first attempt failed
    print("Trying alternate markers...")
    start_marker = "case 'vibe': {"
    start_idx = content.find(start_marker)
    if start_idx != -1:
         print(f"Found with single quotes at {start_idx}")
