module.exports = {
    ifeq: function (a, b, options) {
        if (a === b) return options.fn(this);
        return options.inverse(this);
    },
    substr: function (length, context, options) {
        if (context.length > length) return context.substring(0, length) + "...";
        return context;
    },
    isLongBody: function (length, context, options) {
        if (context.length > length) return options.fn(this);
        return options.inverse(this);
    },
    randomColor: function () {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return `#${randomColor}`;
    },
    inc: function (value, options) {
        return parseInt(value) + 1;
    }
}