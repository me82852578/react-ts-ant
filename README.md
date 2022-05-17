# Quick start

1. Clone repo.
2. `yarn install`
3. `yarn start`

# Part 1

## Purpose

This is a simple front-end code challenge created for 2 purposes:

- Test your basic coding ability
- Give us a better understanding of your skills

## Time

You will have **2 days** to finish this test after you receieve the email. Please send back the link of github repository or codesandbox when you're finished.

## The Task

The programming challenge exists in 2 parts:

- Part 1: Basic Requirements
- [Part 2: Extra Challenges](https://hackmd.io/u_sfOmt1S5uXieCqf-mFow)

### API

You'll need to create a fake API by `miragejs` package, according to the following specifications:

- Method: `GET`
- URL: `/api/properties`
- Description:
  To get all properties in the website.
- Response
  - Data: all properteis
    - Each property will include following fields
      - id: unique id of the property
      - state: State of the property in USA
      - city: City of the property in USA
      - type: The type of the property which including `Apartment`, `Single-family`, `Townhomes`, `Condo`.
      - price: The monthly price for renting the house. the unit is USD.

Example of response:

```json
{
  "data": [
    {
      "id": 1,
      "city": "Attleboro",
      "state": "Georgia",
      "type": "Apartment",
      "price": 218
    },
    {
      "id": 2,
      "city": "Enterprise",
      "state": "Wyoming",
      "type": "Condo",
      "price": 696
    },
    {
      "id": 3,
      "city": "South Hill",
      "state": "Montana",
      "type": "Condo",
      "price": 1190
    }
    // ...
  ]
}
```

### PART 1: Basic Requirements

#### Technical Requirements

- Using `React.js`
- Libraries are not limited, but you will need to use at least one frontend library for style. For example.
  - TypeScript `(recommended)`
  - antd `(recommended)`
  - tailwindcss
  - stlyed-component
  - material
  - bootstrap

#### Feature Requirements

- Because the API may take seconds to finish, so when calling the API, please show the loading page to enhace the UX.
- You will need to make a report page
  - filter all properties in `Georgia` state
  - group by all `state` and `city`
  - each row includes
    - state
    - city
    - total count of the properties in this group
    - average price of the properties in this group

Example

|  State  |   City   | Houses | Avg. Price |
| :-----: | :------: | :----: | :--------: |
| Georgia | Atlanta  |   13   |    630     |
| Georgia | Columbus |   5    |    800     |

# Part 2

## Purpose

This is a simple front-end code challenge created for 2 purposes:

- Test your basic coding ability
- Give us a better understanding of your skills

## Time

You will have 2 days to finish this test after you receieve the email. Please send back the link of github repository or codesandbox when you’re finished.

## The Task

The programming challenge exists in 2 parts:

- [Part 1: Basic Requirements](https://hackmd.io/TxtoF3QlSfqCqGb74LKlag)
- Part 2: Extra Challenges

### PART 2: Extra Challenges

You can choose any of the following requmirements to get extra credits. Try to enrich your original APP (part 1) with these new functions.

#### Technical Requirements

- Using `TypeScript`
- Using `Ant Design` (package `antd`)
- Writing at least an unit test

#### Feature Requirements

- Can filter fields by user's input
  - state
  - city
  - type
  - price range: For example, `500-599`, `600-699`, ..., `1400-1499` are the ranges.
- Dynamic fields to group by
  - In part 1, we hard code the fields to group by state and city. Make it dynamic and let user add fields they want to see the analysis. For example, the user can group data by fields `state` ,`city` and `type`, and result will show
    | State | City | Type | Houses | Avg. Price |
    | :------: | :------: | :-----------: | :-----: | :--------: |
    | Georgia | Atlanta | Apartment | 4 | 550 |
    | Georgia | Atlanta | Single-family | 2 | 630 |
    | Georgia | Atlanta | Townhomes | 3 | 560 |
    | Georgia | Atlanta | Condo | 1 | 560 |
    | Georgia | Columbus | Apartment | ... | ... |
- Can group by price range
  - Provide a price range to group by. For example, `500-599`, `600-699`, ..., `1400-1499` are the ranges.
- Can show color for the price compared to the average price
  - Red: the price is `price >= 120% of average price`
  - Black: the price is `80% of average < price < 120% of average price`
  - Green: the price is `price <= 80% of average price`
