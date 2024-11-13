export function toHyphenCase(str: string) {
    return str
        .trim() // Remove any leading/trailing whitespace
        .toLowerCase() // Convert to lowercase
        .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
        .replace(/[^\w-]/g, ''); // Remove any non-word characters except hyphens
}