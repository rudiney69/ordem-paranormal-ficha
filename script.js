// ═══════════════════════════════════════════════════════════════
// CONFIGURAÇÃO DOS ELEMENTOS
// ═══════════════════════════════════════════════════════════════
const ELEMENTS = {
    sangue: { 
        symbol: '🩸', 
        color: '#ff1a1a', 
        bg: 'bg-sangue',
        avatar: '🩸',
        glow: 'rgba(139,0,0,0.6)'
    },
    morte: { 
        symbol: '☠️', 
        color: '#888', 
        bg: 'bg-morte',
        avatar: '☠️',
        glow: 'rgba(40,40,40,0.8)'
    },
    conhecimento: { 
        symbol: '📚', 
        color: '#FFD700', 
        bg: 'bg-conhecimento',
        avatar: '📚',
        glow: 'rgba(218,165,32,0.5)'
    },
    energia: { 
        symbol: '⚡', 
        color: '#da70d6', 
        bg: 'bg-energia',
        avatar: '⚡',
        glow: 'rgba(148,0,211,0.6)'
    },
    medo: { 
        symbol: '👁️', 
        color: '#fff', 
        bg: 'bg-medo',
        avatar: '👁️',
        glow: 'rgba(255,255,255,0.4)'
    }
};

// ═══════════════════════════════════════════════════════════════
// ESTADO DA APLICAÇÃO
// ═══════════════════════════════════════════════════════════════
let characters = [];
let currentId = null;
let rollHistory = [];
let currentInvTab = 'weapons';
let ritualFilter = 'all';
let ritualSearch = '';

// ═══════════════════════════════════════════════════════════════
// INICIALIZAÇÃO
// ═══════════════════════════════════════════════════════════════
function init() {
    loadData();
    if (characters.length === 0) {
        createDefaultChar();
    }
    renderAll();
}

function createDefaultChar() {
    const char = {
        id: Date.now(),
        name: 'César Oliveira',
        class: 'Ocultista',
        origin: 'Acadêmico',
        element: 'conhecimento',
        patent: 'Agente',
        nex: '15%',
        age: '28',
        height: '1,75m',
        weight: '70kg',
        photo: null,
        stats: {
            pv: { current: 28, max: 35 },
            pe: { current: 12, max: 12 },
            san: { current: 40, max: 40 },
            def: 12,
            mov: '9m'
        },
        attributes: { for: 1, agi: 2, int: 3, pre: 2, vig: 2 },
        skills: [
            { name: 'Ocultismo', attr: 'int', mod: 5 },
            { name: 'Medicina', attr: 'int', mod: 4 },
            { name: 'Intuição', attr: 'pre', mod: 3 },
            { name: 'Vontade', attr: 'pre', mod: 3 },
            { name: 'Investigação', attr: 'int', mod: 2 }
        ],
        rituals: [
            { name: 'Cicatrização Paranormal', element: 'conhecimento', cost: '2 PE', exec: 'Padrão', range: 'Toque', desc: 'Você cura 2d8+5 pontos de vida de um alvo tocado.' }
        ],
        inventory: {
            weapons: [{ name: 'Pistola 9mm', slot: 'arma', desc: 'Dano: 1d6, Munição: 15' }],
            equipment: [{ name: 'Colete Balístico', slot: 'vestimenta', desc: '+1 Defesa' }],
            occult: [{ name: 'Cristal Ritualístico', slot: 'artefato', desc: 'Foco para rituais' }],
            consumables: [{ name: 'Bandagem', slot: 'item', desc: 'Cura 1d6 PV', qty: 3 }]
        }
    };
    characters.push(char);
    currentId = char.id;
    saveData();
}

// ═══════════════════════════════════════════════════════════════
// RENDERIZAÇÃO
// ═══════════════════════════════════════════════════════════════
function renderAll() {
    renderSelector();
    renderSheet();
    updateTheme();
    updateActionButtons();
}

