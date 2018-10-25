import unittest
from pencilAndPaper import PencilAndPaper as Pencil

class TestPencil(unittest.TestCase):
  def setUp(self):
    pass
  def testMakePencil(self):
    pencil = Pencil()
    self.assertEqual(pencil.point, 100)
    self.assertEqual(pencil.eraser, 100)
    with self.assertRaises(TypeError):
      Pencil(0)
  def testWrite(self):
    pencil = Pencil(10)
    self.assertEqual(pencil.point, 10)
    

if __name__ == '__main__':
  unittest.main()