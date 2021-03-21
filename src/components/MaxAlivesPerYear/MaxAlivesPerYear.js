import React from 'react'
import dataPersons from './data/data.json'

const isAlive = (currentYear, {birthYear, deathYear}) => 
    currentYear>=birthYear && currentYear<=deathYear ? 1 : 0;

const getAlivesCountPerYear = (year, persons) => {
    const reducer = (acumAlives,currPerson) => (acumAlives+isAlive(year,currPerson));
    const initialValue = 0;
    return persons.reduce(reducer,initialValue);
}

const getYearsMaxAlives = (alivesPerYears, maxAlives) => {
    const years = alivesPerYears.filter(a=> Number(Object.values(a)) === maxAlives).flatMap(a=> Object.keys(a)).join(', ')
    return years;
}

export const MaxAlivesPerYear = () => {
    const persons = dataPersons.data;

    //se obtiene un arreglo años con valores unico de años basado en las fechas de nacimiento y muerte de la data provista
    const years = [...new Set(persons.flatMap(p => Object.values(p) ).sort())]

    //Se obtiene un arreglo de objetos con la clave del año y como valor la cantidad de vivos en ese año
    let alivesCountPerYears = []
    let maxAlives = 0;
    years.forEach(year => {
        let alivePerYear = {};
        alivePerYear[year] = getAlivesCountPerYear(year, persons);
        alivesCountPerYears.push(alivePerYear);
        //Se calcula la cantidad máxima de vivos de todos los años
        if (alivePerYear[year] > maxAlives) maxAlives = alivePerYear[year];
    })

    //Se obtienen el(los) año(s) donde hubo mas personas vivas
    const yearsMaxAlives =  getYearsMaxAlives(alivesCountPerYears, maxAlives)

    return (
        <div>
            {`En los años ${yearsMaxAlives} hubieron mas personas vivas, en total ${maxAlives}. `}
        </div>
    )
}
