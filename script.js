// Global state
let parties = [];
let currentParty = null;
let currentUser = null;

// Task mappings for each floor and class
const taskMappings = {
    "F1": {
        "Tank": ["Tank all mobs", "Stay with team", "Use defensive abilities"],
        "Healer": ["Keep team alive", "Use healing abilities", "Stay behind tank"],
        "Mage": ["Clear rooms efficiently", "Use AOE spells", "Manage mana"],
        "Berserker": ["High DPS on bosses", "Clear minions", "Use rage abilities"],
        "Archer": ["Long range damage", "Kite enemies", "Use bow abilities"]
    },
    "F2": {
        "Tank": ["Tank Scarf", "Protect team from archers", "Control mob positioning"],
        "Healer": ["Heal through poison", "Remove debuffs", "Maintain team health"],
        "Mage": ["Clear archer waves", "Ice spray for crowd control", "Mana management"],
        "Berserker": ["Focus Scarf boss", "Clear skeleton archers", "High burst damage"],
        "Archer": ["Snipe archers from distance", "Kite Scarf", "Consistent DPS"]
    },
    "F3": {
        "Tank": ["Tank The Professor", "Handle guardian spawns", "Positioning for team"],
        "Healer": ["Heal through guardian damage", "Cleanse effects", "Emergency heals"],
        "Mage": ["Clear guardian waves", "Ice spray guardians", "Efficient room clearing"],
        "Berserker": ["Burst down Professor", "Clear guardians quickly", "Manage cooldowns"],
        "Archer": ["Focus fire guardians", "Maintain distance", "Consistent damage output"]
    },
    "F4": {
        "Tank": ["Tank Thorn", "Handle spirit animals", "Control positioning"],
        "Healer": ["Heal through spirit damage", "Remove poison effects", "Team sustain"],
        "Mage": ["Clear spirit waves", "AOE for multiple targets", "Mana efficiency"],
        "Berserker": ["High DPS on Thorn", "Clear spirits fast", "Burst windows"],
        "Archer": ["Kite spirit animals", "Focus Thorn", "Mobility usage"]
    },
    "F5": {
        "Tank": ["Tank Livid", "Handle Livid clones", "Protect team from damage"],
        "Healer": ["Heal through clone damage", "Quick reaction heals", "Sustain through fight"],
        "Mage": ["Identify real Livid", "Clear clones efficiently", "Ice spray for control"],
        "Berserker": ["Burst real Livid", "Quick clone clearing", "Damage optimization"],
        "Archer": ["Snipe real Livid", "Kite clones", "Precise targeting"]
    },
    "F6": {
        "Tank": ["Tank Sadan", "Handle terracotta spawns", "Giant positioning"],
        "Healer": ["Heal through giant damage", "Emergency saves", "Consistent healing"],
        "Mage": ["Clear terracotta armies", "Ice spray for control", "Room clearing"],
        "Berserker": ["High DPS on giants", "Terracotta clearing", "Burst damage phases"],
        "Archer": ["Focus fire giants", "Kite terracottas", "Sustained damage"]
    },
    "F7": {
        "Tank": ["Tank Necron", "Handle Maxor phase", "Storm positioning", "Goldor tanking"],
        "Healer": ["Heal through all phases", "Emergency saves", "Wither cloak management", "Team sustain"],
        "Mage": ["Left click Necron", "Clear terminals", "Ice spray adds", "Efficient clearing"],
        "Berserker": ["High DPS all phases", "Terminal clearing", "Burst damage windows", "Minion clearing"],
        "Archer": ["Consistent DPS", "Terminal clearing", "Kite mechanics", "Precise shots"]
    },
    "M1": {
        "Tank": ["Tank all mobs", "Master mode positioning", "Enhanced defensive play"],
        "Healer": ["Intensive healing", "Master mode sustain", "Quick reactions"],
        "Mage": ["Efficient clearing", "Master mode damage", "Mana optimization"],
        "Berserker": ["High master DPS", "Enhanced burst", "Optimal rotations"],
        "Archer": ["Master mode kiting", "Precise targeting", "Sustained damage"]
    },
    "M2": {
        "Tank": ["Tank enhanced Scarf", "Master positioning", "Team protection"],
        "Healer": ["Master healing output", "Enhanced sustain", "Debuff management"],
        "Mage": ["Master room clearing", "Enhanced ice spray", "Optimal rotations"],
        "Berserker": ["Master burst damage", "Enhanced DPS", "Cooldown management"],
        "Archer": ["Master kiting", "Enhanced precision", "Damage optimization"]
    },
    "M3": {
        "Tank": ["Tank master Professor", "Enhanced positioning", "Guardian control"],
        "Healer": ["Master healing through guardians", "Enhanced team sustain", "Quick saves"],
        "Mage": ["Master guardian clearing", "Enhanced AOE", "Efficient rotations"],
        "Berserker": ["Master Professor DPS", "Enhanced burst", "Guardian clearing"],
        "Archer": ["Master guardian focus", "Enhanced kiting", "Optimal positioning"]
    },
    "M4": {
        "Tank": ["Tank master Thorn", "Enhanced spirit control", "Master positioning"],
        "Healer": ["Master spirit healing", "Enhanced sustain", "Poison management"],
        "Mage": ["Master spirit clearing", "Enhanced AOE damage", "Mana efficiency"],
        "Berserker": ["Master Thorn DPS", "Enhanced spirit clear", "Burst optimization"],
        "Archer": ["Master spirit kiting", "Enhanced mobility", "Precise targeting"]
    },
    "M5": {
        "Tank": ["Tank master Livid", "Enhanced clone control", "Master positioning"],
        "Healer": ["Master clone healing", "Enhanced reaction time", "Team sustain"],
        "Mage": ["Master Livid identification", "Enhanced clone clear", "Ice optimization"],
        "Berserker": ["Master Livid burst", "Enhanced clone DPS", "Damage windows"],
        "Archer": ["Master Livid sniping", "Enhanced clone kiting", "Precision shots"]
    },
    "M6": {
        "Tank": ["Tank master Sadan", "Enhanced giant control", "Master positioning"],
        "Healer": ["Master giant healing", "Enhanced emergency saves", "Sustained output"],
        "Mage": ["Master terracotta clear", "Enhanced room clearing", "Ice mastery"],
        "Berserker": ["Master giant DPS", "Enhanced terracotta clear", "Burst mastery"],
        "Archer": ["Master giant focus", "Enhanced kiting", "Sustained mastery"]
    },
    "M7": {
        "Tank": ["Master Necron tanking", "Enhanced phase control", "Perfect positioning", "Master mechanics"],
        "Healer": ["Master phase healing", "Enhanced emergency saves", "Perfect sustain", "Wither mastery"],
        "Mage": ["Master terminal clearing", "Enhanced Necron DPS", "Perfect ice usage", "Optimal rotations"],
        "Berserker": ["Master phase DPS", "Enhanced terminal speed", "Perfect burst windows", "Mastery optimization"],
        "Archer": ["Master phase precision", "Enhanced terminal clear", "Perfect kiting", "Sustained mastery"]
    }
};

