class Pencil {
    constructor(point, size, eraser) {
        this.point = point || 0;
        this.size = size || 0;
        this.eraser = eraser || 0;
    }

    write(text, paper) {
        // need to add text to paper and degrade pencil point while adding 
        // each character to paper from passed in text, if lowercase degrade by 1 if 
        // uppercase degrade by 2, need to check point before writing each character
        // and if dull need to sharpen (will be added later), if whitespace no degradation
        for (let i = 0; i < text.length; i++) {
            const pointDull = this.point === 0;

            if (pointDull) {
                return paper;
            } else {
                const currentChar = text[i];
                const lowerCase = currentChar.toLowerCase() === currentChar;
                const whiteSpace = currentChar.trim().length !== 0;

                // if lowercase point - 1
                if (lowerCase && whiteSpace) {
                    this.point--;
                    paper.text += currentChar;
                }
                // if uppercase point - 2
                else if (!lowerCase && whiteSpace) {
                    this.point -= 2;
                    paper.text += currentChar;
                }
                // if whitespace point - 0
                else {
                    paper.text += " ";
                }
            }
        }
        return paper;
    }
}

module.exports = Pencil;