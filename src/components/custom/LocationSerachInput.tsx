import React, { HTMLInputTypeAttribute, InputHTMLAttributes, forwardRef, useMemo, useState } from 'react'
import { Input } from '../ui/input'
import citiesList from '@/lib/cities-list'
import { Button } from '../ui/button'

interface LocationSearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
    onLocationSelected: (Location: string) => void
}

export default forwardRef<HTMLInputElement, LocationSearchInputProps>(function LocationSerachInput({ onLocationSelected, ...props}, ref ) {
    const [locationSearchInput, setLocationSearchinput] = useState('');
    const [open, setOpen] = useState(false);
    const cities = useMemo(() => {
        if (!locationSearchInput.trim()) return [];

        const searchWords = locationSearchInput.split(" ");

        return citiesList
            .map((city) => `${city.name}, ${city.subcountry}, ${city.country}`)
            .filter(
                (city) =>
                    city.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
                    searchWords.every((word) =>
                        city.toLowerCase().includes(word.toLowerCase()),
                    ),
            )
            .slice(0, 5);
    }, [locationSearchInput]);
// console.log('changed', cities)
return (
    <div>
        <Input value={locationSearchInput} onFocus={()=>setOpen(true)} onBlur={()=>setOpen(false)} onChange={(e) => setLocationSearchinput(e.target.value)}  type='search' ref={ref} />
        <div className='h-full w-full rounded-b-lg border'>
            {
                open && cities.map((city) =>
                    <div key={city} className='w-[100%] text-start p-3 shadow-sm hover:bg-muted' onMouseDown={(e) => {
                        e.preventDefault();
                        onLocationSelected(city);
                        setLocationSearchinput('');
                    }
                    }>
                        {city}
                    </div>
                )
        }
        
        </div>
    </div>
)
})
