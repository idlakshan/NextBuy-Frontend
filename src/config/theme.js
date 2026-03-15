export const theme = {
  colors: {
    primary: {
      light: "#22c55e",
      dark: "#16a34a",
      darker: "#15803d",
      lighter: "#86efac",
      lightest: "#dcfce7",
      bg: "#f0fdf4",
    },
    secondary: {
      light: "#eab308",
      dark: "#ca8a04",
      lighter: "#fde047",
      lightest: "#fef9c3",
      bg: "#fefce8",
    },
    accent: {
      light: "#84cc16",
      dark: "#65a30d",
      darker: "#4d7c0f",
      lighter: "#bef264",
      lightest: "#ecfccb",
    },
    fruit: {
      orange: "#f97316",
      red: "#ef4444",
      purple: "#a855f7",
    },
    gradient: {
      primary: "from-green-500 to-lime-500",
      primaryHover: "from-green-600 to-lime-600",
      secondary: "from-yellow-500 to-orange-500",
      sectionTitle: "from-green-700 via-lime-600 to-yellow-600",
      cardHover: "from-green-500/10 via-lime-500/10 to-yellow-500/10",
      cardBg: "from-green-50 via-lime-50 to-yellow-50",
      decorative: "from-green-200/20 via-lime-200/20 to-yellow-200/20",
      fresh: "from-green-400 to-emerald-500",
      organic: "from-emerald-500 to-teal-500",
    },
    solid: {
      sectionTitle: "text-green-700",
      sectionTitleDark: "text-green-800",
      sectionTitleLight: "text-green-600",
    },
  },
  shadows: {
    sm: "shadow-xs",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    "2xl": "shadow-2xl",
  },
  animations: {
    ping: "animate-ping",
    pulse: "animate-pulse",
    bounce: "animate-bounce",
    shimmer: "animate-shimmer",
  },
};

export const tailwindClasses = {
  badge: {
    default:
      "bg-white/90 backdrop-blur-xs text-gray-800 text-xs font-medium px-3 py-1.5 rounded-full shadow-lg border border-green-100",
    fresh: `bg-linear-to-r ${theme.colors.gradient.fresh} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`,
    organic: `bg-linear-to-r ${theme.colors.gradient.organic} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`,
    discount: `bg-linear-to-r ${theme.colors.gradient.secondary} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`,
  },

  button: {
    floating: `bg-linear-to-r ${theme.colors.gradient.primary} text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`,
    primary: `bg-linear-to-r ${theme.colors.gradient.primary} text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all`,
    secondary: `bg-linear-to-r ${theme.colors.gradient.secondary} text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all`,
  },

  card: {
    container:
      "relative bg-white rounded-2xl shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-green-50",
    imageContainer: `aspect-square flex items-center justify-center bg-linear-to-br ${theme.colors.gradient.cardBg} rounded-xl overflow-hidden`,
    decorativeCircle: `absolute inset-0 bg-linear-to-br ${theme.colors.gradient.decorative} rounded-full scale-0 group-hover:scale-150 transition-transform duration-700 ease-out`,
    underline: `absolute bottom-2 left-1/2 -translate-x-1/2 w-0 group-hover:w-6 h-0.5 bg-linear-to-r from-green-500 to-lime-500 transition-all duration-300 rounded-full`,
    viewIndicator: `text-[8px] font-medium text-white bg-linear-to-r ${theme.colors.gradient.primary} px-1.5 py-0.5 rounded-full shadow-xs`,
  },

  section: {
    title: `text-2xl md:text-3xl font-bold ${theme.colors.solid.sectionTitle}`,
    titleDark: `text-2xl md:text-3xl font-bold ${theme.colors.solid.sectionTitleDark}`,
    titleLight: `text-2xl md:text-3xl font-bold ${theme.colors.solid.sectionTitleLight}`,
    titleGradient: `text-2xl md:text-3xl font-bold bg-linear-to-r ${theme.colors.gradient.sectionTitle} bg-clip-text text-transparent`,
    titleUnderline: `absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-linear-to-r from-green-500 to-lime-500 rounded-full`,
  },

  grocery: {
    priceTag:
      "bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full",
    weightTag: "bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full",
    organicBadge:
      "bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full",
  },
};
