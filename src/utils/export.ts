import { ArchetypeCaps, StatName } from '../types';
import { CATEGORY_STATS, STAT_DISPLAY_NAMES } from '../constants';

const getCategoryForStat = (stat: StatName): string => {
    for (const [category, stats] of Object.entries(CATEGORY_STATS)) {
        if ((stats as StatName[]).includes(stat)) {
            return category;
        }
    }
    return 'unknown';
};

const STAT_ID_MAP: Partial<Record<StatName, string>> = {
    dribbleControl: 'dribbling',
    passAccuracy: 'passing',
    threePoint: 'three_points',
    midRange: 'mid_range',
    freeThrow: 'free_throw',
    steal: 'stealing',
    block: 'blocking',
    rebound: 'rebounding'
};

export const exportArchetypesToJson = (archetypeCaps: ArchetypeCaps) => {
    const archetypes = Object.keys(archetypeCaps) as Array<keyof ArchetypeCaps>;

    const data = archetypes.map(archetype => {
        const caps = archetypeCaps[archetype];
        const attributes = Object.entries(caps).map(([statRaw, maxVal]) => {
            const stat = statRaw as StatName;
            const id = STAT_ID_MAP[stat] || stat;
            const name = STAT_DISPLAY_NAMES[stat] || stat;
            const category = getCategoryForStat(stat);

            return {
                id,
                name,
                level_max: maxVal,
                category
            };
        });

        return {
            name: archetype,
            attributes
        };
    });

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'archetypes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};
