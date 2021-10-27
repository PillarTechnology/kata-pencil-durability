import unittest
from paper import Paper

class TestPaperMethods(unittest.TestCase):

    def test_write_to_paper(self):
        paper1 = Paper()
        words = paper1.write_to_paper("hello")
        self.assertEquals(words, "hello")

    def test_append_words_to_paper(self):
        paper1 = Paper()
        paper1.write_to_paper("hello")
        words = paper1.write_to_paper("bye")
        self.assertEquals(words, "hellobye")