class Pencil {
    constructor(point, size, eraser) {
        this.originalPoint = point || 50;
        this.point = point || 50;
        this.size = size || 10;
        this.eraser = eraser || 50;
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
                // if uppercase point - 2
                // if whitespace point - 0
                if (lowerCase && whiteSpace) {
                    this.point--;
                    paper.text += currentChar;
                } else if (!lowerCase && whiteSpace) {
                    this.point -= 2;
                    paper.text += currentChar;
                } else {
                    paper.text += " ";
                }
            }
        }
        return paper;
    }

    sharpen() {
        // when pencil is sharpened it regains its orignal durability value
        // pencil length (size property) degrades by 1 when this method is called
        // if pencil is already sharpened will not allow to sharpen again unless current point 
        // is less than original point

        // first check if pencil has any length left to sharpen, if not throw error
        // if already sharpened do not sharpen again
        // sharpen pencil by restoring point back to original point and reduce length by 1

        if (this.length === 0) { 
            throw new Error("Pencil out of length")
        } else if (this.point === this.originalPoint) { 
            throw new Error("Pencil already sharpened")
        } else { 
            this.point = this.originalPoint;
            this.size--;
            return;
        }
    }
}

module.exports = Pencil;