class PencilAndPaper(object):
  def __init__(self, initPoint=100, initEraser=100, initText=''):
    if type(initPoint) is not int or type(initEraser) is not int or initPoint <= 0 or initEraser <= 0:
      raise TypeError('Pencil point and eraser must be a positive integer.')
    self.point = initPoint
    self.eraser = initEraser
    self.text = initText
    self.editPoint = None
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
  def erase(self, text):
    if type(text) is not str:
      try:
        text = str(text)
      except TypeError:
        print('Unexpected text type.')
    if text not in self.text:
      return '{} was not found on the paper.'.format(text)
    else:
      index = self.text.rfind(text)
      self.editPoint = index
      arr = list(self.text)
      i = len(text)
      while i > 0 and self.eraser > 0:
        arr[index] = ' '
        index += 1
        self.eraser -= 1
        i-=1
      self.text = ''.join(arr)
  def edit(self, msg):
    if type(msg) is not str:
      try:
        msg = str(msg)
      except TypeError:
        print('Unexpected message type.')
    chars = list(msg)
    arrStr = list(self.text)
    for char in chars:
      x = char
      if arrStr[self.editPoint] is not ' ':
        x = '@'
      if char.isupper():
        if self.point > 1:
          arrStr[self.editPoint] = x
          self.point -= 2
          self.editPoint += 1
        else:
          self.text += ' '
          self.editPoint += 1
      elif self.point > 0:
        arrStr[self.editPoint] = x
        self.point -= 1
        self.editPoint += 1
      else:
        self.editPoint += 1
      self.text = ''.join(arrStr)

