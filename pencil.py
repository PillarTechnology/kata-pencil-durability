class Pencil:
    #for testing
    x = 10
    y = 20

    length = 0
    tip_degradation_mem = 0 # hold the value for sharpening
    tip_degradation = 0 
    eraser_degradation_mem = 0 # hold the value for sharpening
    eraser_degradation = 0

    # length, degradation tip and degredation eraser all have defaults
    def __init__(self, length = 5, degradation_tip = 10, degredation_eraser = 15):
        self.length = length
        self.tip_degradation_mem = degradation_tip
        self.tip_degradation = degradation_tip
        self.degradation_eraser = degredation_eraser
        self.eraser_degradation = degredation_eraser

    def write_to_page(self, words, paper):
        word_to_write = ""
        for c in words:
            if( c == " " or c == "\n"):
                word_to_write += c
            elif(c.isupper()):
                if(self.tip_degradation >= 2):
                    word_to_write += c
                    self.tip_degradation -= 2
                else:
                    word_to_write += " "
            else:
                if(self.tip_degradation >= 1):
                    word_to_write += c
                    self.tip_degradation -=1
                else:
                    word_to_write += " "
        paper.write(word_to_write)
        return word_to_write

    def sharpen(self):
        if(self.length > 0):
            self.length -= 1
            self.tip_degradation = self.tip_degradation_mem


    def erase(self, words, paper):
        st_index =  paper.get_words().rfind(words)
        if(st_index == -1):
            return  -1
        if(st_index == 0):
            first = paper.get_words()[0]
        else:
            first = paper.get_words()[0: st_index - 1 ]

        count = -1
        new_str = list(" " * (len(words) + 1))
        for c in reversed(words):
            print(c)
            if(c == " "):
                new_str[count] = c
                count -= 1
            elif(self.eraser_degradation > 0):
                new_str[count] = " "
                count -= 1
                self.eraser_degradation -= 1
            else:
                new_str[count] = c
                count -= 1
        new_str = ''.join(new_str)
        last = paper.get_words()[st_index + len(words):]
        paper.set_words(first+new_str+last)  
        paper.print_list()