// Battlepass Quest Generator

class QuestGenerator {
    constructor(config) {
        this.config = config || QuestConfig;
    }

    generateQuest(category, questType, rarity = 'common', customProgress = null) {
        // Validate inputs
        if (!this.config.categories[category]) {
            throw new Error(`Invalid category: ${category}`);
        }
        
        if (!this.config.categories[category][questType]) {
            throw new Error(`Invalid quest type for category: ${questType}`);
        }
        
        // Handle 'all' rarity option
        if (rarity === 'all') {
            const rarities = Object.keys(this.config.progressRanges);
            rarity = rarities[Math.floor(Math.random() * rarities.length)];
        } else if (!this.config.progressRanges[rarity]) {
            throw new Error(`Invalid rarity: ${rarity}`);
        }

        // Get configuration
        const categoryConfig = this.config.categories[category][questType];
        const progressConfig = this.config.progressRanges[rarity];

        // Select variable
        const variable = categoryConfig[rarity][Math.floor(Math.random() * categoryConfig[rarity].length)];

        // Determine progress
        const requiredProgress = customProgress || this.generateProgress(progressConfig);
        
        // Calculate points
        const points = this.calculatePoints(rarity, requiredProgress);

        return {
            type: questType,
            variable: variable,
            name: `${variable} ${this.config.nameSuffixes[questType]}`,
            points: points,
            'required-progress': requiredProgress,
            item: this.generateItemDisplay(category, questType, variable, rarity, requiredProgress, points)
        };
    }

    generateProgress(progressConfig) {
        const { min, max } = progressConfig;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    calculatePoints(rarity, requiredProgress) {
        const rarityMultipliers = {
            'common': 1,
            'rare': 2,
            'hard': 3
        };
        return Math.max(1, Math.round(requiredProgress / 10 * rarityMultipliers[rarity]));
    }

    generateItemDisplay(category, questType, variable, rarity, requiredProgress, points) {
        return {
            material: this.config.materialMap[questType] || 'STONE',
            name: `&e&lQUEST:&f ${variable} ${this.config.nameSuffixes[questType]}`,
            lore: [
                '&8 » &7To complete this quest, you must',
                `&8 » &7${this.config.descriptionTemplates[questType]
                    .replace('%progress%', requiredProgress)
                    .replace('%variable%', variable)}.`,
                '',
                '&e&lINFORMATION',
                `&8 » &7Rarity: &f${this.capitalizeFirstLetter(rarity)}`,
                `&8 » &7EXP: &f${points}x`,
                '&8 » &7%total_progress%&7/&e%required_progress%',
                '',
                '%progress_bar% &7(&a%percentage_progress%&7)'
            ]
        };
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    generateQuestSet(count = 10, options = {}) {
        const questSet = {};
        const categories = Object.keys(this.config.categories);
        const rarities = Object.keys(this.config.progressRanges);

        for (let i = 0; i < count; i++) {
            const category = options.category || categories[Math.floor(Math.random() * categories.length)];
            const questTypes = Object.keys(this.config.categories[category]);
            const questType = questTypes[Math.floor(Math.random() * questTypes.length)];
            const rarity = options.rarity || rarities[Math.floor(Math.random() * rarities.length)];
            
            questSet[i] = this.generateQuest(category, questType, rarity, options.customProgress);
        }

        return questSet;
    }
}

// Export for browser and Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuestGenerator;
} else {
    window.QuestGenerator = QuestGenerator;
}
