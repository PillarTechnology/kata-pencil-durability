class Pencil {
    constructor( { point = 50, size = 0, eraser = 50 } = {}) {
        this.originalPoint = point;
        this.point = point;
        this.size = size;
        this.eraser = eraser;
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
        if (this.size === 0) { 
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
            paper.erased = lastOccurance;
            paper.erasedStack.push(lastOccurance);
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

    edit(wordToAdd, paper) {
        // need to add tracking location for last word erased from paper
        // can add queue for index lcoations of text removed (for multiple edits if needed)
        // will start with just one edit location and then move to adding multiple 
        // can add tracking lcoation to paper since that's where erasing happens
        // need to update erase method to add location to paper object
        // so this method will grab that property off paper
        // then similar to erase, build first part of string, then edit portion, and end part
        // add all back up together at end to create a new string
        // also need to degrade pencil

        // check if there has been anything erased before moving forward with editing
        if (!paper.erased) {
            throw new Error("Nothing has been previously erased to add new text to")
        } else {
            let result = "";
            let editedWord = "";
            const wordLength = wordToAdd.length;
            const firstPart = paper.text.slice(0, paper.erased);
            const editPart = paper.text.slice(paper.erased, paper.erased + wordLength)
            const lastPart = paper.text.slice(paper.erased + wordLength);
            for (let i = 0; i < editPart.length; i++) {
                // if curent index of paper text is whitespace, add current character of wordToAdd to editedWord
                if (editPart[i] === " ") {
                    let current = this.editWrite(wordToAdd[i]);
                    if (!current) {
                        editedWord += editPart[i];
                    } else {
                        editedWord += current;
                    }
                } else {
                    let current = this.editWrite("@");
                    if (!current) {
                        editedWord += editPart[i];
                    } else {
                        editedWord += current;
                    }
                }
            };
        paper.erasedStack.pop();
        if (paper.erasedStack.length === 0) {
            paper.erased = false;
        } else {
            paper.erased = paper.erasedStack[0];
        }
        result += firstPart;
        result += editedWord;
        result += lastPart;
        paper.text = result;
        return paper;
        };
    };

    editWrite(letter) {
        //need to check if capital, lowercase, whitespace
        const pointDull = this.point === 0;

        if (pointDull) {
            return false; //no more writing can be done because out of point value
        } else {
            const currentChar = letter;
            const lowerCase = currentChar.toLowerCase() === currentChar;
            const whiteSpace = currentChar.trim().length !== 0;

            // if lowercase point - 1
            // if uppercase point - 2
            // if whitespace point - 0
            if (lowerCase && whiteSpace) {
                this.point--;
                return letter;
            } else if (!lowerCase && whiteSpace) {
                this.point -= 2;
                return letter;
            } else {
                return letter;
            }
        }
    }
}

module.exports = Pencil;