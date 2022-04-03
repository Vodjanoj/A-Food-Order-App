// import React, { useState, useEffect, useCallback } from "react";
// import classes from "./AvailableMeals.module.css";
// import MealItem from "./MealItem/MealItem";
// import Card from "../UI/Card";

// // const DUMMY_MEALS = [
// //   {
// //     id: "m1",
// //     name: "Sushi",
// //     description: "Finest fish and veggies",
// //     price: 22.99,
// //   },
// //   {
// //     id: "m2",
// //     name: "Schnitzel",
// //     description: "A german specialty!",
// //     price: 16.5,
// //   },
// //   {
// //     id: "m3",
// //     name: "Barbecue Burger",
// //     description: "American, raw, meaty",
// //     price: 12.99,
// //   },
// //   {
// //     id: "m4",
// //     name: "Green Bowl",
// //     description: "Healthy...and green...",
// //     price: 18.99,
// //   },
// // ];

// const AvailableMeals = () => {
//   const [meals, setMeals] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchMealsHandler = useCallback(async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(
//         "https://react-http-3f161-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
//       );

//       if (!response.ok) {
//         throw new Error("Something went wrong!");
//       }

//       const data = await response.json();

//       const loadedMeals = [];

//       for (const key in data) {
//         loadedMeals.push({
//           id: key,
//           name: data[key].name,
//           description: data[key].description,
//           price: data[key].price,
//         });
//       }

//       setMeals(loadedMeals);
//     } catch (error) {
//       setError(error.message);
//     }
//     setIsLoading(false);
//   }, []); // This function though has no external dependencies. The fetch API is a global browser API, it's not a dependency and other than that
//   // we are not using anything special in here. These state updating functions as you learned don't need to be added as dependencies
//   // because react guarantees that they will never change.

//   useEffect(() => {
//     fetchMealsHandler();
//   }, [fetchMealsHandler]); // You also learned that it is a good practice and the best practice
//   // to list all dependencies you use inside of the effect function here in the dependencies array, if [] empty then the useEffect
//   // runs only one time - first time when the component renders. If fetchMealsHandler changes this useEffect should be re-executed,
//   // and this function fetchMealsHandler could change if we would be using some external state in there,
//   // we aren't doing that in this example but in other example we could be doing that!!! So, we definitely wanna list this function
//   // fetchMealsHandle, a pointer at this function as a dependency of this effect. FetchMealsHandler is an object - function so we wrap it with Callback

//   if (isLoading) {
//     return (
//       <section className={classes.MealsLoading}>
//         <p>Loading..</p>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className={classes.MealsError}>
//         <p>{error}</p>
//       </section>
//     );
//   }

//   const mealsList = meals.map((meal) => (
//     <MealItem
//       id={meal.id}
//       key={meal.id}
//       name={meal.name}
//       description={meal.description}
//       price={meal.price}
//     ></MealItem>
//   ));

//   return (
//     <section className={classes.meals}>
//       <Card>
//         <ul>{mealsList}</ul>
//       </Card>
//     </section>
//   );
// };

// export default AvailableMeals;

// this option below is just another variant when fetchMealsHandler function is located in the useEffect, and it gets
// triggered also there once a component renders at the first time only as there no dependencies are specified

import React, { useState, useEffect } from "react";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMealsHandler = async () => {
      const response = await fetch(
        "https://react-http-3f161-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMealsHandler().catch((error) => {
                           // fetchMealsHandler is async function and therefore it always returns a promise so we can use .catch .
      setIsLoading(false); //  if we throw an error inside of a promise that error will cause that promise to reject.
      setError(error.message);
    });
  }, []); // there's are dependencies here as we launch useEffect only once when a comeponent renders first time

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading..</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.MealsError}>
        <p>{error}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    ></MealItem>
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
