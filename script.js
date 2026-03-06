const app = {
    characters: [],
    currentId: null,
    
    // Inicia o sistema
    init: function() {
        this.loadData();
        if (this.characters.length === 0) {
            this.createDefaultChar();
        }
        this.renderAll();
        this.setupEventListeners();
    },

    // ─── SEGURANÇA ──────────────────────────────────────────────
    // Pega o personagem atual garantindo que ele existe
    getCurrentChar: function() {
        if (!this.currentId) return null;
        return this.characters.find(c => c.id === this.currentId) || null;
    },

    // ─── ATUALIZAÇÕES VISUAIS ───────────────────────────────────
    renderAll: function() {
        this.renderSelector();
        this.renderSheet();
        this.updateActionButtons();
    },

    renderSelector: function() {
        const container = document.getElementById('charSelector');
        if(!container) return;

        container.innerHTML = this.characters.map(c => `
            <div class="char-tab ${c.id === this.currentId ? 'active' : ''}" 
                 onclick="app.switchChar(${c.id})">
                <div class="char-avatar">${c.name.charAt(0).toUpperCase()}</div>
            </div>
        `).join('') + '<div class="char-tab char-add" onclick="app.openNewChar()">+</div>';
    },

    renderSheet: function() {
        const c = this.getCurrentChar();
        const container = document.getElementById('sheetContainer');
        
        // Trava de segurança: Se não tiver personagem, mostra aviso amigável
        if (!c) {
            container.innerHTML = `<div style="text-align:center; padding: 40px; color: #777;">Nenhum agente selecionado. Crie um novo!</div>`;
            return;
        }

        // Aqui vai toda aquela sua string gigante de HTML que desenha a ficha (status, inventário, etc)
        // Substitua pelo seu HTML de template da V7
        container.innerHTML = `
            <div class="sheet active">
                <input type="text" class="char-name" value="${c.name}" onchange="app.updateChar('name', this.value)">
                </div>
        `;
    },

    updateActionButtons: function() {
        const c = this.getCurrentChar();
        document.getElementById('dupBtn').style.display = c ? 'block' : 'none';
        document.getElementById('delBtn').style.display = c ? 'block' : 'none';
    },

    switchChar: function(id) {
        this.currentId = id;
        this.saveData();
        this.renderAll();
    },

    updateChar: function(field, value) {
        const c = this.getCurrentChar();
        if (!c) return;
        c[field] = value;
        this.saveData();
    },

    // ─── GERENCIAMENTO (CRIAR/DELETAR) ──────────────────────────
    createDefaultChar: function() {
        const char = {
            id: Date.now(),
            name: 'Agente Desconhecido',
            class: 'Ocultista',
            element: 'conhecimento',
            stats: {
                pv: { current: 20, max: 20 },
                pe: { current: 10, max: 10 },
                san: { current: 30, max: 30 }
            },
            inventory: { weapons: [], equipment: [], occult: [], consumables: [] },
            rituals: []
        };
        this.characters.push(char);
        this.currentId = char.id;
        this.saveData();
    },

    openNewChar: function() {
        document.getElementById('newCharModal').classList.add('open');
    },

    closeNewChar: function() {
        document.getElementById('newCharModal').classList.remove('open');
    },

    createCharacter: function() {
        const name = document.getElementById('newName').value || 'Novo Agente';
        const element = document.getElementById('newElement').value;
        
        const newChar = {
            id: Date.now(),
            name: name,
            element: element,
            stats: { pv: { current: 20, max: 20 }, pe: { current: 10, max: 10 }, san: { current: 30, max: 30 } },
            inventory: { weapons: [], equipment: [], occult: [], consumables: [] },
            rituals: []
        };
        
        this.characters.push(newChar);
        this.currentId = newChar.id;
        this.saveData();
        this.renderAll();
        this.closeNewChar();
    },

    // ─── PERSISTÊNCIA ───────────────────────────────────────────
    saveData: function() {
        localStorage.setItem('ordemRPG_v8', JSON.stringify(this.characters));
        localStorage.setItem('ordemCurrent_v8', this.currentId);
    },

    loadData: function() {
        const data = localStorage.getItem('ordemRPG_v8') || localStorage.getItem('ordemRPG_v7');
        const curr = localStorage.getItem('ordemCurrent_v8') || localStorage.getItem('ordemCurrent_v7');
        if (data) this.characters = JSON.parse(data);
        if (curr) this.currentId = parseInt(curr);
    },

    // Fechar modais ao clicar fora
    setupEventListeners: function() {
        document.querySelectorAll('.modal-panel').forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('open');
                }
            });
        });
    }
};

// Inicia o app assim que o HTML carregar
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
