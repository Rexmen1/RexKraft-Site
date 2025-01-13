document.addEventListener('DOMContentLoaded', () => {
    // Toggle all checkboxes
    document.getElementById('toggleAll').addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('.quest-type-item input[type="checkbox"]');
        const anyUnchecked = Array.from(checkboxes).some(cb => !cb.checked);
        checkboxes.forEach(cb => cb.checked = anyUnchecked);
    });

    // Rarity type tabs functionality
    const rarityTypeTabs = document.querySelectorAll('.rarity-type-tab');
    rarityTypeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.rarity-type-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.rarity-type-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`${tab.dataset.type}-rarity`).classList.add('active');
        });
    });

    // Items rarity tabs functionality
    const rarityTabs = document.querySelectorAll('.rarity-tab');
    rarityTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.rarity-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.rarity-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`${tab.dataset.rarity}-content`).classList.add('active');
        });
    });

    // Generate quests
    document.getElementById('generateQuests').addEventListener('click', generateQuests);
    document.getElementById('copyOutput').addEventListener('click', copyOutput);
    document.getElementById('downloadYaml').addEventListener('click', downloadYaml);

    const questTypes = `
        <div class="quest-type-item">
            <input type="checkbox" id="kill-mob" checked>
            <label for="kill-mob">Kill Mob</label>
        </div>
        <div class="quest-type-item">
            <input type="checkbox" id="block-break" checked>
            <label for="block-break">Break Block</label>
        </div>
        <div class="quest-type-item">
            <input type="checkbox" id="block-place" checked>
            <label for="block-place">Place Block</label>
        </div>
        <div class="quest-type-item">
            <input type="checkbox" id="craft" checked>
            <label for="craft">Craft Item</label>
        </div>
        <div class="quest-type-item">
            <input type="checkbox" id="smelt" checked>
            <label for="smelt">Smelt Item</label>
        </div>
        <div class="quest-type-item">
            <input type="checkbox" id="consume" checked>
            <label for="consume">Consume Food</label>
        </div>
    `;
    document.querySelector('.quest-type-grid').innerHTML = questTypes;
});

function getRandomFromList(rarity, type) {
    const lists = {
        mobs: {
            common: document.getElementById('commonMobsList').value.trim().split('\n'),
            rare: document.getElementById('rareMobsList').value.trim().split('\n'),
            epic: document.getElementById('epicMobsList').value.trim().split('\n')
        },
        mining: {
            common: document.getElementById('commonMiningList').value.trim().split('\n'),
            rare: document.getElementById('rareMiningList').value.trim().split('\n'),
            epic: document.getElementById('epicMiningList').value.trim().split('\n')
        },
        building: {
            common: document.getElementById('commonBuildingList').value.trim().split('\n'),
            rare: document.getElementById('rareBuildingList').value.trim().split('\n'),
            epic: document.getElementById('epicBuildingList').value.trim().split('\n')
        },
        items: {
            common: document.getElementById('commonItemsList').value.trim().split('\n'),
            rare: document.getElementById('rareItemsList').value.trim().split('\n'),
            epic: document.getElementById('epicItemsList').value.trim().split('\n')
        },
        food: {
            common: document.getElementById('commonFoodList').value.trim().split('\n'),
            rare: document.getElementById('rareFoodList').value.trim().split('\n'),
            epic: document.getElementById('epicFoodList').value.trim().split('\n')
        },
        craftable: {
            common: document.getElementById('commonCraftableList').value.trim().split('\n'),
            rare: document.getElementById('rareCraftableList').value.trim().split('\n'),
            epic: document.getElementById('epicCraftableList').value.trim().split('\n')
        },
        smeltable: {
            common: document.getElementById('commonSmeltableList').value.trim().split('\n'),
            rare: document.getElementById('rareSmeltableList').value.trim().split('\n'),
            epic: document.getElementById('epicSmeltableList').value.trim().split('\n')
        }
    };

    const list = lists[type]?.[rarity] || [];
    if (list.length === 0) return '';
    return list[Math.floor(Math.random() * list.length)];
}

