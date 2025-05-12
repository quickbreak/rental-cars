import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
  startDate: string;
  endDate: string;
  onDateChange: (startDate: string, endDate: string) => void;
  unavailableDates?: Array<{ start: string; end: string }>;
}

const DatePicker = ({ 
  startDate, 
  endDate, 
  onDateChange,
  unavailableDates = []
}: DatePickerProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectingStart, setSelectingStart] = useState(true);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const startDateObj = startDate ? new Date(startDate) : null;
  const endDateObj = endDate ? new Date(endDate) : null;

  // Function to check if a date is unavailable
  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(range => {
      const rangeStart = new Date(range.start);
      const rangeEnd = new Date(range.end);
      return date >= rangeStart && date <= rangeEnd;
    });
  };

  // Get the days in the current month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());

  // Generate the days for the calendar
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null); // Empty cells for days before the 1st of the month
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
  }

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Format date for display
  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Format date for API
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  // Check if a date is the selected start date
  const isStartDate = (date: Date) => {
    return startDateObj && 
      date.getDate() === startDateObj.getDate() && 
      date.getMonth() === startDateObj.getMonth() && 
      date.getFullYear() === startDateObj.getFullYear();
  };

  // Check if a date is the selected end date
  const isEndDate = (date: Date) => {
    return endDateObj && 
      date.getDate() === endDateObj.getDate() && 
      date.getMonth() === endDateObj.getMonth() && 
      date.getFullYear() === endDateObj.getFullYear();
  };

  // Check if a date is in the range between start and end
  const isInRange = (date: Date) => {
    if (!startDateObj || !endDateObj) return false;
    return date > startDateObj && date < endDateObj;
  };

  // Check if a date is in the hover range
  const isInHoverRange = (date: Date) => {
    if (!startDateObj || !hoverDate || endDateObj) return false;
    return date > startDateObj && date <= hoverDate;
  };

  // Check if a date is in the past
  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Handle date click
  const handleDateClick = (date: Date) => {
    if (isPastDate(date) || isDateUnavailable(date)) return;
    
    if (selectingStart || !startDateObj) {
      onDateChange(formatDate(date), '');
      setSelectingStart(false);
    } else {
      if (date < startDateObj) {
        // If end date is before start date, swap them
        onDateChange(formatDate(date), formatDate(startDateObj));
      } else {
        onDateChange(startDate, formatDate(date));
      }
      setSelectingStart(true);
    }
  };

  // Handle mouse over on date
  const handleDateHover = (date: Date) => {
    if (!selectingStart && startDateObj && date > startDateObj) {
      setHoverDate(date);
    }
  };

  // Reset hover state
  const handleMouseLeave = () => {
    setHoverDate(null);
  };

  return (
    <div className="rounded-lg bg-white shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Calendar size={20} className="text-blue-700" />
          <h3 className="font-medium">Select Dates</h3>
        </div>
        <div className="text-sm text-gray-600">
          {selectingStart ? 'Select start date' : 'Select end date'}
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-1 rounded-full hover:bg-gray-100"
          aria-label="Previous month"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="font-medium">{formatMonth(currentMonth)}</div>
        <button
          onClick={nextMonth}
          className="p-1 rounded-full hover:bg-gray-100"
          aria-label="Next month"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
        
        {days.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className="h-9" />;
          }
          
          const isStart = isStartDate(day);
          const isEnd = isEndDate(day);
          const inRange = isInRange(day);
          const inHoverRange = isInHoverRange(day);
          const isPast = isPastDate(day);
          const isUnavailable = isDateUnavailable(day);
          
          let className = "h-9 w-9 mx-auto flex items-center justify-center text-sm rounded-full ";
          
          if (isStart || isEnd) {
            className += "bg-blue-700 text-white ";
          } else if (inRange || inHoverRange) {
            className += "bg-blue-100 text-blue-800 ";
          } else {
            className += "hover:bg-gray-100 ";
          }
          
          if (isPast || isUnavailable) {
            className += "text-gray-400 line-through cursor-not-allowed ";
          } else {
            className += "cursor-pointer ";
          }
          
          return (
            <div 
              key={day.toString()} 
              className="py-1"
            >
              <button
                onClick={() => handleDateClick(day)}
                onMouseOver={() => handleDateHover(day)}
                onMouseLeave={handleMouseLeave}
                className={className}
                disabled={isPast || isUnavailable}
              >
                {day.getDate()}
              </button>
            </div>
          );
        })}
      </div>
      
      {startDate && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between text-sm">
            <div>
              <div className="text-gray-600">Pick-up</div>
              <div className="font-medium">
                {startDateObj?.toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
            </div>
            {endDate && (
              <div className="text-right">
                <div className="text-gray-600">Drop-off</div>
                <div className="font-medium">
                  {endDateObj?.toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;