import unittest
from pencil import Pencil

class TestPencil(unittest.TestCase):
  def setUp(self):
    pass
  def makePencil(self):
    pencil = Pencil()
    self.assertEqual(pencil.point, 100)
    self.assertEqual(pencil.eraser, 100)

if __name__ == '__main__':
  unittest.main()