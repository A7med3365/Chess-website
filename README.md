# Project 1

## Technologies used:
- jQuery
- bootstrap


# My Approach

## The chess Board pieces coordinates
## moveing the pieces on the board
asdkl;n
## calculating the moves for each piece

## 

# New things
## formatted String
```
let name = 'Ahmed'

console.log(`Hello ${name}`) // ---> Hello Ahmed
```
## JSDoc
```
/**
     * this will take the position class and return a numbers array of x and y 
     * 
     * @param {String} pos      - the position class, pos-yx
     * @returns {Array<number>} - x and y coordinates, Number type
     */
    getXY : function(pos) {
        //console.log(pos);
        let x = Number(pos[5])
        let y = Number(pos[4])
        return [x,y]
    },
```
![JSDoc hover example](./readme_photos/JSdoc.png)

## Custom Modules
- exporting from the module
![JSDoc hover example](./readme_photos/export.png)
- importing in any script
![JSDoc hover example](./readme_photos/import.png)
# Core functions and features
## Genrating the Board
## 
## Switching turns
## checks
## pinning pieces to the king

## the Roll function

## isCheck function




# Future Work
- Adding Animations: like rotating the board after each turn, draging and droping pieces into places.
- adding checkmates.
- adding en passant rule.
- making the styling responsive for smaller screens.
- adding sounds effects for moving and taking pieces, checks and timeouts.






