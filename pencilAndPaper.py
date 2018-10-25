class PencilAndPaper(object):
  def __init__(self, initPoint=100, initEraser=100, initText=''):
    if type(initPoint) is not int or type(initEraser) is not int or initPoint <= 0 or initEraser <= 0:
      raise TypeError('Pencil point and eraser must be a positive integer.')
    self.point = initPoint
    self.eraser = initEraser
    self.text = initText
    self.initialStats = {'point': initPoint, 'eraser': initEraser, 'text': initText}
  def write(self, msg):
    if type(msg) is not str:
      try:
        msg = str(msg)
      except TypeError:
        print('Unexpected message type.')
    chars = list(msg)
    for char in chars:
      if char == ' ':
        self.text += char
      elif char.isupper():
        if self.point > 1:
          self.text += char
          self.point -= 2
        else:
          self.text += ' '
      elif self.point > 0:
        self.text += char
        self.point -= 1
      else:
        self.text += ' '
  def sharpen(self):
    self.point = self.initialStats['point']