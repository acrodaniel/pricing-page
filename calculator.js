// State management
let currentState = {
    plan: 'whiteLabelApp',
    activeUsers: 100,
    appType: 'both',
    addons: new Set()
};

// DOM Elements
const planCards = document.querySelectorAll('.plan-card');
const activeUsersInput = document.getElementById('active-users');
const appTypeSelect = document.getElementById('app-type');
const addonCheckboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');

// Price display elements
const setupFeeElement = document.getElementById('setup-fee');
const monthlyFixedElement = document.getElementById('monthly-fixed');
const usageCostElement = document.getElementById('usage-cost');
const totalMonthlyElement = document.getElementById('total-monthly');

// Calculation functions
function calculateSetupFee() {
    const basePlan = PRICING_DATA.plans[currentState.plan];
    let total = basePlan.setup;

    // Add setup fees from selected addons
    currentState.addons.forEach(addon => {
        if (PRICING_DATA.addons[addon].setup) {
            total += PRICING_DATA.addons[addon].setup;
        }
    });

    return total;
}

function calculateMonthlyFixed() {
    const basePlan = PRICING_DATA.plans[currentState.plan];
    let total = basePlan.monthly;

    // Add monthly fees from selected addons
    currentState.addons.forEach(addon => {
        if (PRICING_DATA.addons[addon].monthly) {
            total += PRICING_DATA.addons[addon].monthly;
        }
    });

    return total;
}

function calculateUsagePerUser() {
    let total = 0;

    // Add base plan rates based on app type
    if (currentState.appType === 'mobile' || currentState.appType === 'both') {
        total += PRICING_DATA.plans[currentState.plan].rates.mobile;
    }
    if (currentState.appType === 'desktop' || currentState.appType === 'both') {
        total += PRICING_DATA.plans[currentState.plan].rates.desktop;
    }

    // Add per-user fees from selected addons
    currentState.addons.forEach(addon => {
        if (PRICING_DATA.addons[addon].usage) {
            total += PRICING_DATA.addons[addon].usage;
        }
    });

    return total;
}

function calculateFirstMonthTotal() {
    const setupFee = calculateSetupFee();
    const monthlyFixed = calculateMonthlyFixed();
    const usagePerUser = calculateUsagePerUser();
    return setupFee + monthlyFixed + (usagePerUser * currentState.activeUsers);
}

function calculateOngoingMonthly() {
    const monthlyFixed = calculateMonthlyFixed();
    const usagePerUser = calculateUsagePerUser();
    return monthlyFixed + (usagePerUser * currentState.activeUsers);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

// Update display
function updatePriceDisplay() {
    const setupFee = calculateSetupFee();
    const monthlyFixed = calculateMonthlyFixed();
    const usagePerUser = calculateUsagePerUser();
    const totalUsage = usagePerUser * currentState.activeUsers;
    const ongoingMonthly = monthlyFixed + totalUsage;

    // Update one-time cost
    document.getElementById('total-setup').textContent = formatCurrency(setupFee);

    // Update monthly costs
    monthlyFixedElement.textContent = formatCurrency(monthlyFixed);
    usageCostElement.textContent = formatCurrency(totalUsage);
    document.getElementById('ongoing-monthly').textContent = formatCurrency(ongoingMonthly);

    // Update usage cost label to show number of users
    usageCostElement.parentElement.firstElementChild.textContent = `Usage Cost (${currentState.activeUsers} users)`;
}

// Event Listeners
planCards.forEach(card => {
    card.addEventListener('click', () => {
        // Update UI
        planCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        
        // Update state
        currentState.plan = card.dataset.plan === 'full' ? 'full' : 'whiteLabelApp';
        
        // Reset addons when switching plans to ensure clean calculation
        currentState.addons.clear();
        addonCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        updatePriceDisplay();
    });
});

activeUsersInput.addEventListener('input', (e) => {
    const value = parseInt(e.target.value) || 1;
    currentState.activeUsers = Math.max(1, value);
    updatePriceDisplay();
});

appTypeSelect.addEventListener('change', (e) => {
    currentState.appType = e.target.value;
    updatePriceDisplay();
});

addonCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        const addonName = e.target.name;
        if (e.target.checked) {
            currentState.addons.add(addonName);
        } else {
            currentState.addons.delete(addonName);
        }
        updatePriceDisplay();
    });
});

// Initialize display
updatePriceDisplay(); 