<template>
  <div class="container-fluid">
    <div class="col-12 p-0">
      <div class="row m-0 p-0">
        <div class="col-6 p-0">
          <!-- Color: <input type="color" /> -->
          <h2>Chart Options Form Json Form component</h2>
          <!-- {{ dynamicChartData }} -->
          <form @change="updateChart" class="row g-3">
            <div class="col-12 m-0">
              <label for="chartType" class="form-label mb-0"
                >Select Chart Type:</label
              >
              <select
                id="chartType"
                v-model="selectedChartType"
                class="form-select"
              >
                <option value="bar">Bar</option>
                <option value="stackedBar">Stacked Bar</option>
                <option value="line">Line</option>
                <option value="doughnut">Doughnut</option>
                <option value="pie">Pie</option>
                <option value="polarArea">Polar Area</option>
                <option value="radar">Radar</option>
                <option value="bubble">Bubble</option>
                <option value="scatter">Scatter</option>
              </select>
            </div>
          </form>
          <div class="col-12 mt-1">
            <div class="row p-0 m-0">
              <div class="col-6 p-0 pe-1">
                <JsonFormParent
                  v-if="
                    dynamicChartData.labels.length &&
                    dynamicChartData.datasets.length
                  "
                  :data-title="'Chart Data'"
                  :printJsonData="dynamicChartData"
                  @updateData="updateDataHandler"
                />
              </div>
              <div class="col-6 ps-1 pe-1">
                <JsonFormParent
                  v-if="
                    chartOptions &&
                    chartOptions.plugins &&
                    chartOptions.plugins.legend
                  "
                  :data-title="'Chart Option'"
                  :printJsonData="chartOptions"
                  @updateData="updateOptionHandler"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 p-0 border-start">
          <div class="col-12 p-0" style="height: 300px; max-height: 300px">
            <div
              class="col-12 p-0 h-100"
              style="height: 300px; max-height: 300px"
              v-if="chartToggler"
            >
              <h2 class="p-2">Chart Preview</h2>
              <!-- {{ chartOptions }} -->
              <component
                :is="getChartComponent(selectedChartType)"
                ref="chartRef"
                :key="chartKey"
                :options="chartOptionsClone"
                :data="chartUpdatedDataClone"
                v-if="
                  chartUpdatedDataClone.labels.length &&
                  chartUpdatedDataClone.datasets.length
                "
              />
            </div>
          </div>
          <div class="col-12 mt-5" v-if="chartToggler">
            <div class="row p-0 m-0">
              <div class="col-6 pe-1">
                <PrintJsonParent
                  v-if="
                    dynamicChartData.labels.length &&
                    dynamicChartData.datasets.length
                  "
                  :data-title="'Chart Data'"
                  :printJsonData="dynamicChartData"
                />
              </div>
              <div class="col-6 ps-1 pe-0">
                <PrintJsonParent
                  v-if="
                    chartOptions &&
                    chartOptions.plugins &&
                    chartOptions.plugins.legend
                  "
                  :data-title="'Chart Option'"
                  :printJsonData="chartOptions"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import {
  Bar,
  Line,
  Doughnut,
  Pie,
  PolarArea,
  Radar,
  Bubble,
  Scatter,
} from "vue-chartjs";

import PrintJsonParent from "./PrintJsonParent.vue";
import JsonFormParent from "./JsonFormParent.vue";

// Register all necessary components from Chart.js
Chart.register(...registerables);

