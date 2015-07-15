# angular-simple-calendar

## A Simple Date-Range Calendar

After searching the web for a nice looking simple date range calendar and coming up empty I made my own.<br>
This is meant to be easily modifiable and used as either a complete product or a boiler plate.

## Small Simple Demp

<a href="http://ivanbylinkin.github.io/">A Small Demo</a>

## Dependencies

Simple Calendar requires Additional Code<br>
Angular JS - download <a href="https://angularjs.org/">here</a><br>
Font Awesome - download <a href="http://fortawesome.github.io/">here</a><br>
Bootstrap - download <a href="http://getbootstrap.com/">here</a> (only needed for 2 classes, "form-group" and "form-control")

## Included Parts

I've included the basics.
<ul>
  <li>A Basic CSS File</li>
  <li>A Template (can be modified)</li>
  <li>The Angular JS Directive</li>
</ul>

## Basic Usage
You can initialize simple calendar in all 3 angular ways.
```javascript
// you can initialize by creating a simple-calendar tag
<simple-calendar></simple-calendar>

// you can initialize by adding simple-calendar as an attribute to a div
<div simple-calendar></div>

// you can initialize by adding simple-calendar as a class to a div
<div class="simple-calendar"></div>
```
You can also pass in a few options
```javascript
// you can specify a few options
<div simple-calendar number-of-weeks="6" start-date="startDate" end-date="endDate"></div>
```
Option  | Description
------------- | -------------
number-of-weeks  | any positive integer (defaults to 6)
start-date  | the $scope variable you want to write the selected start date to
end-date  | the $scope variable you want to write the selected end date to
