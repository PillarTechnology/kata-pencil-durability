class Paper:

    def __init__(self):
        self.paper_str = ""

    def write(self, words):
        self.paper_str += words
        return self.paper_str

    def print_list(self):
        print(self.paper_str)
    
    def erase_words(self, words_to_erase):
        # erase the words here

        #return the paper list after words are erased
        return None

    def get_words(self):
        return self.paper_str

    def set_words(self, words):
        self.paper_str = words
        return self.paper_str
