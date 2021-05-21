class Paper {
    constructor(text) {
        this.text = text || "";
        this.erased = false;
        this.erasedStack = [];
    }
}

module.exports = Paper;