function getRarityConfig(questType) {
    const typeConfigs = {
        'kill-mob': {
            common: {
                min: parseInt(document.getElementById('mobsCommonMin').value),
                max: parseInt(document.getElementById('mobsCommonMax').value),
                points: parseInt(document.getElementById('mobsCommonPoints').value)
            },
            rare: {
                min: parseInt(document.getElementById('mobsRareMin').value),
                max: parseInt(document.getElementById('mobsRareMax').value),
                points: parseInt(document.getElementById('mobsRarePoints').value)
            },
            epic: {
                min: parseInt(document.getElementById('mobsEpicMin').value),
                max: parseInt(document.getElementById('mobsEpicMax').value),
                points: parseInt(document.getElementById('mobsEpicPoints').value)
            }
        },
        'block-break': {
            common: {
                min: parseInt(document.getElementById('miningCommonMin').value),
                max: parseInt(document.getElementById('miningCommonMax').value),
                points: parseInt(document.getElementById('miningCommonPoints').value)
            },
            rare: {
                min: parseInt(document.getElementById('miningRareMin').value),
                max: parseInt(document.getElementById('miningRareMax').value),
                points: parseInt(document.getElementById('miningRarePoints').value)
            },
            epic: {
                min: parseInt(document.getElementById('miningEpicMin').value),
                max: parseInt(document.getElementById('miningEpicMax').value),
                points: parseInt(document.getElementById('miningEpicPoints').value)
            }
        },
        'block-place': {
            common: {
                min: parseInt(document.getElementById('buildingCommonMin').value),
                max: parseInt(document.getElementById('buildingCommonMax').value),
                points: parseInt(document.getElementById('buildingCommonPoints').value)
            },
            rare: {
                min: parseInt(document.getElementById('buildingRareMin').value),
                max: parseInt(document.getElementById('buildingRareMax').value),
                points: parseInt(document.getElementById('buildingRarePoints').value)
            },
            epic: {
                min: parseInt(document.getElementById('buildingEpicMin').value),
                max: parseInt(document.getElementById('buildingEpicMax').value),
                points: parseInt(document.getElementById('buildingEpicPoints').value)
            }
        },
        'craft': {
            common: {
                min: parseInt(document.getElementById('craftingCommonMin').value),
                max: parseInt(document.getElementById('craftingCommonMax').value),
                points: parseInt(document.getElementById('craftingCommonPoints').value)
            },
            rare: {
                min: parseInt(document.getElementById('craftingRareMin').value),
                max: parseInt(document.getElementById('craftingRareMax').value),
                points: parseInt(document.getElementById('craftingRarePoints').value)
            },
            epic: {
                min: parseInt(document.getElementById('craftingEpicMin').value),
                max: parseInt(document.getElementById('craftingEpicMax').value),
                points: parseInt(document.getElementById('craftingEpicPoints').value)
            }
        },
        'smelt': {
            common: {
                min: parseInt(document.getElementById('smeltingCommonMin').value),
                max: parseInt(document.getElementById('smeltingCommonMax').value),
                points: parseInt(document.getElementById('smeltingCommonPoints').value)
            },
            rare: {
                min: parseInt(document.getElementById('smeltingRareMin').value),
                max: parseInt(document.getElementById('smeltingRareMax').value),
                points: parseInt(document.getElementById('smeltingRarePoints').value)
            },
            epic: {
                min: parseInt(document.getElementById('smeltingEpicMin').value),
                max: parseInt(document.getElementById('smeltingEpicMax').value),
                points: parseInt(document.getElementById('smeltingEpicPoints').value)
            }
        },
        'consume': {
            common: {
                min: parseInt(document.getElementById('foodCommonMin').value),
                max: parseInt(document.getElementById('foodCommonMax').value),
                points: parseInt(document.getElementById('foodCommonPoints').value)
            },
            rare: {
                min: parseInt(document.getElementById('foodRareMin').value),
                max: parseInt(document.getElementById('foodRareMax').value),
                points: parseInt(document.getElementById('foodRarePoints').value)
            },
            epic: {
                min: parseInt(document.getElementById('foodEpicMin').value),
                max: parseInt(document.getElementById('foodEpicMax').value),
                points: parseInt(document.getElementById('foodEpicPoints').value)
            }
        }
    };

    // Default to 'other' config for any quest type not specifically configured
    const defaultConfig = {
        common: {
            min: parseInt(document.getElementById('otherCommonMin').value),
            max: parseInt(document.getElementById('otherCommonMax').value),
            points: parseInt(document.getElementById('otherCommonPoints').value)
        },
        rare: {
            min: parseInt(document.getElementById('otherRareMin').value),
            max: parseInt(document.getElementById('otherRareMax').value),
            points: parseInt(document.getElementById('otherRarePoints').value)
        },
        epic: {
            min: parseInt(document.getElementById('otherEpicMin').value),
            max: parseInt(document.getElementById('otherEpicMax').value),
            points: parseInt(document.getElementById('otherEpicPoints').value)
        }
    };

    return typeConfigs[questType] || defaultConfig;
}

