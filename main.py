from paper import Paper
from writer import Writer
from pencil import Pencil

def main():
    #hello this will create the program
    edgar = Writer()
    pencil1 = Pencil()
    paper1 = Paper()
    # writing_str = "hello my name is tyler hello my name is tyler  hello my name is tyler hello my name is tyler hello my name is tyler hello my name is tyler hello my name is tyler hello my name is tyler hello my name is tyler hello my name is tyler"
    print(pencil1.write_to_page("hello"))
    # pencil1.write_to_page(writing_str ,paper1)
    # paper1.print_list()
    print(pencil1.tip_degradation)
    # print(pencil1.length)
    # print(pencil1.degradation_tip)
    # print(pencil1.degredation_eraser)

# if __name__ == "__main__":
#     main()