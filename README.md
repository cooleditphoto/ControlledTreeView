# TreeView for Price Preferences
## APIs
This project will use two two API routes:
1. get /items
like the sample data
[{
    id: "0",
    name: "FeatureA",
    children: [
      {
        id: "3",
        name: "Sub-feature-A1"
      },
      {
        id: "4",
        name: "Sub-feature-A2",
        children: [
          {
            id: "5",
            name: "Sub-feature-A2-1",
            price: 50
          },
          {
            id: "6",
            name: "Sub-feature-A2-2",
            price: 25
          },

        ]
      },
      {
        id: "7",
        name: "Sub-feature-A3"
      }
    ]
  },
  {
    id: "1",
    name: "FeatureB",
  },
  {
    id: "2",
    name: "FeatureC"
  }
  ]
2. post /items
{
"selected":[1,2,3,...]
"price": 50
}

## Interface
For the ReactJS interface, it doesn't use the APIs but use a sample data instead, though the code for get/post using AXIOS is written.

## How to run it
first, npm install
then, npm start

