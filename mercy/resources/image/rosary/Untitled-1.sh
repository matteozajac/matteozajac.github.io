#!/bin/bash

# Loop through all files in the current directory
for file in *; do
    # Check if the file name starts with "rosary_"
    if [[ $file == rosary_* ]]; then
        # Remove the "rosary_" prefix and rename the file
        new_name="${file#rosary_}"
        mv "$file" "$new_name"
        echo "Renamed $file to $new_name"
    fi
done
