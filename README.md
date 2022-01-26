# Comments

The goal of this exercise is to create a commenting application similar to what you'd
find on YouTube or at the end of blog posts and articles.

## Details

Please work on this exercise and send it back within 2 hours of receiving it.  There is one main exercise here
with some bonus features at the end.  You do not have to work on the bonus features.

This project is a basic CRA typescript setup. You can install utility packages to help solve the
problem (e.g. lodash), but keep dependencies to  a minimum and don't use any packatges that almost
entirely solve this exercise.

To run the application:

```
yarn install
yarn run
```

To run the tests:
```
yarn test
```

You can install dependencies into the application using `yarn add`. 

## Requirements

This application has three parts which should be implemented as outlined
in the following sections.

The application does not start off with any data.  All data is input by the user and stored locally
in the application.

### Comment List

This is a list of comments entered into the application.  Each comment should contain the comment
text along with the date and time it was entered.  The comment list should be oriented veritically with
one comment card stacked above the other. Comments should be ordered chronologically with 
older comments at the top of the list and newer comments at the bottom.

The UI can be designed however you'd like - format of the comment list, comments, date and timet, etc. are up to you.
As some guidance, comments should look something like the following:

```
 - - - - - - - - - - - - - - - - 
|                      <Date>   |
|                               |
|     --------------------      |
|    |                    |     |
|    |   <Comment Text>   |     |
|    |                    |     |
|    |____________________|     |
|                               |
|_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _|
```

### Comment Input

This is were users enter comments.  It can live anywhere on the page (above the comment list,
below it, etc.).

The comment input should contain a `textarea` input where the user can type the comment text.
The input component should also contain a submit button which, when clicked, adds the user's new
comment to the comment list and clears the textarea in preparation for the next comment.

The comment input submit button should remain disabled until there is text in the input box.

### Comment Filter

This is a text input which acts as a filter, allowing the user to find all comments which contain
the text string.

The filter input can live anywhere on the page.  The comment filter should include a submit button which,
when clicked, filters the comment list to contain only those comments which match the input string.

The user should be able to return to the unfiltered list of comments by clearing the filter
input and clicking submit.

## Bonus

If you finish all of the requirements within the alloted time and want to do more, here are some
features you might consider implementing.

### Score (like / dislike)

Add a "score" to each comment along with two buttons - one to like the comment and one to dislike it.
Score is a numeric value which starts at 0 for each comment.  Clicking the like button adds 1 to the score,
while clicking the dislike button subtracts 1.  Scores can be negative.

### Live Filtering

Rather than filtering the comment list when the comment filter submit button is clicked, the comment list
should update as the user types the search string in the input.