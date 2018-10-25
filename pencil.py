class Pencil(object):
  def __init__(self, initPoint=100, initEraser=100):
    if type(initPoint) is not int or type(initEraser) is not int or initPoint <= 0 or initEraser <= 0:
      raise TypeError('Pencil point and eraser must be a positive integer.')
    self.point = initPoint
    self.eraser = initEraser
    self.initialStats = {'point': initPoint, 'eraser': initEraser}