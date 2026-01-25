# This script is designed to split a whole text into many small pieces by H2 title.
import os

myFiles = os.listdir()
print("Choose a Markdown document that you want to split by assigning a number:")
for i in range(len(myFiles)):
    print(i + 1, myFiles[i])

fileNumber = int(input("Your Choice:"))
fileName = myFiles[fileNumber - 1]
print("File %s chosen!" % fileName)

# Ensure output dir do exists
output_dir = "./sparsed_doc/"
os.makedirs(output_dir, exist_ok=True)

with open(fileName, "r", encoding="utf-8") as myFile:
    outputCount = 0
    fileReader = myFile.readline()
    
    while fileReader:
        # Check H2 title
        if fileReader.startswith("## "):
            print("H2 title detected! Content: %s" % fileReader[3:].strip())
        
        output_filename = os.path.join(output_dir, 
                                      fileName.replace(".md", "") + 
                                      "_sparsed_" + str(outputCount) + ".md")
        myOutputFile = open(output_filename, "w", encoding="utf-8")
        
        # Write H2 title
        myOutputFile.write(fileReader)
        
        fileReader = myFile.readline()
        while fileReader and not fileReader.startswith("## "):
            myOutputFile.write(fileReader)
            fileReader = myFile.readline()
        
        myOutputFile.close()
        outputCount += 1
        

print("Complete! There are %d pieces in total, saved in %s" % (outputCount, output_dir))