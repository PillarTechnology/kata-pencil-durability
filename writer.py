from pencil import Pencil

class Writer:
    def __init__(self, name = "Edgar"):
        self.name = name
        self.pencils = []
        self.pencils.append(Pencil()) # append the default pencil

    # uses a number to pick a pencil
    def pick_a_pencil(self, num):
        return self.pencils[num]

    