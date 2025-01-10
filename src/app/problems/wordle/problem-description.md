# Wordle

Build a clone of Wordle.

![](https://www.greatfrontend.com/img/questions/wordle/wordle-example.png)

# Requirements
Be familiar with the rules of Wordle. You can read the [rules on Wikipedia](https://en.wikipedia.org/wiki/Wordle) and [try out the game](https://www.nytimes.com/games/wordle/index.html) for yourself on New York Times.

For practice sake, we'll implement Wordle with the following differences:
- Wordle has a global word of the day and can only be played once per day which complicates development. For our Wordle, a random word is chosen every time the app launches. Some five-letter words are provided to you in the skeleton.
- No need to validate if a guess is a valid 5-letter word.
- Add a "Reset" button that's displayed after the game ends so that the user can play again with another randomly-chosen word.

Wordle's colors should you choose to use them:
- Default (Light Gray): `#d3d6da`
- Correct (Green): `#6aaa64`
- Present (Yellow): `#c9b458`
- Absent (Dark Gray): `#787c7e`