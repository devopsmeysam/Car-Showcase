import { CarProps, FilterProps } from "@/types";
import { type } from "os";

export async function fetchCars (filters: FilterProps) {

    const { manufacturer, year, model, limit, fuel } = filters
    
    const headers = {
        'X-RapidAPI-Key': 'bbe2561424mshf93cb9aa82d2455p1cd922jsna3ae560f5c33',
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }

    // MEYSAM's implementation Starts:
    // const headers = {
    //     "content-type": "application/json",
    //     "authorization": 'MjUwNGU2OTMtNjlmOC00ZWI1LWE2MWEtYzY5NTk1N2YwYmM0',
    //     "partner-token": 'e816538936a7438db63dbd9cc7218dd3'
    // }
    // MEYSAM's implementation Ends:
    
    const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?
    make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`, {
        headers: headers
    })

    const result = await response.json()
    // console.log(result);
    return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age
  
    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
  
    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  
    return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    
    const url = new URL("https://cdn.imagin.studio/getimage");
    
    // MEYSAM's implementation Starts:
    // const url = new URL('http://api.carmd.com/v3.0/decode?')
    // MEYSAM's implementation Ends:

    const { make, year, model } = car;

    url.searchParams.append('customer', '*');
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(' ')[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    url.searchParams.append('angle', `${angle}`);
    // console.log(url);
    return `${url}`;
}

export const updateSearchParams = (type: string, value: string) => {
    
    const searchParams = new URLSearchParams(window.location.search)

    searchParams.set(type, value)

    const newPathName = `${window.location.pathname}?${searchParams.toString()}`

    return newPathName
}