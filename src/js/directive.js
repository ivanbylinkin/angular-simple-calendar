angular.module('simpleCalendar',[]).directive("simpleCalendar", function() {
	return {
		templateUrl: "templates/simpleCalTemplate.html",
		scope: {
			startDate: "=?startDate",
			endDate: "=?endDate",
			numberOfWeeks: "=?numberOfWeeks"
		},
		link: function(scope,element){
			element.addClass('simple-calendar');
			// define original date variables
			var originalStart = null,
			originalEnd = null;
			// define today
			scope.today = new Date();
			// define starting month
			scope.month = new Date(scope.today);
			// define weeks (calendar will always default to 6 weeks)
			scope.weeks = [];
			// determine first Sunday
			var fSunday = new Date(scope.today);
			fSunday.setDate(-fSunday.getDay()+1);
			// run through days until you finish with a Saturday
			if (!scope.numberOfWeeks){ scope.numberOfWeeks = 6; }
			_buildWeeks(fSunday,scope.numberOfWeeks);
			// set up next/prev month options
			scope.next = function(){
				// set month to the next month
				scope.month.setMonth(scope.month.getMonth()+1);
				// determine the new first Sunday
				fSunday = new Date(scope.month);
				fSunday.setDate(-fSunday.getDay()+1);
				// build the weeks
				_buildWeeks(fSunday,scope.numberOfWeeks);
			};
			scope.previous = function(){
				scope.month.setMonth(scope.month.getMonth()-1);
				fSunday = new Date(scope.month);
				fSunday.setDate(-fSunday.getDay()+1);
				_buildWeeks(fSunday,scope.numberOfWeeks);
			};
			// check if date is today
			scope.isToday = function(day){
				return day.toDateString() == scope.today.toDateString();
			};
			// set up "last updated" variable
			var lastUpdated = null;
			// select start/end date
			scope.selectDateRange = function(day){
				// set new dates
				if (lastUpdated == 'Start Date'){
					if (day < scope.startDate){
						scope.startDate = day;
						lastUpdated = 'Start Date';
					}
					else { 
						scope.endDate = day;
						lastUpdated = 'End Date';
					}
				}
				else {
					scope.startDate = day;
					if (day > scope.endDate){ scope.endDate = null; }
					lastUpdated = 'Start Date';
				}
			};
			// check if date is start date
			scope.isStartDate = function(day){
				if (scope.startDate){ return day.toDateString() == scope.startDate.toDateString(); }
				return false;
			};
			// check if date is end date
			scope.isEndDate = function(day){
				if (scope.endDate){ return day.toDateString() == scope.endDate.toDateString(); }
				return false;
			};
			// check if date is in between start/end dates
			scope.isBetween = function(day){
				if (scope.startDate && day.toDateString() == scope.startDate.toDateString()){ return false; }
				if (scope.endDate && day.toDateString() == scope.endDate.toDateString()){ return false; }
				else if (scope.startDate && scope.endDate){ return day >= scope.startDate && day <= scope.endDate; }
				return false
			};
			// reset date selections
			scope.reset = function(){
				lastUpdated = 'End Date';
				scope.startDate = new Date(originalStart);
				scope.endDate = new Date(originalEnd);
				scope.month = new Date(scope.today);
				// determine the new first Sunday
				fSunday = new Date(scope.month);
				fSunday.setDate(-fSunday.getDay()+1);
				// build weeks
				_buildWeeks(fSunday,scope.numberOfWeeks);
			};
			// keep date filtered
			scope.$watch('startDate', function (newValue){
				if (newValue && new Date(scope.startDateStandard).toDateString() != newValue.toDateString()){ scope.startDateStandard = newValue.toStandardForm(); }
				// keep original date if any
				if (scope.startDate && !originalStart){ originalStart = new Date(scope.startDate); }
			});
			scope.$watch('endDate', function (newValue){
				if (newValue && new Date(scope.endDateStandard).toDateString() != newValue.toDateString()){ scope.endDateStandard = newValue.toStandardForm(); }
				// keep original date if any
				if (scope.endDate && !originalEnd){ originalEnd = new Date(scope.endDate); } 
			});
			scope.$watch('startDateStandard', function (newValue){
				if (newValue && new Date(newValue).toDateString() != scope.startDate.toDateString()){ scope.startDate = new Date(newValue); }
			});
			scope.$watch('endDateStandard', function (newValue){
				if (newValue && new Date(newValue).toDateString() != scope.endDate.toDateString()){ scope.endDate = new Date(newValue); }
			});
			
			function _buildWeeks(start,numberOfWeeks){
				// create a temporary date that will be modified
				var temp = new Date(start);
				// reset the current weeks
				scope.weeks.length = 0;
				// run through and fill the weeks with days
				for (var i=0; i<numberOfWeeks; i++){
					var week = {days:[]};
					for (var j=0; j<7; j++){
						week.days.push(new Date(temp));
						temp.setDate(temp.getDate()+1);
					}
					scope.weeks.push(week);
				}
			}
		}
	};
});

if (!Date.prototype.toStandardForm){
	Date.prototype.toStandardForm = function(){
		return (this.getUTCMonth()+1)+'/'+this.getUTCDate()+'/'+this.getUTCFullYear();
	};
}
