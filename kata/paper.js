class Paper {
    constructor(text) {
        this.text = text || "";
        this.erased = false;
        this.erasedQueue = [];
    }
}

module.exports = Paper;