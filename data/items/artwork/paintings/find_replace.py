import sys
import re

regex = r"<br>\n"
replaceWith = r"<br>"

with open(sys.argv[1], 'r') as myfile:
    text = myfile.read()

newText = re.sub(regex, replaceWith, text)

with open(sys.argv[1], 'w') as myfile:
    myfile.write(newText)
