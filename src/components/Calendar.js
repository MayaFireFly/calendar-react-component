import React, {useState} from 'react';
import './Calendar.css';

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const daysInWeek = 7;
    const dayOfEndMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const dayOfStartMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

    const nextMonth = () => {                
        let newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, currentMonth.getDate());
        setCurrentMonth(newDate);        
    };

    const prevMonth = () => {              
        let newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, currentMonth.getDate());
        setCurrentMonth(newDate);        
    };

    const textMonth = (monthNumber) => {
        const monthArr = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        return monthArr[monthNumber];
    };

    const renderDaysOfWeek = () => {
        const daysArr = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        const days = [];
        for(let i = 0; i < daysArr.length; i++){
            days.push(<div key={i + '_dw'} className='calendar-col'>{daysArr[i]}</div>);
        }
        return days;
    };

    const daysInMonth = (dayOfEndMonth) => {
        const days = [];
        for(let i = 0; i < dayOfEndMonth; i++){
            const day = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1);
            days.push(day);
        }        
        return days;
    };

    const emptyDays = (dayOfStartMonth) => {

        if(dayOfStartMonth > 0){                                //1 - Monday                           
            const row = [];            
            for(let i = 0; i < dayOfStartMonth - 1; i++){                               
                const cell = <div key={i + '_db'} className='calendar-col'></div>;
                row.push(cell);
            }
            return row;

        }else if(dayOfStartMonth === 0){                        //0 - Saturday
            const row = [];            
            for(let i = 0; i < 6; i++){                         //6 days of week                              
                const cell = <div key={i + '_db'} className='calendar-col'></div>;
                row.push(cell);
            }
            return row;
        }
    };

    const onDateClick = (elem, daysAll) => {        
        const number = elem.innerHTML;
        const elemCollection = elem.parentNode.children;
        for(let i = 0; i < elemCollection.length; i++){
            elemCollection[i].classList.remove('cell-active');            
        }
        elem.classList.add('cell-active');        
        setSelectedDate(daysAll[number-1]);        
    };

    const renderDays = () => {        
        const days = [];       
        
        const daysAll = daysInMonth(dayOfEndMonth);

        days.push(emptyDays(dayOfStartMonth));        

        let day = 0;                                            //begin of month
        while(day < dayOfEndMonth){
            const row = [];
            
            for(let i = 0; i < daysInWeek; i++){    
                let cell;                
                if (daysAll[day].getDay() === i){                    
                    cell = <div key={day + '_dm'} className='calendar-col clickable' onClick={(e)=>onDateClick(e.target, daysAll)}>{daysAll[day].getDate()}</div>;                    
                }
                row.push(cell);         
            }

            days.push(row);
            day++;
        }
                  
        return days;
    };

    return <div className='calendar-wrapper'>
    <div className='calendar-row calendar-text'>

        <div className='calendar-row'>
            <div onClick={prevMonth} className='clickable w-20'>
              <span className='arrow arrow-left'></span>
            </div>
            <div className='w-60'>{textMonth(currentMonth.getMonth())} {currentMonth.getFullYear()}</div>
            <div onClick={nextMonth} className='clickable w-20'>
              <span className='arrow arrow-right'></span>
            </div> 
        </div> 

        <div className='calendar-row'>
            {renderDaysOfWeek()}
        </div>

        <div className='calendar-row'>
            {renderDays()}
        </div>

        <div className='calendar-row' style={{margin:'1em 0', fontSize:'.8em'}}>
            {selectedDate.toString()}
        </div>

    </div>
    </div>;
};

export default Calendar;