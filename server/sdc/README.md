## Data Shapes

### Products

productID   - integeer
name        - string
price       - float
reviews     - number between 0 and 5
reviewCount - integer


### Stock

id        - integer
productID - foreign key
storeID   - foreign key
color     - array of 6 arrays, each with a string and an image link
size      - array of 6 values, all strings
qty       - integer


### Stores

storeID   - integer
location  - array of 5 values, all strings
