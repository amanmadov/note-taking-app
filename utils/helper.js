module.exports = {
    ifeq: function (a, b, options) {
        if (a === b) {
            return options.fn(this);
        }
        return options.inverse(this);
    },
    substr: function (length, context, options) {
        if (context.length > length) return context.substring(0, length) + "...";
        else return context;
    }
}