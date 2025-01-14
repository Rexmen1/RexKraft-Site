// Comprehensive Quest Configuration

const QuestConfig = {
    categories: {
        mobs: {
            'kill-mob': {
                common: ['Sheep', 'Chicken', 'Pig', 'Rabbit', 'Cod', 'Salmon'],
                rare: ['Cow', 'Wolf', 'Cat', 'Fox', 'Dolphin', 'Turtle'],
                hard: ['Ender Dragon', 'Wither', 'Elder Guardian', 'Phantom', 'Ravager', 'Pillager']
            }
        },
        mineable: {
            'block-break': {
                common: ['Stone', 'Dirt', 'Gravel', 'Sand', 'Clay'],
                rare: ['Gold_Ore', 'Iron_Ore', 'Copper_Ore', 'Lapis_Ore', 'Redstone_Ore'],
                hard: ['Diamond_Ore', 'Emerald_Ore', 'Ancient_Debris', 'Netherite_Ore', 'End_Stone']
            }
        },
        buildingBlocks: {
            'block-place': {
                common: ['Oak_Planks', 'Cobblestone', 'Dirt', 'Gravel', 'Sand'],
                rare: ['Brick_Block', 'Sandstone', 'Quartz_Block', 'Terracotta', 'Wood_Logs'],
                hard: ['Netherite_Block', 'End_Stone', 'Obsidian', 'Beacon_Block', 'Crying_Obsidian']
            }
        },
        smeltable: {
            'smelt': {
                common: ['Raw_Iron', 'Raw_Copper', 'Clay_Ball', 'Sand', 'Kelp'],
                rare: ['Raw_Gold', 'Cactus', 'Potato', 'Chorus_Fruit', 'Sea_Pickle'],
                hard: ['Ancient_Debris', 'Quartz_Ore', 'Gold_Ore', 'Iron_Ore', 'Netherrack']
            }
        },
        food: {
            'consume': {
                common: ['Bread', 'Carrot', 'Apple', 'Mushroom_Stew', 'Cookie'],
                rare: ['Steak', 'Cooked_Chicken', 'Golden_Apple', 'Pumpkin_Pie', 'Salmon'],
                hard: ['Enchanted_Golden_Apple', 'Suspicious_Stew', 'Rabbit_Stew', 'Chorus_Fruit', 'Glow_Berries']
            }
        },
        tamable: {
            'tame': {
                common: ['Wolf', 'Cat', 'Parrot', 'Horse', 'Donkey'],
                rare: ['Llama', 'Fox', 'Axolotl', 'Goat', 'Mule'],
                hard: ['Trader_Llama', 'Polar_Bear', 'Ocelot', 'Cave_Spider', 'Panda']
            }
        },
        rideable: {
            'ride-mob': {
                common: ['Horse', 'Donkey', 'Mule', 'Boat', 'Minecart'],
                rare: ['Pig', 'Strider', 'Boat_with_Chest', 'Minecart_with_Chest', 'Llama'],
                hard: ['Ravager', 'Ender_Pearl', 'End_Crystal', 'Elytra', 'Trident']
            }
        }
    },
    
    progressRanges: {
        common: { min: 30, max: 60 },
        rare: { min: 15, max: 30 },
        hard: { min: 5, max: 15 }
    },

    materialMap: {
        'kill-mob': 'Stone_Sword',
        'block-break': 'Pickaxe',
        'block-place': 'Grass_Block',
        'smelt': 'Furnace',
        'consume': 'Bowl',
        'tame': 'Bone',
        'ride-mob': 'Saddle'
    },

    nameSuffixes: {
        'kill-mob': 'Hunter',
        'block-break': 'Miner',
        'block-place': 'Builder',
        'smelt': 'Smelter',
        'consume': 'Consumer',
        'tame': 'Tamer',
        'ride-mob': 'Rider'
    },

    descriptionTemplates: {
        'kill-mob': `kill &3%progress% %variable% mobs`,
        'block-break': `Mine &3%progress% %variable%_Ore blocks`,
        'block-place': `Place &3%progress% %variable% blocks`,
        'smelt': `Smelt &3%progress% %variable%`,
        'consume': `Eat &3%progress% %variable%`,
        'tame': `Tame &3%progress% %variable%`,
        'ride-mob': `Ride &3%progress% blocks on a %variable%`
    }
};

// Export for browser and Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuestConfig;
} else {
    window.QuestConfig = QuestConfig;
}
