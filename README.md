# Racetimer

A quick react project thrown together to track boat races. Not too exciting, just a timer with results table calculator.

Requires the use of eyeballs at finish line to determine timing.

Allows:

1. Starting boats all at once.
1. Staggered starts
1. Setting the number of boats for a race
1. Results can be saved to localStorage for result calculation/in case of browser crash between races.

# Usage:
```
npm start
```
Should automatically open http://localhost:3000 in browser

# Race Starts

## Group Start

1. Set the number of boats (if starting them all at once)
1. Ctrl-Alt-A to start
1. Ctrl-Alt-[1-9] for when the specified crosses the finish line

## Staggered Start

1. Ctrl-Alt-[1-9] to start a numbered boat.
1. Ctrl-Alt-[1-9] to mark a boat as finished.

# Result tabulation

When all boats have complete the race:

1. Set the race number
1. Click 'save' to save the race as that number in localStorage
1. In the results section set the required race number
1. Click 'load' to view the results.


