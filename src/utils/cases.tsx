export function toHyphenCase(str: string) {
    return str
        .trim() // Remove any leading/trailing whitespace
        .toLowerCase() // Convert to lowercase
        .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
        .replace(/[^\w-]/g, ''); // Remove any non-word characters except hyphens
}

export function kebabToPascalWithSpaces(kebabStr: string) {
    return kebabStr
        .split('-')                        // Split by hyphen
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // Capitalize each word
        .join(' ');                        // Join words with a space
}