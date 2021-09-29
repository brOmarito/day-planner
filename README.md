# day-planner
The following project is a Day Planner. The technologies used are JavaScript, HTML, and CSS. The APIs being used are Bootstrap and moment.js. I went ahead and added functionality like adding multiple tasks to an hour slot, being able to clear the hour slot and remove specific tasks in the hour as well. You can also simply click out of the hour slot to save the item as well.

## What was the point
The main point behind this project was to get more practice with JavaScript responding to user input. I added functionality like clicking off, some hover aspects through CSS, and multiple buttons that do various things. I did enjoy the practice on different ways to select the element you want to use. I ended up creating a standard on the ID naming structure that I could then leverage to access the various associated elements.

## Lessons Learned
If I were to do it over, I would go about a path of adding an event listener on the creation of various elements on the page. I'm currently adding an event listener on the parent element which is already there. As I was finishing, I noticed that I already had the element on hand that I could add an event listener to.

## Improvements
* As mentioned before, I would like to add the event listener directly to the task items as well as the icons.
* Taking what I mentioned in the last bullet even further, I would move towards creating the elements through JavaScript on page load since it is not a very heavy page.
* After doing the last improvement, I could assign the event listener to each individual element as opposed to adding the listener the root/parent element and then dealilng with how it would respond through various 'if' statements which can get confusing.
* Clean up the functionality a little more by ensuring that when you click outside of the focused hour slot, the input areas and buttons are hidden.
* Add a button to clear all of the hour slots!

## Snapshot/Link
Link to the deployed application: https://bromarito.github.io/day-planner/index.html

![Snapshot of the deployed application](/assets/pics/snapshot.png)