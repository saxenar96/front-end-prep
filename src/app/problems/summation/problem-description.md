# Summation

Build a component that keeps track of a running sum of numbers entered by the user.

The user should be able to see all of the numbers they have entered. In addition, they should also be able to delete the number, by clicking on it, and have the sum be adjusted by subtracting that value.

# Requirements
- The total sum should be displayed at the top
- There should be an input field (where the user can enter a number) and a Submit button to save the user's input
    - Upon clicking Submit, you should also clear the input
- Each of the numbers should be displayed under the input and button components.
- When the user clicks the number, the number will be deleted and its value should be subtracted from the sum

# Styling Guide
- Each number, when submitted should have the following styles:
    - Background Color: `#eee`
    - Border
        - Width: 1px
        - Style: Solid
        - Color: `#aaa`
        - Radius: 4px
    - Bold font
    - Pointer for cursor