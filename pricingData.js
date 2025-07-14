const PRICING_DATA = {
    plans: {
        full: {
            name: 'Full-Featured App',
            setup: 419,
            monthly: 69,
            rates: {
                mobile: 0.12,
                desktop: 0.66
            }
        },
        whiteLabelApp: {
            name: 'White-Label App',
            setup: 3838, // Combined Test Builds ($719) + Production Builds ($3119)
            monthly: 549,
            rates: {
                mobile: 0.12,
                desktop: 0.66
            }
        }
    },
    addons: {
        customButtons: {
            name: 'Custom Buttons on Call Screen',
            setup: 239,
            monthly: 59,
            usage: 0.18
        },
        fullService: {
            name: 'Full-Service (App Store Assist)',
            setup: 719,
            monthly: 59,
            usage: 0
        },
        videoConferencing: {
            name: 'Video Conferencing',
            setup: 499,
            monthly: 299,
            usage: 9.50
        },
        messagingPlatform: {
            name: 'Messaging Platform',
            setup: 999,
            monthly: 389,
            usage: 1.80
        },
        advancedWebview: {
            name: 'Advanced WebView',
            setup: 0,
            monthly: 199,
            usage: 0.10
        }
    }
}; 