function generateQuestData(type, rarity, progress, points) {
    let variable;
    let material;

    switch (type) {
        case 'kill-mob':
            variable = 'entity';
            material = getRandomFromList(rarity, 'mobs');
            break;
        case 'block-break':
            variable = 'block';
            material = getRandomFromList(rarity, 'mining');
            break;
        case 'block-place':
            variable = 'block';
            material = getRandomFromList(rarity, 'building');
            break;
        case 'craft':
            variable = 'item';
            material = getRandomFromList(rarity, 'craftable');
            break;
        case 'smelt':
            variable = 'item';
            material = getRandomFromList(rarity, 'smeltable');
            break;
        case 'consume':
            variable = 'item';
            material = getRandomFromList(rarity, 'food');
            break;
        default:
            variable = 'progress';
            material = '';
    }

    const questData = {
        type,
        rarity,
        points,
        progress: {
            required: progress,
            current: 0
        }
    };

    if (material) {
        questData[variable] = material;
    }

    return questData;
}

function generateQuests() {
    const fileName = document.getElementById('fileName').value.trim();
    if (!fileName) {
        alert('Please enter a file name!');
        return;
    }
    if (!fileName.endsWith('.yml') && !fileName.endsWith('.yaml')) {
        alert('File name must end with .yml or .yaml!');
        return;
    }

    const startingId = parseInt(document.getElementById('startingId').value);
    const questCount = parseInt(document.getElementById('questCount').value);
    const selectedTypes = getSelectedQuestTypes();
    
    if (selectedTypes.length === 0) {
        alert('Please select at least one quest type!');
        return;
    }

    let output = '';

    for (let i = 0; i < questCount; i++) {
        const currentId = startingId + i;
        const questType = selectedTypes[Math.floor(Math.random() * selectedTypes.length)];
        const rarity = Math.random() < 0.6 ? 'common' : Math.random() < 0.8 ? 'rare' : 'epic';
        
        // Get type-specific rarity configuration
        const config = getRarityConfig(questType)[rarity];
        const requiredProgress = getRandomInt(config.min, config.max);
        const questData = generateQuestData(questType, rarity, requiredProgress, config.points);

        output += `  '${currentId}':\n`;
        output += Object.entries(questData)
            .map(([key, value]) => {
                if (typeof value === 'object') {
                    return `    ${key}:\n      ${Object.entries(value)
                        .map(([k, v]) => `${k}: ${Array.isArray(v) ? `\n      - '${v.join("'\n      - '")}'` : `'${v}'`}`)
                        .join('\n      ')}`;
                }
                return `    ${key}: ${value}`;
            })
            .join('\n');
        output += '\n\n';
    }

    document.getElementById('outputArea').textContent = output;
}

function getSelectedQuestTypes() {
    const checkboxes = document.querySelectorAll('.quest-type-item input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.id);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function copyOutput() {
    const outputArea = document.getElementById('outputArea');
    navigator.clipboard.writeText(outputArea.textContent)
        .then(() => alert('Output copied to clipboard!'))
        .catch(err => console.error('Failed to copy: ', err));
}

function downloadYaml() {
    const fileName = document.getElementById('fileName').value || 'quests.yml';
    const content = document.getElementById('outputArea').textContent;
    
    if (!content) {
        alert('Please generate quests first!');
        return;
    }

    // Create blob and download
    const blob = new Blob([content], { type: 'text/yaml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = fileName;

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}
