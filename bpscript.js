document.addEventListener('DOMContentLoaded', () => {
    const generator = new QuestGenerator();
    const generateButton = document.getElementById('generateQuests');
    const questCategorySelect = document.getElementById('questCategory');
    const questRaritySelect = document.getElementById('questRarity');
    const questCountInput = document.getElementById('questCount');
    const questJsonOutput = document.getElementById('questJson');
    const downloadButton = document.getElementById('downloadQuests');
    const customProgressButton = document.getElementById('customProgressButton');

    // Progress Ranges Modal Elements
    const progressRangesModal = document.getElementById('progressRangesModal');
    const saveProgressRangesButton = document.getElementById('saveProgressRanges');
    const resetProgressRangesButton = document.getElementById('resetProgressRanges');
    const closeModalSpan = progressRangesModal.querySelector('.close-button');

    // Default progress ranges
    const defaultProgressRanges = {
        common: { min: 30, max: 60 },
        rare: { min: 15, max: 30 },
        hard: { min: 5, max: 15 }
    };

    // Load or initialize progress ranges
    let progressRanges = JSON.parse(localStorage.getItem('progressRanges') || JSON.stringify(defaultProgressRanges));

    // Populate progress ranges on modal open
    function populateProgressRangesInputs() {
        const categories = Object.keys(QuestConfig.categories);
        const rarities = ['common', 'rare', 'hard'];

        categories.forEach(category => {
            rarities.forEach(rarity => {
                const input = document.querySelector(`input[name="${category}-${rarity}"]`);
                if (input) {
                    const savedRange = progressRanges[rarity];
                    input.value = `${savedRange?.min || defaultProgressRanges[rarity].min}-${savedRange?.max || defaultProgressRanges[rarity].max}`;
                }
            });
        });
    }

    // Open Progress Ranges Modal
    customProgressButton.addEventListener('click', () => {
        populateProgressRangesInputs();
        progressRangesModal.style.display = 'block';
    });

    // Close Modal
    closeModalSpan.onclick = () => {
        progressRangesModal.style.display = 'none';
    };

    // Save Progress Ranges
    saveProgressRangesButton.addEventListener('click', () => {
        const rangeInputs = progressRangesModal.querySelectorAll('input[name]');
        const newProgressRanges = {};

        rangeInputs.forEach(rangeInput => {
            const [category, rarity] = rangeInput.name.split('-');
            const range = rangeInput.value.split('-').map(val => parseInt(val.trim(), 10));
            
            // Validate input
            if (range.length !== 2 || isNaN(range[0]) || isNaN(range[1]) || range[0] >= range[1]) {
                alert(`Invalid range for ${category} (${rarity}). Use format like "5-10".`);
                return;
            }

            // Store rarity-level ranges
            if (!newProgressRanges[rarity]) {
                newProgressRanges[rarity] = { min: range[0], max: range[1] };
            }
        });

        // Update and save progress ranges
        progressRanges = newProgressRanges;
        localStorage.setItem('progressRanges', JSON.stringify(progressRanges));
        
        // Update QuestConfig
        QuestConfig.progressRanges = progressRanges;

        progressRangesModal.style.display = 'none';
        alert('Progress ranges updated successfully!');
    });

    // Reset to Defaults
    resetProgressRangesButton.addEventListener('click', () => {
        progressRanges = { ...defaultProgressRanges };
        localStorage.removeItem('progressRanges');
        QuestConfig.progressRanges = progressRanges;
        populateProgressRangesInputs();
        alert('Progress ranges reset to defaults.');
    });

    // New: Mob Management Elements
    const manageMobsButton = document.createElement('button');
    manageMobsButton.id = 'manageMobsButton';
    manageMobsButton.textContent = 'Manage Mobs';
    manageMobsButton.classList.add('custom-progress-actions');
    
    // Insert the button next to the custom progress button
    customProgressButton.parentNode.insertBefore(manageMobsButton, customProgressButton.nextSibling);

    // Create Mob Management Modal
    const mobManagementModal = document.createElement('div');
    mobManagementModal.id = 'mobManagementModal';
    mobManagementModal.classList.add('modal');
    
    // Dynamically generate modal content based on QuestConfig categories
    const generateMobManagementModalContent = () => {
        const categories = Object.keys(QuestConfig.categories);
        const rarities = ['common', 'rare', 'hard'];
        
        let modalContent = `
            <div class="modal-content compact-modal">
                <h2>Manage Mobs</h2>
                
                <div class="progress-ranges-grid">
                    <div class="progress-ranges-header">
                        <h3>Categories</h3>
                        <div class="rarity-headers">
                            <div class="rarity-label">Common</div>
                            <div class="rarity-label">Rare</div>
                            <div class="rarity-label">Hard</div>
                        </div>
                    </div>
                    <div class="category-ranges">
        `;
        
        // Create a row for each category
        categories.forEach(category => {
            const killMobCategory = QuestConfig.categories[category]['kill-mob'] || 
                                    QuestConfig.categories[category]['block-break'] || 
                                    QuestConfig.categories[category]['block-place'] || 
                                    QuestConfig.categories[category]['smelt'] || 
                                    QuestConfig.categories[category]['consume'] || 
                                    QuestConfig.categories[category]['tame'] || 
                                    QuestConfig.categories[category]['ride-mob'] || 
                                    {};
            
            modalContent += `
                <div class="category-row">
                    <div class="category-label">${category.charAt(0).toUpperCase() + category.slice(1)}</div>
                    <div class="rarity-inputs">
                        ${rarities.map(rarity => `
                            <textarea 
                                class="mob-input" 
                                data-category="${category}" 
                                data-rarity="${rarity}" 
                                placeholder="Enter mobs (one per line)" 
                            >${(killMobCategory[rarity] || []).join('\n')}</textarea>
                        `).join('')}
                    </div>
                </div>
            `;
        });
        
        modalContent += `
                    </div>
                </div>
                <div class="modal-actions modal-buttons">
                    <button id="saveMobsButton" class="modal-button save-button">Save</button>
                    <button id="resetMobsButton" class="modal-button reset-button">Reset</button>
                    <button class="modal-button close-button" id="closeMobsModal">
                        Close
                    </button>
                </div>
            </div>
        `;
        
        return modalContent;
    };

    // Set modal content
    mobManagementModal.innerHTML = generateMobManagementModalContent();
    document.body.appendChild(mobManagementModal);

    // Mob Management Modal Controls
    const saveMobsButton = document.getElementById('saveMobsButton');
    const resetMobsButton = document.getElementById('resetMobsButton');
    const closeMobsModal = document.getElementById('closeMobsModal');

    // Open Mob Management Modal
    manageMobsButton.addEventListener('click', () => {
        // Regenerate content to ensure latest data
        mobManagementModal.innerHTML = generateMobManagementModalContent();
        
        // Re-attach event listeners after regenerating content
        document.getElementById('saveMobsButton').addEventListener('click', saveMobsHandler);
        document.getElementById('resetMobsButton').addEventListener('click', resetMobsHandler);
        document.getElementById('closeMobsModal').addEventListener('click', closeMobsHandler);
        
        mobManagementModal.style.display = 'block';
    });

    // Save Mobs Handler
    function saveMobsHandler() {
        const mobInputs = mobManagementModal.querySelectorAll('.mob-input');
        const updatedCategories = {};

        // Collect and validate mob lists
        mobInputs.forEach(input => {
            const category = input.dataset.category;
            const rarity = input.dataset.rarity;
            
            // Parse input, trim and remove empty entries
            const mobList = input.value
                .split('\n')
                .map(mob => mob.trim())
                .filter(mob => mob !== '');
            
            // Initialize category if not exists
            if (!updatedCategories[category]) {
                updatedCategories[category] = { 'kill-mob': {} };
            }
            
            // Update mob list for specific rarity
            updatedCategories[category]['kill-mob'][rarity] = mobList;
        });

        // Merge with existing QuestConfig
        Object.keys(updatedCategories).forEach(category => {
            if (!QuestConfig.categories[category]) {
                QuestConfig.categories[category] = {};
            }
            QuestConfig.categories[category]['kill-mob'] = updatedCategories[category]['kill-mob'];
        });
        
        // Save to localStorage
        localStorage.setItem('questCategories', JSON.stringify(QuestConfig.categories));
        
        // Close the modal
        mobManagementModal.style.display = 'none';
        
        alert('Mob lists updated successfully!');
    }

    // Reset Mobs Handler
    function resetMobsHandler() {
        // Confirm reset
        if (!confirm('Are you sure you want to reset ALL mob lists to defaults?')) {
            return;
        }

        // Reset to default values from QuestConfig
        const defaultCategories = {
            mobs: {
                'kill-mob': {
                    common: ['Sheep', 'Chicken', 'Pig', 'Cow', 'Rabbit', 'Cod', 'Salmon', 'Bat', 'Squid', 'Turtle'],
                    rare: ['Wolf', 'Cat', 'Fox', 'Dolphin', 'Llama', 'Goat', 'Panda', 'Mooshroom', 'Axolotl', 'Parrot'],
                    hard: ['Ender Dragon', 'Wither', 'Elder Guardian', 'Phantom', 'Ravager', 'Pillager', 'Shulker', 'Warden', 'Ghast', 'Enderman']
                }
            },
            mineable: {
                'block-break': {
                    common: ['Stone', 'Dirt', 'Gravel', 'Sand', 'Clay', 'Sandstone', 'Cobblestone', 'Granite', 'Andesite', 'Diorite'],
                    rare: ['Gold_Ore', 'Iron_Ore', 'Copper_Ore', 'Lapis_Ore', 'Redstone_Ore', 'Coal_Ore', 'Emerald_Ore', 'Quartz_Ore', 'Deepslate_Ore', 'Netherrack'],
                    hard: ['Diamond_Ore', 'Ancient_Debris', 'Obsidian', 'End_Stone', 'Bedrock', 'Crying_Obsidian', 'Respawn_Anchor', 'Beacon_Block', 'Command_Block', 'Structure_Block']
                }
            },
            buildingBlocks: {
                'block-place': {
                    common: ['Oak_Planks', 'Cobblestone', 'Dirt', 'Gravel', 'Sand', 'Bricks', 'Stone_Bricks', 'Terracotta', 'Glass', 'Concrete'],
                    rare: ['Quartz_Block', 'Sandstone', 'Prismarine', 'Nether_Bricks', 'End_Stone_Bricks', 'Purpur_Block', 'Sea_Lantern', 'Hay_Block', 'Melon', 'Pumpkin'],
                    hard: ['Netherite_Block', 'Beacon', 'Emerald_Block', 'Diamond_Block', 'Gold_Block', 'Iron_Block', 'Obsidian', 'End_Portal_Frame', 'Conduit', 'Shulker_Box']
                }
            },
            smeltable: {
                'smelt': {
                    common: ['Raw_Iron', 'Raw_Copper', 'Clay_Ball', 'Sand', 'Kelp', 'Potato', 'Beef', 'Chicken', 'Porkchop', 'Salmon'],
                    rare: ['Raw_Gold', 'Cactus', 'Chorus_Fruit', 'Sea_Pickle', 'Netherrack', 'Quartz_Ore', 'Gold_Ore', 'Iron_Ore', 'Cobblestone', 'Stone'],
                    hard: ['Ancient_Debris', 'Nether_Quartz', 'Nether_Gold_Ore', 'Smooth_Stone', 'Charcoal', 'Baked_Potato', 'Cooked_Mutton', 'Cooked_Salmon', 'Cooked_Rabbit', 'Dried_Kelp']
                }
            },
            food: {
                'consume': {
                    common: ['Bread', 'Carrot', 'Apple', 'Mushroom_Stew', 'Cookie', 'Melon_Slice', 'Beetroot', 'Pumpkin_Pie', 'Cooked_Chicken', 'Raw_Potato'],
                    rare: ['Steak', 'Golden_Apple', 'Cooked_Mutton', 'Rabbit_Stew', 'Salmon', 'Cooked_Fish', 'Cake', 'Honey_Bottle', 'Suspicious_Stew', 'Cooked_Porkchop'],
                    hard: ['Enchanted_Golden_Apple', 'Chorus_Fruit', 'Glow_Berries', 'Sweet_Berries', 'Golden_Carrot', 'Cooked_Rabbit', 'Spider_Eye', 'Rotten_Flesh', 'Fermented_Spider_Eye', 'Pufferfish']
                }
            },
            tamable: {
                'tame': {
                    common: ['Wolf', 'Cat', 'Parrot', 'Horse', 'Donkey', 'Mule', 'Llama', 'Fox', 'Rabbit', 'Turtle'],
                    rare: ['Axolotl', 'Goat', 'Panda', 'Ocelot', 'Trader_Llama', 'Bee', 'Dolphin', 'Cave_Spider', 'Polar_Bear', 'Snow_Golem'],
                    hard: ['Warden', 'Iron_Golem', 'Elder_Guardian', 'Phantom', 'Ender_Dragon', 'Wither', 'Pillager', 'Ravager', 'Ghast', 'Shulker']
                }
            },
            rideable: {
                'ride-mob': {
                    common: ['Horse', 'Donkey', 'Mule', 'Boat', 'Minecart', 'Pig', 'Strider', 'Llama', 'Camel', 'Raft'],
                    rare: ['Boat_with_Chest', 'Minecart_with_Chest', 'Pig_with_Saddle', 'Boat_with_Furnace', 'Minecart_with_Hopper', 'Minecart_with_TNT', 'Minecart_with_Spawner', 'Chest_Boat', 'Trader_Llama', 'Elytra'],
                    hard: ['Ender_Pearl', 'End_Crystal', 'Trident', 'Ravager', 'Wither', 'Ender_Dragon', 'Phantom', 'Warden', 'Ghast', 'Shulker']
                }
            }
        };

        // Update QuestConfig
        QuestConfig.categories = defaultCategories;
        
        // Remove from localStorage
        localStorage.removeItem('questCategories');
        
        // Regenerate modal with default values
        mobManagementModal.innerHTML = generateMobManagementModalContent();
        
        alert('All mob lists reset to defaults!');
    }

    // Close Mobs Modal Handler
    function closeMobsHandler() {
        mobManagementModal.style.display = 'none';
    }

    // Initial event listener attachments
    document.addEventListener('DOMContentLoaded', () => {
        // Attach event listeners to initially created buttons
        const saveMobsButton = document.getElementById('saveMobsButton');
        const resetMobsButton = document.getElementById('resetMobsButton');
        const closeMobsModal = document.getElementById('closeMobsModal');

        if (saveMobsButton) saveMobsButton.addEventListener('click', saveMobsHandler);
        if (resetMobsButton) resetMobsButton.addEventListener('click', resetMobsHandler);
        if (closeMobsModal) closeMobsModal.addEventListener('click', closeMobsHandler);
    });

    generateButton.addEventListener('click', () => {
        try {
            const category = questCategorySelect.value === 'all' ? null : questCategorySelect.value;
            const rarity = questRaritySelect.value;
            const questCount = parseInt(questCountInput.value, 10);
            
            // Use custom progress ranges if available
            let customProgress = null;
            if (category && rarity && progressRanges[rarity]) {
                const range = progressRanges[rarity];
                customProgress = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
            }

            const quests = generator.generateQuestSet(questCount, {
                category,
                rarity,
                customProgress
            });

            // Convert to YAML
            const yamlOutput = convertToYAML(quests);
            questJsonOutput.textContent = yamlOutput;

            // Enable download button
            downloadButton.disabled = false;
            downloadButton.onclick = () => {
                const blob = new Blob([yamlOutput], { type: 'text/yaml' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'quests.yml';
                link.click();
            };
        } catch (error) {
            questJsonOutput.textContent = `Error: ${error.message}`;
            downloadButton.disabled = true;
        }
    });

    // Utility function for YAML conversion
    function convertToYAML(jsonObj) {
        const convertValue = (value) => {
            if (typeof value === 'object' && value !== null) {
                if (Array.isArray(value)) {
                    return value.map(convertValue);
                }
                const yamlObj = {};
                for (const [k, v] of Object.entries(value)) {
                    yamlObj[k] = convertValue(v);
                }
                return yamlObj;
            }
            return value;
        };

        const yamlObj = {
            quests: convertValue(jsonObj)
        };

        return jsyaml.dump(yamlObj);
    }
});