export default {
  name: "ChartJs",
  components: {
    Bar,
    Line,
    Doughnut,
    Pie,
    PolarArea,
    Radar,
    Bubble,
    Scatter,
    PrintJsonParent,
    JsonFormParent,
  },
  data() {
    return {
      barColor: "#42a5f5",
      selectedChartType: "bar",
      chartToggler: true,
      chartOptions: {
        indexAxis: "x",
        responsive: true,
        animation: true,
        animations: {
          tension: {
            duration: 3000,
            easing: "easeInOutQuad",
            from: 1,
            to: "0",
            loop: false,
          },
        },
        maintainAspectRatio: false,
        aspectRatio: 1 | 2,
        plugins: {
          customCanvasBackgroundColor: {
            color: "#90ee90",
          },
          legend: {
            display: true,
            position: "top",
            labels: {
              color: "#000000",
              usePointStyle: true,
            },
          },
          tooltip: {
            enabled: true,
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          x: {
            stacked: true,
            title: {
              display: true,
              text: "x-Axis Title",
              color: "#f2311d",
            },
            grid: {
              offset: true,
              display: true,
              color: "#cccccc",
            },
          },
          y: {
            beginAtZero: true,
            stacked: true,
            title: {
              display: true,
              text: "Y-Axis Title",
              color: "#f2711d",
            },
            grid: {
              display: true,
              color: "#cccccc",
            },
          },
        },
      },
      chartOptionsClone: {
        indexAxis: "x",
        responsive: true,
        animation: true,
        animations: {
          tension: {
            duration: 3000,
            easing: "easeInOutQuad",
            from: 1,
            to: "0",
            loop: false,
          },
        },
        maintainAspectRatio: false,
        aspectRatio: 1 | 2,
        plugins: {
          customCanvasBackgroundColor: {
            color: "#90ee90",
          },
          legend: {
            display: true,
            position: "top",
            labels: {
              color: "#000000",
              usePointStyle: true,
            },
          },
          tooltip: {
            enabled: true,
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          x: {
            stacked: true,
            title: {
              display: true,
              text: "x-Axis Title",
              color: "#f2311d",
            },
            grid: {
              offset: true,
              display: true,
              color: "#cccccc",
            },
          },
          y: {
            beginAtZero: true,
            stacked: true,
            title: {
              display: true,
              text: "Y-Axis Title",
              color: "#f2711d",
            },
            grid: {
              display: true,
              color: "#cccccc",
            },
          },
        },
      },
      chartKey: 0, // key for forcing re-render
      // Define Chart Data in the data object to make it dynamic
      dynamicChartData: {
        labels: ["A", "B", "C"],
        datasets: [
          {
            label: "Bar Dataset",
            data: [10, 20, 30],
            backgroundColor: this.barColor,
          },
        ],
      },
      debounceTimeout: null,
      updatingChartData: false,
      chartUpdatedDataClone: {
        labels: ["A", "B", "C"],
        datasets: [
          {
            label: "Bar Dataset",
            data: [10, 20, 30],
            backgroundColor: this.barColor,
          },
        ],
      },
    };
  },
  methods: {
    getChartComponent(chartType) {
      switch (chartType) {
        case "bar":
        case "stackedBar":
          return "Bar";
        case "line":
          return "Line";
        case "doughnut":
          return "Doughnut";
        case "pie":
          return "Pie";
        case "polarArea":
          return "PolarArea";
        case "radar":
          return "Radar";
        case "bubble":
          return "Bubble";
        case "scatter":
          return "Scatter";
        default:
          return "Bar"; // Default to 'Bar' if chartType is unknown
      }
    },
    getChartData(chartType, from, data) {
      switch (chartType) {
        case "bar":
          if (from === "computed") {
            // console.log("dsfaaaaadsfdsfsad");
            return {
              labels: ["A", "B", "C"],
              datasets: [
                {
                  label: "Bar Dataset",
                  data: [10, 20, 30],
                  backgroundColor: this.barColor,
                },
              ],
            };
          } else {
            return {
              labels: data.labels,
              datasets: [
                {
                  label: data.datasets[0].label,
                  data: data.datasets[0].data,
                  backgroundColor:
                    data.datasets[0].backgroundColor || this.barColor,
                },
              ],
            };
          }
        case "stackedBar":
          if (from === "computed") {
            console.log("dsfaaaaadsfdsfsad");
            return {
              labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
              datasets: [
                {
                  label: "Data One",
                  backgroundColor: "#f87979",
                  data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
                },
                {
                  label: "Data Two",
                  backgroundColor: "#087979",
                  data: [30, 25, 15, 25, 12, 15, 30, 40, 35, 15, 10, 5],
                },
              ],
            };
          } else {
            console.log("00000000000000000000", data);
            return { ...data };
          }
        case "line":
          if (from === "computed") {
            console.log("dsfaaaaadsfdsfsad");
            return {
              labels: ["A", "B", "C"],
              datasets: [
                {
                  label: "Line Dataset",
                  data: [10, 30, 20],
                  borderColor: this.barColor,
                  fill: false,
                },
              ],
            };
          } else {
            console.log("00000000000000000000", data);
            return { ...data };
          }
        case "doughnut":
          if (from === "computed") {
            console.log("dsfaaaaadsfdsfsad");
            return {
              labels: ["Red", "Yellow", "Green", "Blue"],
              datasets: [
                {
                  label: "Doughnut Dataset",
                  data: [300, 50, 30, 100],
                  backgroundColor: ["#d31313", "#ffc107", "#198754", "#132bd3"],
                },
              ],
            };
          } else {
            console.log("00000000000000000000", data);
            return { ...data };
          }
        case "pie":
          if (from === "computed") {
            console.log("dsfaaaaadsfdsfsad");
            return {
              labels: ["Red", "Blue", "Yellow"],
              datasets: [
                {
                  label: "Pie Dataset",
                  data: [200, 100, 300],
                  backgroundColor: ["#d31313", "#132bd3", "#ffc107"],
                },
              ],
            };
          } else {
            console.log("00000000000000000000", data);
            return { ...data };
          }
        case "polarArea":
          if (from === "computed") {
            console.log("dsfaaaaadsfdsfsad");
            return {
              labels: ["Red", "Blue", "Yellow"],
              datasets: [
                {
                  label: "Polar Area Dataset",
                  data: [300, 50, 100],
                  backgroundColor: ["#d31313", "#132bd3", "#ffc107"],
                },
              ],
            };
          } else {
            console.log("00000000000000000000", data);
            return { ...data };
          }
        case "radar":
          if (from === "computed") {
            console.log("dsfaaaaadsfdsfsad");
            return {
              labels: ["A", "B", "C", "D", "E"],
              datasets: [
                {
                  label: "Radar Dataset",
                  data: [60, 80, 70, 150, 70],
                  backgroundColor: this.barColor,
                  borderColor: "#36A2EB",
                  fill: true,
                },
                {
                  label: "Radar Dataset2",
                  data: [140, 120, 110, 30, 150],
                  backgroundColor: "#36E2EB",
                  borderColor: "#36D2EB",
                  fill: true,
                },
              ],
            };
          } else {
            console.log("00000000000000000000", data);
            return { ...data };
          }
        case "bubble":
          if (from === "computed") {
            console.log("dsfaaaaadsfdsfsad");
            return {
              labels: ["A", "B", "C"],
              datasets: [
                {
                  label: "Bubble Dataset",
                  data: [
                    { x: 1, y: 1, r: 30 },
                    { x: 2, y: 2, r: 40 },
                    { x: 3, y: 3, r: 50 },
                  ],
                  backgroundColor: this.barColor,
                },
              ],
            };
          } else {
            console.log("00000000000000000000", data);
            return { ...data };
          }
        case "scatter":
          if (from === "computed") {
            console.log("dsfaaaaadsfdsfsad");
            return {
              labels: ["A", "B", "C"],
              datasets: [
                {
                  label: "Scatter Dataset",
                  data: [
                    { x: 1, y: 1 },
                    { x: 2, y: 3 },
                    { x: 3, y: 2 },
                  ],
                  backgroundColor: this.barColor,
                },
              ],
            };
          } else {
            console.log("00000000000000000000", data);
            return { ...data };
          }
        default:
          return {
            labels: [],
            datasets: [],
          };
      }
    },
    updateChart() {
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
      }
      this.debounceTimeout = setTimeout(() => {
        const chartInstance = this.$refs.chartRef?.chartInstance;
        if (chartInstance) {
          this.chartKey += 1;
          chartInstance.data = this.dynamicChartData;
          chartInstance.update();
        }
      }, 300); // Delay the update to prevent rapid triggering
    },
    updateOptionChart() {
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
      }
      this.debounceTimeout = setTimeout(() => {
        const chartInstance = this.$refs.chartRef?.chartInstance;
        if (chartInstance) {
          this.chartKey += 1;
          chartInstance.options = this.chartOptions;
          chartInstance.update();
        }
      }, 300); // Delay the update to prevent rapid triggering
    },
    updateDataHandler(value) {
      clearTimeout(this.debounceTimeout); // Clear the previous timeout
      this.debounceTimeout = setTimeout(() => {
        if (!this.updatingChartData) {
          this.updatingChartData = true;
          // Update the chart data when new data is emitted from the child
          console.log("chartjs-updateDataHandler", value);
          // Update the dynamic chart data
          this.chartUpdatedDataClone = this.getChartData(
            this.selectedChartType,
            "updated",
            value
          );
          console.log("chartUpdatedDataClone", this.chartUpdatedDataClone);
          // Re-render the chart
          this.updatingChartData = false;
        }
      }, 300); // 300ms delay
    },
    updateOptionHandler(value) {
      clearTimeout(this.debounceTimeout); // Clear the previous timeout
      this.debounceTimeout = setTimeout(() => {
        if (!this.updatingChartData) {
          this.updatingChartData = true;
          // Update the chart data when new data is emitted from the child
          console.log("chartjs-updateOptionHandler", value);
          // Update the dynamic chart data
          this.chartOptionsClone = { ...value };
          console.log("updateOptionHandler", this.chartUpdatedDataClone);
          // Re-render the chart
          this.updatingChartData = false;
        }
      }, 300); // 300ms delay
    },
  },
  watch: {
    dynamicChartData: {
      handler(newValue, oldValue) {
        if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
          this.updateChart();
        }
      },
      deep: true,
    },
    chartOptions: {
      handler(newValue, oldValue) {
        if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
          this.updateOptionChart();
        }
      },
      deep: true,
    },
    selectedChartType: {
      handler() {
        // this.updateChart();
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.container {
  padding: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

h2 {
  font-size: 20px;
  margin-bottom: 10px;
}
</style>
