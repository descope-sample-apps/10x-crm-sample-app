export const styles = {
    mainContainer: "flex min-h-screen flex-col",
    
    // Hero Section
    heroSection: "w-full bg-gradient-to-b from-background to-muted/50 pt-8 pb-2 md:pt-16 md:pb-4",
    heroContainer: "container px-4 md:px-6 max-w-6xl mx-auto",
    heroContent: "flex flex-col items-center text-center space-y-3 md:space-y-4",
    heroTitle: "text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl max-w-[90%] md:max-w-[800px]",
    heroDescription: "text-base md:text-lg lg:text-xl text-muted-foreground max-w-[90%] md:max-w-[800px]",
    githubButton: "w-full sm:w-auto inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 sm:px-8 text-sm font-medium text-white shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 dark:focus-visible:ring-gray-300 group",
    githubButtonContent: "flex items-center gap-2 w-full justify-center",
    githubIcon: "relative h-4 w-4 flex-shrink-0",

    // Main Content Section
    mainSection: "w-full py-6 md:py-12 bg-muted/30",
    contentContainer: "container px-4 md:px-6 max-w-6xl mx-auto",
    mainGrid: "grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10",
    leftColumn: "flex flex-col space-y-6 md:space-y-8",

    // Cards
    card: "border-0 shadow-md overflow-hidden",
    cardAccent: "h-2 w-full bg-[#ddf1f1]",
    cardContent: "p-4 md:p-6",
    cardTitle: "text-xl md:text-2xl font-bold mb-3 md:mb-4",
    cardDescription: "text-sm md:text-base text-muted-foreground mb-3 md:mb-4 leading-relaxed",

    // OAuth Implementation Section
    oauthCardContent: "p-4 pt-2",
    oauthDescription: "text-sm md:text-base text-muted-foreground mb-4",
    oauthSection: "space-y-6",
    oauthItem: "flex items-start gap-3",
    oauthIcon: "h-5 w-5 mt-1 flex-shrink-0 text-[#8cafae]",
    oauthItemContent: "space-y-3",
    oauthItemTitle: "text-base md:text-lg font-semibold",
    oauthItemText: "text-sm md:text-base text-muted-foreground",
    oauthCodeBlock: "mt-2 p-3 bg-muted/50 rounded-md overflow-x-auto",
    oauthCode: "text-[10px] md:text-xs whitespace-pre-wrap",

    // Resource Grid
    resourceGrid: "grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4",
    resourceButton: "w-full h-auto py-5 px-4 flex flex-col items-center justify-between hover:bg-[#f0f7f7] dark:hover:bg-[#1a2727]/20 group",
    resourceIconContainer: "w-12 h-12 rounded-full flex items-center justify-center bg-[#ddf1f1] group-hover:bg-[#c5e0e0] transition-colors",
    resourceIcon: "h-6 w-6 text-[#8cafae] group-hover:text-[#4e5f5f]",
    resourceTitle: "text-base md:text-lg font-semibold mt-2 text-foreground dark:text-white underline md:no-underline group-hover:underline",
    resourceSubtitle: "text-xs text-muted-foreground mt-1",

    // Info Box
    infoBox: "bg-[#f0f7f7] dark:bg-[#1a2727]/30 rounded-lg p-3 mt-2 mb-4 md:mb-6 flex items-start",
    infoIcon: "h-5 w-5 mt-1 flex-shrink-0 text-[#8cafae] mr-2",
    infoText: "text-xs md:text-sm text-muted-foreground",

    // API Cards
    apiCard: "border shadow-sm",
    apiHeader: "pb-3",
    apiTitle: "flex items-center text-lg",
    apiIcon: "mr-2 h-5 w-5 text-[#8cafae]",
    apiContent: "pt-0",
    apiEndpoint: "border rounded-md p-3 text-sm",
    apiEndpointContent: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4",
    apiMethod: "font-medium",
    apiDescription: "text-xs text-muted-foreground mt-1",
    
    // Scope Tags
    scopeContainer: "flex flex-col gap-1.5 sm:min-w-[140px] sm:items-end",
    primaryScope: "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap bg-[#ddf1f1] dark:bg-[#1c2b2b] w-fit",
    optionalScope: "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap bg-[#f0f7f7] dark:bg-[#1c2b2b]/50 w-fit",
    scopeIcon: "h-3 w-3 mr-1 text-[#2c3a3a] dark:text-[#9fbfbf]",
    scopeText: "text-[#2c3a3a] dark:text-[#9fbfbf]",
    optionalScopeIcon: "h-3 w-3 mr-1 text-[#4e5f5f] dark:text-[#8cafae]",
    optionalScopeText: "text-[#4e5f5f] dark:text-[#8cafae]",

    // CTA Section
    ctaSection: "w-full py-6 md:py-8 bg-primary text-primary-foreground",
    ctaContainer: "container px-4 md:px-6 max-w-6xl mx-auto",
    ctaContent: "flex flex-col items-center text-center space-y-3",
    ctaTitle: "text-2xl font-bold tracking-tighter sm:text-3xl max-w-[90%] md:max-w-none",
    ctaDescription: "text-lg md:text-lg max-w-[90%] md:max-w-[800px] opacity-90",
    ctaButtons: "flex flex-col sm:flex-row justify-center gap-3 w-full sm:w-auto",
    ctaButtonPrimary: "w-full sm:w-auto group",
    ctaButtonSecondary: "w-full sm:w-auto bg-transparent border-white text-white hover:bg-white/10",
    ctaArrow: "ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1",

    // Footer
    footer: "border-t py-6 md:py-8",
    footerContainer: "container px-4 md:px-6 max-w-6xl mx-auto",
    footerContent: "flex flex-col items-center justify-center gap-4 text-center",
    footerText: "text-xs md:text-sm text-muted-foreground"
} 