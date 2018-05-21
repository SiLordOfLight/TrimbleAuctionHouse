template=$(cat 1.json)

for (( i = 2; i <= 98; i++ )); do
    #statements
    echo "$template" > $i.json
done