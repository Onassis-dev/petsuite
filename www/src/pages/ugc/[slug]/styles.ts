type stylesTypes = "modern" | "minimalist" | "friendly";

const defineStyles = (styles: Record<stylesTypes, string>, style: string) => {
  return styles[style as stylesTypes];
};

export function containerStyle(style: string) {
  return defineStyles(
    {
      modern: "w-full max-w-5xl mx-auto px-4 py-8",
      minimalist: "w-full max-w-3xl mx-auto px-4 py-8",
      friendly: "w-full max-w-5xl mx-auto px-4 py-8",
    },
    style
  );
}

export function listStyle(style: string) {
  return defineStyles(
    {
      modern: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6",
      minimalist: "grid grid-cols-1 sm:grid-cols-2 gap-8",
      friendly: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6",
    },
    style
  );
}

export function cardStyle(style: string) {
  return defineStyles(
    {
      modern:
        "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow",
      minimalist:
        "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow",
      friendly:
        "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow",
    },
    style
  );
}

export function buttonStyle(style: string) {
  return defineStyles(
    {
      modern:
        "bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer",
      minimalist:
        "bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer",
      friendly:
        "bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer",
    },
    style
  );
}

export function buttonColor(color: string) {
  return {
    black: "bg-neutral-700! text-white!",
    red: "bg-red-500! text-white!",
    green: "bg-green-500! text-white!",
    blue: "bg-blue-500! text-white!",
    yellow: "bg-yellow-500! text-white!",
    purple: "bg-purple-500! text-white!",
    orange: "bg-orange-500! text-white!",
    pink: "bg-pink-500! text-white!",
  }[color];
}
