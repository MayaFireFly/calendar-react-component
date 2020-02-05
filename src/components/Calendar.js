import React, {useState} from 'react';

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
            days.push(<div key={i + '_dw'} style={{width:'calc(100%/7)'}}>{daysArr[i]}</div>);
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
                const cell = <div key={i + '_db'} style={{width:'calc(100%/7)'}}></div>;
                row.push(cell);
            }
            return row;

        }else if(dayOfStartMonth === 0){                        //0 - Saturday
            const row = [];            
            for(let i = 0; i < 6; i++){                         //6 days of week                              
                const cell = <div key={i + '_db'} style={{width:'calc(100%/7)'}}></div>;
                row.push(cell);
            }
            return row;
        }
    };

    const onDateClick = (elem, daysAll) => {        
        const number = elem.innerHTML;
        const elemCollection = elem.parentNode.children;
        for(let i = 0; i < elemCollection.length; i++){
            elemCollection[i].style.backgroundColor = 'white';
            elemCollection[i].style.color = 'black';
        }
        elem.style.backgroundColor = 'blue';
        elem.style.color = 'white';        
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
                    cell = <div key={day + '_dm'} style={{width:'calc(100%/7)', cursor:'pointer'}} onClick={(e)=>onDateClick(e.target, daysAll)}>{daysAll[day].getDate()}</div>;                    
                }
                row.push(cell);         
            }

            days.push(row);
            day++;
        }
                  
        return days;
    };

    return <div style={{maxWidth:'10em', height:'auto', fontWeight:'normal', margin:'1em auto'}}>
    <div style={{color:'black', fontWeight:'bolder', textAlign:'center', margin:'0', padding:'0', display:'flex', flexDirection:'row', flexWrap:'wrap', width:'100%'}}>

        <div style={{margin:'0', padding:'0', display:'flex', flexDirection:'row', flexWrap:'wrap', width:'100%'}}>
            <div onClick={prevMonth} style={{cursor:'pointer', width:'30%'}}>
              <span style={{display:'inline-block', width:'1.5em', height:'1.5em', borderTop:'1px solid #000', borderRight:'1px solid #000', transform:'rotate(225deg)'}}></span>
            </div>
            <div style={{width:'40%'}}>{textMonth(currentMonth.getMonth())} {currentMonth.getFullYear()}</div>
            <div onClick={nextMonth} style={{cursor:'pointer', width:'30%'}}>
              <span style={{display:'inline-block', width:'1.5em', height:'1.5em', borderTop:'1px solid #000', borderRight:'1px solid #000', transform:'rotate(45deg)'}}></span>
            </div> 
        </div> 

        <div style={{margin:'0', padding:'0', display:'flex', flexDirection:'row', flexWrap:'wrap', width:'100%'}}>
            {renderDaysOfWeek()}
        </div>

        <div style={{margin:'0', padding:'0', display:'flex', flexDirection:'row', flexWrap:'wrap', width:'100%'}}>
            {renderDays()}
        </div>

        <div style={{margin:'1em 0', padding:'0', display:'flex', flexDirection:'row', flexWrap:'wrap', width:'100%', fontSize:'.8em'}}>
            {selectedDate.toString()}
        </div>

    </div>
    </div>;
};

export default Calendar;