index=2

for filename in ./*.jpg; do
    mv "$filename" "11-$index.jpg"

    index=$((index+1))
    # echo $index
done