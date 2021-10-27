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


    # TODO 
         # pass in Paper instance to write words to paper 
    def write_to_page(self, words):
        words_arr = words.strip().split() # removes white spaces to count words
        
        char_count = len(''.join(words_arr))
        # if all the words can not be fully written
        if(char_count > self.tip_degradation):
            words_to_write = []
            count = 0
            for c in words_arr:

                # code for getting point value for upper / lower case
                # c_points = len(c) + sum(1 for x in c if x.isupper())
                # print("c point" + str(c_points))

                # if the word can be written fully
                if(len(c) < self.tip_degradation):
                    self.tip_degradation -= len(c)
                    count += len(c)
                    words_to_write.append(c)
                # if the word can not be fully written
                else:
                    last_index = self.tip_degradation - len(c)
                    if(last_index == 0):
                        words_to_write.append(c[-1])
                    else:
                        words_to_write.append(c[0 : last_index ])
                        words_to_write.append(" " * ((len(c) - self.tip_degradation) - 1))

                    # paper.write_to_paper(words_to_write)
                    return " ".join(words_to_write)
        # if all the words can be fully written
        else:
            # paper.write_to_paper(words)
            return words
        




   # def write_to_page(self, words, paper):
    #     # create list of words without spaces
    #     no_sp_words_arr = words.strip().split(" ")

    #     no_sp_words = words.strip().replace(" ", "")
    #     if(len(no_sp_words) > self.degradation_tip):
    #         num_words_to_write =  len(no_sp_words) - self.degradation_tip
    #         # " ".join(str(x) for x in L)
    #         spaces = num_words_to_write - 1
    #         words_to_write = words[0 : num_words_to_write + spaces] # this may need to be -1
    #         paper.write_to_paper(words_to_write)
    #         # sharpen_pencil()
    #         words_left_to_write = words[num_words_to_write + 1 :]
    #         write_to_page(words_left_to_write, paper)
    #     else:
    #         self.degradation_tip -= len(no_sp_words)
    #         paper.write_to_paper(words)
            
    #     return paper.paper_list