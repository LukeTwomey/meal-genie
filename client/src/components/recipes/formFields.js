export default [
  {
    label: "Name",
    name: "name",
    type: "text",
    validationErrorText: "Please enter a name",
  },
  {
    label: "Rating",
    name: "rating",
    type: "number",
    validationErrorText: "Please enter a rating",
  },
  {
    label: "Cooking Time (mins)",
    name: "cookingTime",
    type: "number",
    validationErrorText: "Please enter a cooking time",
  },
  {
    label: "Servings",
    name: "servings",
    type: "number",
    validationErrorText: "Please enter the number of servings",
  },
  {
    label: "Description",
    name: "description",
    type: "text",
    validationErrorText: "Please enter a description",
  },
  {
    label: "Syns",
    name: "syns",
    type: "number",
    validationErrorText: "Please enter the number of syns",
  },
  {
    label: "Ingredients",
    name: "ingredients",
    type: "array",
    buttonText: "Add Ingredient",
    arrayFields: [
      {
        label: "Name",
        name: "name",
        type: "text",
      },
      {
        label: "Quantity",
        name: "quantity",
        type: "number",
      },
      {
        label: "Unit",
        name: "unit",
        type: "select",
        options: ["", "g", "kg", "tsp", "tbsp", "ml", "l"],
      },
    ],
  },
  {
    label: "Method",
    name: "method",
    type: "array",
    buttonText: "Add Step",
    arrayFields: [
      {
        label: "Step",
        name: "step",
        type: "textarea",
      },
    ],
  },
];
