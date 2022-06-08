# procontexthh
[githubpages](https://rdanned.github.io/procontexthh/)


The left panel has a list of Lists with nested lists of some items. Each item has parameters "number" and "color", which can be changed manually. Item is marked as selected with a checkbox.

All selected items are displayed on the right panel in a separate block for each List in the specified quantity as colored squares.

Each individual List block has two states: sorted and shuffled in random order.

Input: 5 sheets of 4 to 10 nested items (arbitrary)

### Requirements

Clicking on a List level checkbox should select all subitems. If all subitems have already been selected, then deselect them. If at least one item is selected, but not all of them, then display a point in parent List checkbox. There must be an ability to change "quantity" parameter of items (the usual input is enough, the value must be >= 0); 
There must be an ability to change "color" parameter of items (input type="color"); 
Sorting and shuffling of Lists separately; All actions on the page must occur without page reload; All changed values must be reactive; Each item must initially have parameters "quantity" and "color" by default (set arbitrary).

### Additionally

Lists in the left panel should collapse and expand; 
When clicking on a square in the right panel, it should be deleted (the "quantity" parameter of the corresponding item should be reduced).