// Class icons
const classIcons = {
    "Tank": "🛡️",
    "Healer": "❤️",
    "Mage": "🔮",
    "Berserker": "⚔️",
    "Archer": "🏹"
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadSampleParties();
    showPage('home');
});

// Page navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId + '-page').classList.add('active');
    
    // Update page-specific content
    if (pageId === 'browser') {
        displayParties();
    }
}

// Create party
function createParty(event) {
    event.preventDefault();
    
    const leaderName = document.getElementById('leader-name').value;
    const floor = document.getElementById('floor-select').value;
    const partyType = document.getElementById('party-type').value;
    const requirements = document.getElementById('requirements').value;
    const notes = document.getElementById('party-notes').value;
    
    const neededClasses = Array.from(document.querySelectorAll('input[name="needed-classes"]:checked'))
        .map(checkbox => checkbox.value);
    
    const party = {
        id: Date.now(),
        leader: leaderName,
        floor: floor,
        type: partyType,
        neededClasses: neededClasses,
        requirements: requirements,
        notes: notes,
        members: [{
            name: leaderName,
            class: null,
            isLeader: true
        }],
        createdAt: new Date()
    };
    
    parties.push(party);
    saveParties();
    
    // Reset form
    document.querySelector('.create-form').reset();
    
    // Show success message and redirect
    alert('Party created successfully!');
    showPage('browser');
}

