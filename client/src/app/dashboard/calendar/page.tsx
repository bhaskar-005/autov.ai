"use client"
import PageContent from '@/components/dashboard_ui/pagecontent';
import {
  Calendar,
  CalendarCurrentDate,
  CalendarDayView,
  CalendarMonthView,
  CalendarNextTrigger,
  CalendarPrevTrigger,
  CalendarTodayTrigger,
  CalendarWeekView,
} from '@/components/ui/full-calendar';
import { addHours } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Page() {
  return (
    <PageContent 
     title='Calendar view' 
     description={<p className="text-xs text-gray-600">See Your Scheduled Content</p>}>
    <Calendar
      view="year"
      events={[
        {
          id: '1',
          start: new Date(),
          end: addHours(new Date(), 2),
          title: 'event A',
          color: 'pink',
        },
        {
          id: '2',
          start: addHours(new Date(), 1),
          end: addHours(new Date(), 3),
          title: 'event B',
          color: 'blue',
        },
      ]}
    >
      <div className="h-[80vh] overflow-hidden flex flex-col">
        <div className="flex px-6 items-center gap-2 mb-6">
          {/* <CalendarCurrentDate /> */}
         
          <CalendarPrevTrigger>
            <ChevronLeft size={20} />
            <span className="sr-only">Previous</span>
          </CalendarPrevTrigger>

          <CalendarTodayTrigger>Today</CalendarTodayTrigger>

          <CalendarNextTrigger>
            <ChevronRight size={20} />
            <span className="sr-only">Next</span>
          </CalendarNextTrigger>

        </div>

        <div className="flex-1 px-6 overflow-x-hidden">
        <CalendarDayView />
        </div>
      </div>
    </Calendar>
    </PageContent>
  );
}