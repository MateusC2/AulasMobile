import React, {useState} from "react";
import {View, Button} from "react-native"
import DateTimePicker from "react-native-modal-datetime-picker"

const DateTimePickero = ({type, buttonTitle, dateKey, setValue}) =>{

    const [isDatePickerVisable, setDatePickerVisibility] = useState(false);

    const showDatePicker = ()=>{
        setDatePickerVisibility(true);
    }

    const hideDatePicker = ()=>{
        setDatePickerVisibility(false);
    }

    const handleConfirm = (date) =>{
        if(type === "time"){
            const hour = date.getHours();
            const minute = date.getMinutes();
            const formattedTime = `${hour}:${minute}`;
            setValue((prevState)=>({
                ...prevState,
                [dateKey]:formattedTime
            }))
        }
        else {
            setValue((prevState)=>({
                ...prevState,
                [dateKey]:date, // date:AAAA:MM:DD
            }))
        }
        hideDatePicker();
    }

    return(
        <View>
            <Button title={buttonTitle} onPress={showDatePicker}/>
            <DateTimePicker
            isVisible={isDatePickerVisable}
            mode={type}
            locale="pt-BR"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            textColor="#000"
            />
        </View>
    )
};

export default DateTimePickero;