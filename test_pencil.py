import unittest
from pencil import Pencil
from paper import Paper
from writer import Writer

class TestPencilMethods(unittest.TestCase):

    def test_pencil_creation(self):
        length = 5
        degradation_tip = 20
        degredation_eraser = 10

        pencil1 = Pencil(length, degradation_tip, degredation_eraser)
        self.assertEquals(pencil1.length, 5)
        self.assertEquals(pencil1.tip_degradation, 20)
        self.assertEquals(pencil1.degradation_eraser, 10)

# the pencil has a limited number of characters it can write
    # also tests -1 tip degradation for lower case
    def test_pencil_tip_degradation(self):
        pencil1 = Pencil(degradation_tip=4)
        words = "hello"
        paper1 = Paper()
        return_words = pencil1.write_to_page(words)
        self.assertEquals(len("".join(return_words.split())), 4) # test that the return word did not complete
    
# writing spaces and new lines expends no graphite
    # test that spaces expends no graphite
    def test_pencil_spaces_expends_no_graphite(self):
        pencil1 = Pencil(degradation_tip=4)
        words = "h e l l o"
        paper1 = Paper()
        return_words = pencil1.write_to_page(words)
        self.assertEquals("h e l l".strip(), return_words.strip()) 

    # test that new lines expends no graphite
    def test_pencil_spaces_expends_no_graphite(self):
        pencil1 = Pencil(degradation_tip=4)
        words = "he\nllo\n"
        paper1 = Paper()
        return_words = pencil1.write_to_page(words)
        self.assertEquals("he\nllo\n", return_words.strip()) # this is failing as we aren't keeping track of \n

# the pencil writes spaces when it runs out
    # test that the pencil writes spaces when it runs out of graphite
    def test_pencil_writes_white_spaces(self):
        pencil1 = Pencil(degradation_tip=4)
        words = "hello"
        paper1 = Paper()
        return_words = pencil1.write_to_page(words)
        self.assertEquals("hell ", return_words)

# the upper case letter degrades the pencil by 2 point
    # test that upper case letters degrade by 2 points
    def test_upper_case_degrade_by_2(self):
        pencil1 = Pencil(degradation_tip=4)
        words = "Hello"
        paper1 = Paper()
        return_words = pencil1.write_to_page(words)
        self.assertEquals("Hel".strip(), return_words.strip())

# a pencil can be sharpened
    # test that the pencil has a sharpen method


# a pencil can only be sharpened a (small) certain number of times
    # test that the pencil has a limited number of times it can be sharpened

# the pencil's length is reduced by one each time it is sharpened
    # test that the pencil reduces by one each sharpen

# when the length is zero it no longer restores it's point durability
    # test that the pencil can not be resharpened when sharpened too many times

# ERASER
# i want to be able to erase peviously written text
# when the pencil erases text it erases the last occurrence of that text on the paper and replaces it with empty spaces
    # possible tests
        # Given a piece of the paper containing the string:
        # "How much wood would a woodchuck chuck if a woodchuck could chuck wood?"
        # when the string "chuck" is erased, the paper should read:
        # "How much wood would a woodchuck chuck if a woodchuck could       wood?"
        # and if the string "chuck" is erased again, the paper should read:
        # "How much wood would a woodchuck chuck if a wood      could       wood?"

#Eraser degradation
    # when a pencil is created it CAN BE provided with a value for eraser durability. 
    # All characters except for white spce should degrade by a value of one
    # Text is erased in the opposite order it is written




# if __name__ == '__main__':
#     unittest.main()