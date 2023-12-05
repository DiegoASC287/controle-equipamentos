import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import br from 'date-fns/locale/pt-BR';
//import { registerLocale, setDefaultLocale } from  "react-datepicker";
//registerLocale('br', br)

interface CalendarioProps{
onChange: (data:any) => void
value: Date | undefined
id: string
legenda: string
}

export default function Calendario(props:CalendarioProps){
    return (
        <div className="flex flex-col flex-grow">
            <label className="text-sm w-full bg-transparent pl-2" >{props.legenda}</label>
            <DateTimePicker 
            clearAriaLabel=""
            clearIcon={null}
            onChange={(date:any) => props.onChange(date)}
            value={props.value}
            id={props.id}
            locale="br"
            calendarIcon={false}/>
            
            </div>
    )
}

