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
    self.assertEqual(pencil.text, '')
    pencil.write('Hello World!')
    self.assertEqual(pencil.point, 0)
    self.assertEqual(pencil.text, 'Hello Wor   ')
    pencil2 = Pencil(10)
    pencil2.write('Hello WoRLD')
    self.assertEqual(pencil2.point, 1)
    self.assertEqual(pencil2.text, 'Hello Wo   ')
    

if __name__ == '__main__':
  unittest.main()