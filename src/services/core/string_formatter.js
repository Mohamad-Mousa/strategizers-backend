class StringFormatter {

    static escapeSpecialChars(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    static escapeBackslashAndPlus(str) {
        return str.replace(/\\|\+/g, '\\$&');
    }

    static slugify(str) {
        str = StringFormatter.escapeSpecialChars(str);
        str = StringFormatter.escapeBackslashAndPlus(str);
        str = str.replace(/[^a-z0-9]+/gi, '-');
        str = str.replace(/^-|-$/g, '');
        return str.toLowerCase();
    }
}

module.exports = StringFormatter;