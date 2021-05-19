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

    erase(wordToErase, paper) {
        // need to find the last occurance of the word that will be erased within the passed in paper
        // need to check eraser value before erasing any characters
        // if eraser out of value stop erasing and return
        // else erase letter by letter and replace with whitespace and -1 from eraser value each step
        // cannot change input so need to rebuild string around the word that will be erased
        // get first half of text before word to erase
        // get second half of text after word to erase
        // erase as much as possible of word that eraser will allow
        // bulid return text back by adding first half, erased word, second half together

        let result = "";
        let erasedWord = "";
        const lastOccurance = paper.text.lastIndexOf(wordToErase);
        const wordLength = wordToErase.length;
        const firstHalf = paper.text.slice(0,lastOccurance);
        const secondHalf = paper.text.slice(lastOccurance + wordLength)

        if (!paper.text.includes(wordToErase)) {
            throw new Error ("Word to erase is not located within given paper");
        } else if (this.eraser === 0) {
            throw new Error ("No more eraser left! Time to get a new pencil!");
        } else {

            for (let i = 0; i < wordLength; i++) {
                if (this.eraser !== 0) {
                    erasedWord += " ";
                    this.eraser--;
                } else {
                    erasedWord += wordToErase[i];
                }
            }
        }
        result += firstHalf;
        result += erasedWord;
        result += secondHalf;
        paper.text = result;
        return paper;
    }
}

module.exports = Pencil;