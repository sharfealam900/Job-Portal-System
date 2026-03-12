import React, { useState } from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useDispatch } from "react-redux"
import { setSearchedQuery } from "../redux/jobSlice"

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["10k to 40k", "50k to 90k", "1Lac to 10Lac"]
  },
]

const Filtercard = () => {

  const dispatch = useDispatch()

  const [location, setLocation] = useState("")
  const [industry, setIndustry] = useState("")
  const [salary, setSalary] = useState("")

  const changeHandler = (value, type) => {

    if (type === "Location") {
      setLocation(value)
    }

    if (type === "Industry") {
      setIndustry(value)
    }

    if (type === "Salary") {
      setSalary(value)
    }

    dispatch(setSearchedQuery(value))
  }

  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />

      {filterData.map((data) => (
        <div key={data.filterType} className="mt-4">

          <h1 className='font-bold text-lg'>
            {data.filterType}
          </h1>

          <RadioGroup
            value={
              data.filterType === "Location"
                ? location
                : data.filterType === "Industry"
                  ? industry
                  : salary
            }
            onValueChange={(value) =>
              changeHandler(value, data.filterType)
            }
          >
            {data.array.map((item) => (
              <div
                key={item}
                className='flex items-center space-x-2 my-1'
              >
                <RadioGroupItem value={item} />
                <label>{item}</label>
              </div>
            ))}
          </RadioGroup>

        </div>
      ))}
    </div>
  )
}

export default Filtercard