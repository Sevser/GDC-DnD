const spellsRaw = require('./spells_raw');

Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
  });

const transformData = (listResults) => 
    listResults.map((sp, index) => ({
        id: index + 1,
        title: sp.n,
        description: sp.c[11],
        HighterLevelDescription: sp.c[12], 
        Level: sp.s[0],
        Concentration: sp.c[7] === 'Yes',
        activeTime: sp.c[8],
        source: { source: 'SRD_5E' },
        SchoolOfMagic: { SchoolOfMagic: sp.c[1] },
        SpellComponent: sp.c[6].split(' ').map(c => { if(c === 'V') return 'Verbal'; if(c === 'S') return 'Somatic'; return 'Material Components'}).map(s => ({SpellComponent: s})),
        class: sp.f[3].split(' ').map(p => ({ class: p.capitalize().replaceAll(/\s/g, '').replaceAll(',','') })).filter(p => p.class.length > 0),
      }));

module.exports = transformData(spellsRaw)