// Apply quick filters
function applyQuickFilters() {
    const floor = document.getElementById('quick-floor').value;
    const classNeeded = document.getElementById('quick-class').value;
    const type = document.getElementById('quick-type').value;
    
    // Set browser filters
    document.getElementById('filter-floor').value = floor;
    document.getElementById('filter-class').value = classNeeded;
    document.getElementById('filter-type').value = type;
    
    // Go to browser page and apply filters
    showPage('browser');
    filterParties();
}

// Filter parties
function filterParties() {
    displayParties();
}

// Display parties
function displayParties() {
    const floorFilter = document.getElementById('filter-floor').value;
    const classFilter = document.getElementById('filter-class').value;
    const typeFilter = document.getElementById('filter-type').value;
    
    let filteredParties = parties.filter(party => {
        const matchesFloor = !floorFilter || party.floor === floorFilter;
        const matchesClass = !classFilter || party.neededClasses.includes(classFilter);
        const matchesType = !typeFilter || party.type === typeFilter;
        
        return matchesFloor && matchesClass && matchesType;
    });
    
    const partiesContainer = document.getElementById('parties-list');
    
    if (filteredParties.length === 0) {
        partiesContainer.innerHTML = '<div class="empty-slot">No parties found matching your criteria.</div>';
        return;
    }
    
    partiesContainer.innerHTML = filteredParties.map(party => {
        const timeAgo = getTimeAgo(party.createdAt);
        const memberCount = party.members.filter(m => m.class).length;
        const floorClass = `floor-${party.floor.toLowerCase()}`;
        
        return `
            <div class="party-card ${floorClass}">
                <div class="party-header">
                    <span class="party-floor">${party.floor}</span>
                    <span class="party-type">${party.type}</span>
                </div>
                <div class="party-leader">Leader: ${party.leader}</div>
                <div class="party-classes">
                    Needed: ${party.neededClasses.map(cls => classIcons[cls] + ' ' + cls).join(', ')}
                </div>
                ${party.requirements ? `<div class="party-requirements">Requirements: ${party.requirements}</div>` : ''}
                <div class="party-meta">
                    <span>Members: ${memberCount}/5</span>
                    <span>${timeAgo}</span>
                </div>
                <button class="join-btn" onclick="joinParty(${party.id})">Join Party</button>
            </div>
        `;
    }).join('');
}

// Join party
function joinParty(partyId) {
    currentParty = parties.find(p => p.id === partyId);
    if (!currentParty) return;
    
    showPage('party-room');
    displayPartyRoom();
}

// Display party room
function displayPartyRoom() {
    if (!currentParty) return;
    
    const container = document.getElementById('party-room-content');
    
    container.innerHTML = `
        <div class="party-room-header">
            <h1 class="party-room-title">${currentParty.floor} - ${currentParty.type}</h1>
            <p>Leader: ${currentParty.leader}</p>
            ${currentParty.requirements ? `<p>Requirements: ${currentParty.requirements}</p>` : ''}
            ${currentParty.notes ? `<p>Notes: ${currentParty.notes}</p>` : ''}
        </div>
        
        <div class="class-selection">
            <h3>Select Your Class</h3>
            <div class="class-buttons">
                ${Object.keys(classIcons).map(className => `
                    <button class="class-btn" onclick="selectClass('${className}')">
                        ${classIcons[className]} ${className}
                    </button>
                `).join('')}
            </div>
        </div>
        
        <div class="party-members" id="party-members">
            <!-- Members will be populated here -->
        </div>
    `;
    
    updatePartyMembers();
}

