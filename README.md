# vue-chart-js-ui-form

A dynamic Vue.js component that allows users to generate Chart.js configurations through an interactive form. This project provides an easy-to-use UI for creating custom chart configurations and viewing the corresponding JSON data for Chart.js charts.

## Features

- **Dynamic Chart Configuration:** Users can fill out a form to define `chartData` and `chartOptions`.
- **Live Chart Rendering:** Chart updates automatically based on form inputs.
- **JSON Output:** Real-time JSON representation of the chart configuration.
- **Modular Components:** Designed with reusable Vue.js components for easy integration.

Live Demo:-> https://dailyfoodserve.com/chartjs/

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hemant-rao/vue-chartjs-ui-form.git
   cd vue-chartjs-ui-form
   ```
````

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Run the project locally:

   ```bash
   npm run serve
   ```

## Usage

To include this in your Vue.js project:

1. Install via npm (once hosted on npm):

   ```bash
   npm install vue-chart-js-ui-form
   ```

2. Import the component and use it in your project:

   ```javascript
   import VueChartJsUiForm from "vue-chart-js-ui-form";

   export default {
     components: {
       VueChartJsUiForm,
     },
     // other options
   };
   ```

3. Place the component in your template:

   ```html
   <vue-chart-js-ui-form></vue-chart-js-ui-form>
   ```

## Components

- **ChartJs.vue**: Main parent component that manages the state of `chartData` and `chartOptions`.
- **JsonFormComponent.vue**: Form component for updating chart configurations.
- **JsonTree.vue**: Component to display JSON data.
- **JsonFormParent.vue**: Wrapper component managing child components.

## Contributing

Feel free to open issues or submit pull requests for enhancements and bug fixes.

## License

This project is licensed under the MIT License.

---

This package is maintained by [Hemant Rao](https://github.com/hemant-rao).

```

This README provides a comprehensive overview of your project and how to use it, along with instructions for installation and usage. You can adjust the information as needed!
```
