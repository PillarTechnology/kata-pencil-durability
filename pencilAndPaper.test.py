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
  def testSharpen(self):
    pencil = Pencil(10)
    pencil.write('Hello World!')
    self.assertEqual(pencil.point, 0)
    pencil.sharpen()
    self.assertEqual(pencil.point, 10)
    pencil.sharpen()
    self.assertEqual(pencil.point, 10)
  def testEraser(self):
    pencil = Pencil()
    pencil.write('Hello World!')
    self.assertEqual(pencil.text, 'Hello World!')
    pencil.erase('Hello')
    self.assertEqual(pencil.text, '      World!')
    pencil.erase('!')
    self.assertEqual(pencil.text, '      World ')
    pencil2 = Pencil(100, 1)
    self.assertEqual(pencil2.eraser, 1)
    pencil2.write('Hi')
    pencil2.erase('Hi')
    self.assertEqual(pencil2.text, ' i')
    self.assertEqual(pencil2.eraser, 0)
    self.assertEqual(pencil2.erase('Hi'), 'Hi was not found on the paper.')
  def testEdit(self):
    pencil = Pencil()
    pencil.write('Hello World!')
    pencil.erase('Hello')
    self.assertEqual(pencil.text, '      World!')
    pencil.edit('hello')
    self.assertEqual(pencil.text, 'hello World!')
    pencil.edit(' w')
    self.assertEqual(pencil.text, 'hello @orld!')

    

if __name__ == '__main__':
  unittest.main()