// Select class
function selectClass(className) {
    // Update button states
    document.querySelectorAll('.class-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
    
    // Set current user
    currentUser = {
        name: prompt('Enter your IGN:') || 'Anonymous',
        class: className
    };
    
    // Add user to party if not already in
    const existingMember = currentParty.members.find(m => m.name === currentUser.name);
    if (existingMember) {
        existingMember.class = className;
    } else {
        currentParty.members.push(currentUser);
    }
    
    updatePartyMembers();
}

// Update party members display
function updatePartyMembers() {
    const container = document.getElementById('party-members');
    if (!container) return;
    
    // Create 5 slots
    const slots = [];
    for (let i = 0; i < 5; i++) {
        const member = currentParty.members[i];
        if (member && member.class) {
            const tasks = taskMappings[currentParty.floor] && taskMappings[currentParty.floor][member.class] 
                ? taskMappings[currentParty.floor][member.class] 
                : ['No specific tasks available'];
            
            slots.push(`
                <div class="member-card">
                    <div class="member-header">
                        <span class="member-class">${classIcons[member.class]}</span>
                        <span class="member-name">${member.name}${member.isLeader ? ' (Leader)' : ''}</span>
                    </div>
                    <div class="member-role">${member.class}</div>
                    <ul class="task-list">
                        ${tasks.map(task => `<li>${task}</li>`).join('')}
                    </ul>
                </div>
            `);
        } else {
            slots.push(`
                <div class="member-card">
                    <div class="empty-slot">Waiting for player...</div>
                </div>
            `);
        }
    }
    
    container.innerHTML = slots.join('');
}

// Utility functions
function getTimeAgo(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
}

function saveParties() {
    localStorage.setItem('fakepixel-parties', JSON.stringify(parties));
}

function loadParties() {
    const saved = localStorage.getItem('fakepixel-parties');
    if (saved) {
        parties = JSON.parse(saved).map(party => ({
            ...party,
            createdAt: new Date(party.createdAt)
        }));
    }
}

function loadSampleParties() {
    // Load from localStorage first
    loadParties();
    
    // Add sample parties if none exist
    if (parties.length === 0) {
        const sampleParties = [
            {
                id: 1,
                leader: "ProDungeoner",
                floor: "F7",
                type: "S+ Run",
                neededClasses: ["Mage", "Archer"],
                requirements: "Cata 35+, Hyperion",
                notes: "Fast S+ run, know all secrets",
                members: [
                    { name: "ProDungeoner", class: "Tank", isLeader: true },
                    { name: "MageGod", class: "Mage", isLeader: false },
                    { name: "ArcherPro", class: "Archer", isLeader: false }
                ],
                createdAt: new Date(Date.now() - 300000) // 5 minutes ago
            },
            {
                id: 2,
                leader: "CasualPlayer",
                floor: "F6",
                type: "XP Run",
                neededClasses: ["Healer", "Berserker"],
                requirements: "Cata 25+",
                notes: "Chill XP farming",
                members: [
                    { name: "CasualPlayer", class: "Mage", isLeader: true }
                ],
                createdAt: new Date(Date.now() - 600000) // 10 minutes ago
            },
            {
                id: 3,
                leader: "CarryMaster",
                floor: "F4",
                type: "Carry",
                neededClasses: ["Tank", "Healer", "Mage", "Berserker"],
                requirements: "None - Free carry!",
                notes: "Helping new players learn F4",
                members: [
                    { name: "CarryMaster", class: "Archer", isLeader: true }
                ],
                createdAt: new Date(Date.now() - 900000) // 15 minutes ago
            },
            {
                id: 4,
                leader: "SecretHunter",
                floor: "F7",
                type: "Secret Practice",
                neededClasses: ["Mage", "Tank"],
                requirements: "Know basic secrets",
                notes: "Learning all F7 secrets together",
                members: [
                    { name: "SecretHunter", class: "Berserker", isLeader: true },
                    { name: "NewbieLearner", class: null, isLeader: false }
                ],
                createdAt: new Date(Date.now() - 1200000) // 20 minutes ago
            },
            {
                id: 5,
                leader: "MasterRunner",
                floor: "M3",
                type: "S+ Run",
                neededClasses: ["Mage", "Healer"],
                requirements: "Cata 40+, Master experience",
                notes: "Master mode S+ attempts",
                members: [
                    { name: "MasterRunner", class: "Tank", isLeader: true },
                    { name: "EliteBerserker", class: "Berserker", isLeader: false },
                    { name: "ProArcher", class: "Archer", isLeader: false }
                ],
                createdAt: new Date(Date.now() - 1800000) // 30 minutes ago
            }
        ];
        
        parties = sampleParties;
        saveParties();
    }
}