function renderSelector() {
    const container = document.getElementById('charSelector');
    container.innerHTML = characters.map(c => {
        const elem = ELEMENTS[c.element];
        const hasPhoto = c.photo !== null;
        return `
            <div class="char-tab ${c.id === currentId ? 'active' : ''}" 
                 onclick="switchChar(${c.id})"
                 style="color: ${elem.color}; border-color: ${c.id === currentId ? elem.color : ''}">
                ${hasPhoto 
                    ? `<img src="${c.photo}" alt="">` 
                    : `<div class="char-avatar">${elem.avatar}</div>`
                }
            </div>
        `;
    }).join('') + '<div class="char-tab char-add" onclick="openNewChar()">+</div>';
}

function renderSheet() {
    const c = characters.find(x => x.id === currentId);
    if (!c) return;
    
    const elem = ELEMENTS[c.element];
    const hasPhoto = c.photo !== null;
    
    const container = document.getElementById('sheetContainer');
    container.innerHTML = `
        <div class="sheet active">
            <div class="identity-card">
                <div class="photo-upload" style="color: ${elem.color}" onclick="document.getElementById('photoInput').click()">
                    ${hasPhoto 
                        ? `<img src="${c.photo}" alt="">` 
                        : `<div class="photo-placeholder">
                             <span style="font-size: 3rem;">${elem.avatar}</span>
                             <span class="photo-hint">Toque para foto</span>
                           </div>`
                    }
                    <input type="file" id="photoInput" accept="image/*" style="display:none" onchange="uploadPhoto(this)">
                </div>
                
                <input type="text" class="char-name" value="${c.name}" 
                       onchange="updateChar('name', this.value)"
                       style="border-color: ${elem.color}">
                
                <div class="char-meta">
                    <div class="meta-field">
                        <div class="meta-label">Classe</div>
                        <input type="text" class="meta-input" value="${c.class}" onchange="updateChar('class', this.value)">
                    </div>
                    <div class="meta-field">
                        <div class="meta-label">Origem</div>
                        <input type="text" class="meta-input" value="${c.origin}" onchange="updateChar('origin', this.value)">
                    </div>
                    <div class="meta-field">
                        <div class="meta-label">NEX</div>
                        <input type="text" class="meta-input" value="${c.nex}" onchange="updateChar('nex', this.value)">
                    </div>
                    <div class="meta-field">
                        <div class="meta-label">Patente</div>
                        <input type="text" class="meta-input" value="${c.patent}" onchange="updateChar('patent', this.value)">
                    </div>
                    <div class="meta-field">
                        <div class="meta-label">Idade</div>
                        <input type="text" class="meta-input" value="${c.age}" onchange="updateChar('age', this.value)">
                    </div>
                    <div class="meta-field">
                        <div class="meta-label">Altura</div>
                        <input type="text" class="meta-input" value="${c.height}" onchange="updateChar('height', this.value)">
                    </div>
                </div>
            </div>
            
            <div class="stats-grid">
                ${renderStat(c, 'pv', '❤️', 'Vida')}
                ${renderStat(c, 'pe', '⚡', 'PE')}
                ${renderStat(c, 'san', '🧠', 'Sanidade')}
                ${renderDefMov(c)}
            </div>
            
            <div class="section open">
                <div class="section-header" onclick="toggleSection(this)">
                    <span class="section-title">Atributos</span>
                    <span class="section-arrow">▼</span>
                </div>
                <div class="section-body">
                    <div class="section-content">
                        <div class="attrs-grid">
                            ${renderAttr(c, 'for', 'FOR')}
                            ${renderAttr(c, 'agi', 'AGI')}
                            ${renderAttr(c, 'int', 'INT')}
                            ${renderAttr(c, 'pre', 'PRE')}
                            ${renderAttr(c, 'vig', 'VIG')}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <div class="section-header" onclick="toggleSection(this)">
                    <span class="section-title">Perícias</span>
                    <span class="section-arrow">▼</span>
                </div>
                <div class="section-body">
                    <div class="section-content">
                        ${c.skills.map((s, i) => `
                            <div class="skill-item" onclick="rollSkill('${s.name}', ${s.mod})">
                                <span class="skill-name">${s.name}</span>
                                <span class="skill-total" style="color: ${elem.color}">${s.mod >= 0 ? '+' : ''}${s.mod}</span>
                            </div>
                        `).join('')}
                        <button class="add-btn" onclick="addSkill()">+ Adicionar Perícia</button>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <div class="section-header" onclick="toggleSection(this)">
                    <span class="section-title">📜 Grimório (${c.rituals.length})</span>
                    <span class="section-arrow">▼</span>
                </div>
                <div class="section-body">
                    <div class="section-content">
                        ${c.rituals.length === 0 
                            ? '<div style="text-align:center; color:var(--text-muted); padding:20px;">Nenhum ritual aprendido</div>'
                            : c.rituals.map((r, i) => {
                                const ritualElem = ELEMENTS[r.element];
                                return `
                                    <div class="ritual-card" onclick="this.classList.toggle('open')" style="color: ${ritualElem.color}; border-color: ${ritualElem.color}40">
                                        <div class="ritual-header">
                                            <span class="ritual-name">${ritualElem.symbol} ${r.name}</span>
                                            <span class="ritual-cost">${r.cost}</span>
                                        </div>
                                        <div class="ritual-meta">
                                            <span>${r.exec}</span>
                                            <span>${r.range}</span>
                                            <span style="text-transform:capitalize">${r.element}</span>
                                        </div>
                                        <div class="ritual-desc">${r.desc}</div>
                                        <div class="ritual-actions">
                                            <button class="ritual-btn cast" onclick="castRitual(${i}); event.stopPropagation();">🔮 Lançar</button>
                                            <button class="ritual-btn danger" onclick="deleteRitual(${i}); event.stopPropagation();">🗑️ Remover</button>
                                        </div>
                                    </div>
                                `;
                            }).join('')
                        }
                        <button class="add-btn" onclick="openRitualLibrary()">+ Adicionar Ritual</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    checkSanity(c);
}

function renderStat(c, key, icon, label) {
    const stat = c.stats[key];
    const pct = (stat.current / stat.max) * 100;
    const colors = { pv: 'var(--pv)', pe: 'var(--pe)', san: 'var(--san)' };
    
    return `
        <div class="stat-card ${key}">
            <div class="stat-header">
                <span class="stat-icon">${icon}</span>
                <span class="stat-name">${label}</span>
            </div>
            <div class="stat-values">
                <input type="number" class="stat-current" value="${stat.current}" 
                       onchange="updateStat('${key}', 'current', this.value)" min="0">
                <span class="stat-sep">/</span>
                <input type="number" class="stat-max" value="${stat.max}" 
                       onchange="updateStat('${key}', 'max', this.value)" min="1">
            </div>
            <div class="stat-bar-bg">
                <div class="stat-bar ${key}-bar" style="width: ${pct}%; background: ${colors[key]}"></div>
            </div>
            <div class="stat-controls">
                <button class="stat-btn" onclick="adjustStat('${key}', -1)">−</button>
                <button class="stat-btn" onclick="adjustStat('${key}', 1)">+</button>
            </div>
        </div>
    `;
}

function renderDefMov(c) {
    return `
        <div class="stat-card def">
            <div class="stat-header">
                <span class="stat-icon">🛡️</span>
                <span class="stat-name">Defesa</span>
            </div>
            <div class="stat-values">
                <input type="number" class="stat-current" value="${c.stats.def}" 
                       onchange="updateChar('stats.def', this.value)" style="font-size:1.5rem">
            </div>
            <div style="text-align:center; color:var(--text-muted); font-size:0.8rem; margin-top:8px;">
                Deslocamento: ${c.stats.mov}
            </div>
        </div>
        <div class="stat-card" style="border-top: 3px solid var(--text-muted);">
            <div class="stat-header">
                <span class="stat-icon">🏃</span>
                <span class="stat-name">Movimento</span>
            </div>
            <div class="stat-values">
                <input type="text" class="stat-current" value="${c.stats.mov}" 
                       onchange="updateChar('stats.mov', this.value)" style="font-size:1.2rem">
            </div>
        </div>
    `;
}

function renderAttr(c, key, label) {
    const val = c.attributes[key];
    const mod = val - 1;
    const sign = mod >= 0 ? '+' : '';
    
    return `
        <div class="attr-box" onclick="rollAttr('${label}', ${val})" style="color: ${ELEMENTS[c.element].color}">
            <div class="attr-label">${label}</div>
            <input type="number" class="attr-value" value="${val}" min="0" max="5"
                   onchange="setAttr('${key}', this.value); event.stopPropagation();"
                   onclick="event.stopPropagation()">
            <div class="attr-roll">${sign}${mod}</div>
        </div>
    `;
}

function updateActionButtons() {
    document.getElementById('dupBtn').style.display = currentId ? 'block' : 'none';
    document.getElementById('delBtn').style.display = currentId ? 'block' : 'none';
}

// ═══════════════════════════════════════════════════════════════
// AÇÕES DO PERSONAGEM
// ═══════════════════════════════════════════════════════════════
function switchChar(id) {
    currentId = id;
    renderAll();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateChar(field, value) {
    const c = characters.find(x => x.id === currentId);
    if (!c) return;
    
    if (field.includes('.')) {
        const [parent, child] = field.split('.');
        c[parent][child] = value;
    } else {
        c[field] = value;
    }
    
    if (field === 'element') {
        updateTheme();
    }
    
    saveData();
    renderSelector();
}

function updateStat(stat, type, value) {
    const c = characters.find(x => x.id === currentId);
    if (!c) return;
    
    let num = parseInt(value) || 0;
    
    if (type === 'current') {
        num = Math.max(0, Math.min(num, c.stats[stat].max));
        c.stats[stat].current = num;
    } else {
        num = Math.max(1, num);
        c.stats[stat].max = num;
        if (c.stats[stat].current > num) {
            c.stats[stat].current = num;
        }
    }
    
    saveData();
    renderSheet();
}

function adjustStat(stat, delta) {
    const c = characters.find(x => x.id === currentId);
    if (!c) return;
    
    const newVal = c.stats[stat].current + delta;
    if (newVal < 0 || newVal > c.stats[stat].max) return;
    
    c.stats[stat].current = newVal;
    saveData();
    renderSheet();
}

function setAttr(attr, value) {
    const c = characters.find(x => x.id === currentId);
    if (!c) return;
    
    c.attributes[attr] = Math.min(5, Math.max(0, parseInt(value) || 0));
    saveData();
}

// ═══════════════════════════════════════════════════════════════
// FOTO DO PERSONAGEM
// ═══════════════════════════════════════════════════════════════
function uploadPhoto(input) {
    const file = input.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const c = characters.find(x => x.id === currentId);
        if (c) {
            c.photo = e.target.result;
            saveData();
            renderAll();
            showToast('Foto atualizada!');
        }
    };
    reader.readAsDataURL(file);
}

// ═══════════════════════════════════════════════════════════════
// DELETAR PERSONAGEM
// ═══════════════════════════════════════════════════════════════
function confirmDeleteChar() {
    document.getElementById('deleteConfirmModal').classList.add('open');
}

function closeDeleteConfirm() {
    document.getElementById('deleteConfirmModal').classList.remove('open');
}

function deleteCharacter() {
    const c = characters.find(x => x.id === currentId);
    if (!c) return;
    
    characters = characters.filter(x => x.id !== currentId);
    
    if (characters.length > 0) {
        currentId = characters[0].id;
    } else {
        currentId = null;
        createDefaultChar();
    }
    
    saveData();
    renderAll();
    closeDeleteConfirm();
    showToast('Personagem deletado!');
}

// ═══════════════════════════════════════════════════════════════
// ROLAGEM DE DADOS
// ═══════════════════════════════════════════════════════════════
function roll(sides) {
    const mod = parseInt(document.getElementById('diceMod').value) || 0;
    const roll = Math.floor(Math.random() * sides) + 1;
    const total = roll + mod;
    const isCrit = roll === sides;
    const isFail = roll === 1;
    
    showResult(total, `d${sides}${mod >= 0 ? '+' : ''}${mod || ''}`, isCrit, isFail, [roll]);
}

function rollCrit() {
    const roll = Math.floor(Math.random() * 20) + 1;
    const isCrit = roll === 20;
    showResult(roll, 'd20 CRÍTICO', isCrit, roll === 1, [roll]);
}

function rollAttr(name, value) {
    const mod = value - 1;
    const roll1 = Math.floor(Math.random() * 20) + 1;
    const roll2 = Math.floor(Math.random() * 20) + 1;
    const total = roll1 + roll2 + mod;
    
    openDice();
    showResult(total, `${name} [${value}]`, roll1 === 20 || roll2 === 20, roll1 === 1 && roll2 === 1, [roll1, roll2]);
}

function rollSkill(name, mod) {
    const roll = Math.floor(Math.random() * 20) + 1;
    const total = roll + mod;
    
    openDice();
    showResult(total, `${name} (${mod >= 0 ? '+' : ''}${mod})`, roll === 20, roll === 1, [roll]);
}

function showResult(total, label, isCrit, isFail, rolls) {
    const resultDiv = document.getElementById('diceResult');
    const numDiv = document.getElementById('resultNum');
    const labelDiv = document.getElementById('resultLabel');
    const rollsDiv = document.getElementById('resultRolls');
    
    resultDiv.style.display = 'block';
    resultDiv.className = 'dice-result ' + (isCrit ? 'critical' : '');
    numDiv.textContent = total;
    numDiv.style.color = isCrit ? 'var(--sangue-light)' : (isFail ? '#666' : 'currentColor');
    labelDiv.textContent = label + (isCrit ? ' ⭐ CRÍTICO!' : isFail ? ' 💀 FALHA!' : '');
    rollsDiv.textContent = `[${rolls.join(' + ')}] ${isCrit ? '×2' : ''}`;
    
    rollHistory.unshift({ label, total, rolls, time: new Date().toLocaleTimeString() });
    if (rollHistory.length > 10) rollHistory.pop();
    
    renderHistory();
    
    setTimeout(() => resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
}

function renderHistory() {
    const container = document.getElementById('rollHistory');
    container.innerHTML = rollHistory.map(h => `
        <div class="history-item">
            <span style="color:#666">${h.label}</span>
            <span style="color:var(--energy); font-weight:bold">${h.total} [${h.rolls.join(',')}]</span>
        </div>
    `).join('');
}

// ═══════════════════════════════════════════════════════════════
// BIBLIOTECA DE RITUAIS
// ═══════════════════════════════════════════════════════════════
function openRitualLibrary() {
    ritualFilter = 'all';
    ritualSearch = '';
    document.getElementById('ritualSearch').value = '';
    updateFilterButtons();
    renderRitualLibrary();
    document.getElementById('ritualLibraryModal').classList.add('open');
}

function closeRitualLibrary() {
    document.getElementById('ritualLibraryModal').classList.remove('open');
}

function setElementFilter(element) {
    ritualFilter = element;
    updateFilterButtons();
    renderRitualLibrary();
}

function updateFilterButtons() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(ritualFilter) || 
            (ritualFilter === 'all' && btn.textContent === 'Todos')) {
            btn.classList.add('active');
        }
    });
}

function filterRituals() {
    ritualSearch = document.getElementById('ritualSearch').value.toLowerCase();
    renderRitualLibrary();
}

function renderRitualLibrary() {
    const c = characters.find(x => x.id === currentId);
    const container = document.getElementById('ritualLibraryList');
    
    let filtered = typeof RITUALS_DB !== 'undefined' ? RITUALS_DB : [];
    
    if (ritualFilter !== 'all') {
        filtered = filtered.filter(r => r.element === ritualFilter);
    }
    
    if (ritualSearch) {
        filtered = filtered.filter(r => 
            r.name.toLowerCase().includes(ritualSearch) ||
            r.element.toLowerCase().includes(ritualSearch)
        );
    }
    
    const knownRituals = c ? c.rituals.map(r => r.name) : [];
    
    container.innerHTML = filtered.length === 0 
        ? '<div style="text-align:center; color:var(--text-muted); padding:40px;">Nenhum ritual encontrado</div>'
        : filtered.map(r => {
            const elem = ELEMENTS[r.element];
            const isAdded = knownRituals.includes(r.name);
            return `
                <div class="ritual-library-item ${isAdded ? 'added' : ''}" 
                     onclick="${isAdded ? '' : `openRitualDetail('${r.name}')`}"
                     style="color: ${elem.color}; border-color: ${elem.color}40">
                    <div class="ritual-header">
                        <span class="ritual-name">${elem.symbol} ${r.name}</span>
                        <span class="ritual-cost">${r.cost}</span>
                    </div>
                    <div class="ritual-meta">
                        <span>${r.exec}</span>
                        <span>${r.range}</span>
                        <span>Círculo ${r.circle}</span>
                    </div>
                    <div style="font-size:0.8rem; color:#888; margin-top:8px;">
                        ${isAdded ? '✓ Já aprendido' : r.desc.substring(0, 80) + '...'}
                    </div>
                </div>
            `;
        }).join('');
}

function openRitualDetail(ritualName) {
    const ritual = RITUALS_DB.find(r => r.name === ritualName);
    if (!ritual) return;
    
    const elem = ELEMENTS[ritual.element];
    const container = document.getElementById('ritualDetailContent');
    
    container.innerHTML = `
        <div class="ritual-detail-header">
            <div class="ritual-detail-name" style="color: ${elem.color}">${elem.symbol} ${ritual.name}</div>
            <div class="ritual-detail-element" style="color: ${elem.color}">${ritual.element.toUpperCase()}</div>
        </div>
        
        <div class="ritual-detail-stats">
            <div class="ritual-stat-box">
                <div class="ritual-stat-label">Custo</div>
                <div class="ritual-stat-value" style="color: ${elem.color}">${ritual.cost}</div>
            </div>
            <div class="ritual-stat-box">
                <div class="ritual-stat-label">Execução</div>
                <div class="ritual-stat-value">${ritual.exec}</div>
            </div>
            <div class="ritual-stat-box">
                <div class="ritual-stat-label">Alcance</div>
                <div class="ritual-stat-value">${ritual.range}</div>
            </div>
            <div class="ritual-stat-box">
                <div class="ritual-stat-label">Círculo</div>
                <div class="ritual-stat-value">${ritual.circle}</div>
            </div>
            <div class="ritual-stat-box">
                <div class="ritual-stat-label">Duração</div>
                <div class="ritual-stat-value">${ritual.duration}</div>
            </div>
        </div>
        
        <div class="ritual-detail-description">
            <div class="form-label" style="margin-bottom:12px;">DESCRIÇÃO</div>
            ${ritual.desc}
        </div>
        
        <button class="btn-primary" onclick="addRitual('${ritual.name}')" style="border-color: ${elem.color}; color: ${elem.color}">
            ➕ ADICIONAR AO GRIMÓRIO
        </button>
    `;
    
    document.getElementById('ritualDetailModal').classList.add('open');
}

function closeRitualDetail() {
    document.getElementById('ritualDetailModal').classList.remove('open');
}

function addRitual(name) {
    const c = characters.find(x => x.id === currentId);
    const ritual = RITUALS_DB.find(r => r.name === name);
    
    if (!c || !ritual) return;
    
    if (c.rituals.some(r => r.name === name)) {
        showToast('Você já conhece este ritual!');
        closeRitualDetail();
        return;
    }
    
    c.rituals.push({...ritual});
    saveData();
    renderSheet();
    closeRitualDetail();
    closeRitualLibrary();
    showToast(`Ritual "${name}" adicionado!`);
}

function deleteRitual(idx) {
    const c = characters.find(x => x.id === currentId);
    if (!c) return;
    
    const ritualName = c.rituals[idx].name;
    c.rituals.splice(idx, 1);
    saveData();
    renderSheet();
    showToast(`Ritual "${ritualName}" removido!`);
}

// ═══════════════════════════════════════════════════════════════
// LANÇAR RITUAL COM EFEITOS
// ═══════════════════════════════════════════════════════════════
function castRitual(idx) {
    const c = characters.find(x => x.id === currentId);
    if (!c) return;
    
    const ritual = c.rituals[idx];
    const cost = parseInt(ritual.cost.match(/\d+/)?.[0]) || 0;
    
    if (c.stats.pe.current < cost) {
        showToast('❌ PE insuficiente!');
        return;
    }
    
    showCastEffect(ritual.element);
    
    setTimeout(() => {
        c.stats.pe.current -= cost;
        saveData();
        renderSheet();
        showToast(`🔮 ${ritual.name} conjurado! (-${cost} PE)`);
    }, 800);
}

function showCastEffect(element) {
    const overlay = document.getElementById('castOverlay');
    const symbol = document.getElementById('castSymbol');
    const elem = ELEMENTS[element];
    
    overlay.className = 'cast-overlay active ' + element;
    symbol.textContent = elem.symbol;
    
    setTimeout(() => {
        overlay.classList.remove('active');
    }, 1500);
}

// ═══════════════════════════════════════════════════════════════
// INVENTÁRIO
// ═══════════════════════════════════════════════════════════════
function openInventory() {
    const c = characters.find(x => x.id === currentId);
    if (!c) return;
    
    renderInventory(c);
    document.getElementById('inventoryModal').classList.add('open');
}

function closeInventory() {
    document.getElementById('inventoryModal').classList.remove('open');
}

function renderInventory(c) {
    const container = document.getElementById('inventoryContent');
    const cats = {
        weapons: '🔫 Armas',
        equipment: '🛡️ Equipamento',
        occult: '🔮 Ocultismo',
        consumables: '🧪 Consumíveis'
    };
    
    container.innerHTML = `
        <div class="inv-categories">
            ${Object.entries(cats).map(([k, v]) => `
                <button class="inv-tab ${currentInvTab === k ? 'active' : ''}" 
                        onclick="switchInvTab('${k}')"
                        style="${currentInvTab === k ? `color: ${ELEMENTS[c.element].color}; border-color: ${ELEMENTS[c.element].color}` : ''}">
                    ${v}
                </button>
            `).join('')}
        </div>
        
        <div id="invPanel">
            ${c.inventory[currentInvTab].length === 0 
                ? '<div style="text-align:center; color:var(--text-muted); padding:20px;">Nenhum item</div>'
                : c.inventory[currentInvTab].map((item, i) => `
                    <div class="inv-item">
                        <div>
                            <input type="text" class="inv-name" value="${item.name}" 
                                   onchange="updateItem('${currentInvTab}', ${i}, 'name', this.value)">
                            <div class="inv-slot">${item.slot || 'item'}</div>
                        </div>
                        ${item.qty !== undefined ? `
                            <input type="number" class="form-input" style="width:60px; padding:8px;" 
                                   value="${item.qty}" onchange="updateItem('${currentInvTab}', ${i}, 'qty', this.value)">
                        ` : ''}
                        <div class="inv-actions">
                            <button class="inv-btn" onclick="deleteItem('${currentInvTab}', ${i})">×</button>
                        </div>
                    </div>
                `).join('')
            }
        </div>
        
        <button class="add-btn" onclick="addItem()">+ Adicionar Item</button>
    `;
}

function switchInvTab(tab) {
    currentInvTab = tab;
    const c = characters.find(x => x.id === currentId);
    if (c) renderInventory(c);
}

function updateItem(cat, idx, field, value) {
    const c = characters.find(x => x.id === currentId);
    if (!c) return;
    
    c.inventory[cat][idx][field] = field === 'qty' ? parseInt(value) || 0 : value;
    saveData();
}

function deleteItem(cat, idx) {
    const c = characters.find(x => x.id === currentId);
    if (!c) return;
    
    c.inventory[cat].splice(idx, 1);
    saveData();
    renderInventory(c);
}

function addItem() {
    const c = characters.find(x => x.id === currentId);
    if (!c) return;
    
    const name = prompt('Nome do item:');
    if (!name) return;
    
    const slot = prompt('Slot (arma/vestimenta/artefato/item):') || 'item';
    const desc = prompt('Descrição:') || '';
    
    const item = { name, slot, desc };
    if (currentInvTab === 'consumables') {
        item.qty = parseInt(prompt('Quantidade:')) || 1;
    }
    
    c.inventory[currentInvTab].push(item);
    saveData();
    renderInventory(c);
}

// ═══════════════════════════════════════════════════════════════
// GERENCIAMENTO DE PERSONAGENS
// ═══════════════════════════════════════════════════════════════
function openNewChar() {
    document.getElementById('newCharModal').classList.add('open');
}

function closeNewChar() {
    document.getElementById('newCharModal').classList.remove('open');
}

function previewElement(elem) {
    document.body.className = ELEMENTS[elem].bg;
}

function createCharacter() {
    const name = document.getElementById('newName').value.trim();
    if (!name) {
        alert('Digite um nome!');
        return;
    }
    
    const element = document.getElementById('newElement').value;
    const newChar = {
        id: Date.now(),
        name: name,
        class: document.getElementById('newClass').value,
        origin: document.getElementById('newOrigin').value || 'Desconhecida',
        element: element,
        patent: 'Recruta',
        nex: document.getElementById('newNex').value || '5%',
        age: '',
        height: '',
        weight: '',
        photo: null,
        stats: {
            pv: { current: 20, max: 20 },
            pe: { current: 10, max: 10 },
            san: { current: 50, max: 50 },
            def: 10,
            mov: '9m'
        },
        attributes: { for: 1, agi: 1, int: 1, pre: 1, vig: 1 },
        skills: [],
        rituals: [],
        inventory: {
            weapons: [],
            equipment: [],
            occult: [],
            consumables: []
        }
    };
    
    characters.push(newChar);
    currentId = newChar.id;
    saveData();
    renderAll();
    closeNewChar();
    
    document.getElementById('newName').value = '';
    document.getElementById('newOrigin').value = '';
    
    showToast('Agente criado!');
}

function duplicateChar() {
    const c = characters.find(x => x.id === currentId);
    if (!c) return;
    
    const copy = JSON.parse(JSON.stringify(c));
    copy.id = Date.now();
    copy.name = c.name + ' (Cópia)';
    characters.push(copy);
    currentId = copy.id;
    saveData();
    renderAll();
    showToast('Personagem duplicado!');
}

// ═══════════════════════════════════════════════════════════════
// PERSISTÊNCIA DE DADOS
// ═══════════════════════════════════════════════════════════════
function saveData() {
    try {
        localStorage.setItem('ordemRPG_v7', JSON.stringify(characters));
        localStorage.setItem('ordemCurrent_v7', currentId);
    } catch (e) {
        console.error('Erro ao salvar:', e);
    }
}

function loadData() {
    try {
        const data = localStorage.getItem('ordemRPG_v7');
        const curr = localStorage.getItem('ordemCurrent_v7');
        if (data) characters = JSON.parse(data);
        if (curr) currentId = parseInt(curr);
    } catch (e) {
        console.error('Erro ao carregar:', e);
    }
}

function exportData() {
    const data = JSON.stringify(characters, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ordem-paranormal-fichas-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast('Fichas exportadas!');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const data = JSON.parse(event.target.result);
                if (Array.isArray(data)) {
                    characters = data;
                    currentId = characters[0]?.id || null;
                    saveData();
                    renderAll();
                    showToast('Fichas importadas!');
                }
            } catch (err) {
                alert('Arquivo inválido!');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// ═══════════════════════════════════════════════════════════════
// UTILITÁRIOS DE UI
// ═══════════════════════════════════════════════════════════════
function openDice() {
    document.getElementById('diceModal').classList.add('open');
    document.getElementById('diceResult').style.display = 'none';
}

function closeDice() {
    document.getElementById('diceModal').classList.remove('open');
}

function toggleSection(header) {
    header.parentElement.classList.toggle('open');
}

function updateTheme() {
    const c = characters.find(x => x.id === currentId);
    if (!c) return;
    
    const theme = ELEMENTS[c.element];
    document.body.className = theme.bg;
    document.getElementById('elementSymbol').textContent = theme.symbol;
    document.documentElement.style.setProperty('--theme-color', theme.color);
}

function checkSanity(c) {
    const pct = (c.stats.san.current / c.stats.san.max) * 100;
    const border = document.getElementById('sanityBorder');
    const body = document.body;
    
    border.className = 'sanity-warning';
    body.classList.remove('san-low', 'san-critical');
    
    if (pct <= 10) {
        border.classList.add('critical');
        body.classList.add('san-critical');
    } else if (pct <= 25) {
        border.classList.add('low');
        body.classList.add('san-low');
    }
}

function showToast(msg) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

function addSkill() {
    const c = characters.find(x => x.id === currentId);
    if (!c) return;
    
    const name = prompt('Nome da perícia:');
    if (!name) return;
    
    const mod = parseInt(prompt('Bônus numérico:')) || 0;
    c.skills.push({ name, attr: 'int', mod });
    saveData();
    renderSheet();
}

// ═══════════════════════════════════════════════════════════════
// EVENT LISTENERS
// ═══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', init);

document.querySelectorAll('.modal-panel').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('open');
        }
    });
});

let lastTouchEnd = 0;
document.addEventListener('touchend', function(e) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);
