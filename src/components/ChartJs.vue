<template>
  <div class="container-fluid">
    <div class="col-12 p-0">
      <h2 class="text-center my-1">Vue ChartJs UI Form</h2>
      <div class="row m-0 p-0 mb-3">
        <div class="col-6 p-0">
          <!-- Color: <input type="color" /> -->
          <!-- {{ dynamicChartData }} -->
          <form @change="updateChart" class="row g-3">
            <div
              class="col-12 m-0 d-flex justify-content-start align-items-center"
            >
              <label for="chartType" class="form-label mb-0 me-1"
                >Select Chart Type:
              </label>
              <select
                id="chartType"
                v-model="selectedChartType"
                class="form-select w-25"
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
                <!-- {{ dynamicChartData }} -->
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
                    chartOptionsClone &&
                    chartOptionsClone.plugins &&
                    chartOptionsClone.plugins.legend
                  "
                  :data-title="'Chart Option'"
                  :printJsonData="chartOptionsClone"
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
              <h6 class="p-2"><strong>Chart Preview</strong></h6>
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
                    chartOptionsClone &&
                    chartOptionsClone.plugins &&
                    chartOptionsClone.plugins.legend
                  "
                  :data-title="'Chart Option'"
                  :printJsonData="chartOptionsClone"
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
        barThickness: 22,
        responsive: true,
        animation: true,
        maintainAspectRatio: false,
        aspectRatio: 1 | 2,
        animations: {
          tension: {
            duration: 3000,
            easing: "easeInOutQuad",
            from: 1,
            to: "0",
            loop: false,
          },
        },
        plugins: {
          customCanvasBackgroundColor: {
            color: "#90ee90",
          },
          legend: {
            display: false, // Overridden by the second object
            position: "top",
            labels: {
              color: "#000000",
              usePointStyle: true,
            },
          },
          title: {
            display: true,
            text: "1 Year Trend",
          },
          tooltip: {
            enabled: true,
            mode: "index",
            intersect: false,
            backgroundColor: "#ffffff",
            borderColor: "#dee2e6",
            borderWidth: 1,
            bodyColor: "#000000",
            yAlign: "center",
            xAlign: "right",
            padding: 5,
            bodySpacing: 5,
            displayColors: false,
            callbacks: {},
            titleFont: {
              size: 16,
            },
            bodyFont: {
              size: 16,
            },
            footerFont: {
              size: 16,
            },
          },
          datalabels: {
            anchor: "end",
            offset: -7,
            align: "end",
            color: "#3c0d48",
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
              tickBorderDash: [],
              drawBorder: true,
              lineWidth: 0.5,
              drawTicks: true,
              tickColor: "#707070",
            },
            ticks: {
              color: "#000000",
              font: { size: 16 },
              minor: {
                enabled: true,
                display: "auto",
                color: "#c0c0c0",
                lineWidth: 0.5,
              },
            },
            border: {
              display: true,
              color: "#707070",
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
              offset: true,
              display: true,
              color: "#cccccc",
              tickBorderDash: [],
              drawBorder: true,
              lineWidth: 0.5,
              drawTicks: true,
              tickColor: "#707070",
            },
            border: {
              display: false,
              dash: [4, 4],
            },
            ticks: {
              color: "#000000",
              display: true,
              padding: 8,
              font: { size: 16 },
            },
          },
        },
      },
      chartOptionsClone: {
        indexAxis: "x",
        barThickness: 22,
        responsive: true,
        animation: true,
        maintainAspectRatio: false,
        aspectRatio: 1 | 2,
        animations: {
          tension: {
            duration: 3000,
            easing: "easeInOutQuad",
            from: 1,
            to: "0",
            loop: false,
          },
        },
        plugins: {
          customCanvasBackgroundColor: {
            color: "#90ee90",
          },
          legend: {
            display: false, // Overridden by the second object
            position: "top",
            labels: {
              color: "#000000",
              usePointStyle: true,
            },
          },
          title: {
            display: true,
            text: "1 Year Trend",
          },
          tooltip: {
            enabled: true,
            mode: "index",
            intersect: false,
            backgroundColor: "#ffffff",
            borderColor: "#dee2e6",
            borderWidth: 1,
            bodyColor: "#000000",
            yAlign: "center",
            xAlign: "right",
            padding: 5,
            bodySpacing: 5,
            displayColors: false,
            callbacks: {},
            titleFont: {
              size: 16,
            },
            bodyFont: {
              size: 16,
            },
            footerFont: {
              size: 16,
            },
          },
          datalabels: {
            anchor: "end",
            offset: -7,
            align: "end",
            color: "#3c0d48",
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
              tickBorderDash: [],
              drawBorder: true,
              lineWidth: 0.5,
              drawTicks: true,
              tickColor: "#707070",
            },
            ticks: {
              color: "#000000",
              font: { size: 16 },
              minor: {
                enabled: true,
                display: "auto",
                color: "#c0c0c0",
                lineWidth: 0.5,
              },
            },
            border: {
              display: true,
              color: "#707070",
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
              offset: true,
              display: true,
              color: "#cccccc",
              tickBorderDash: [],
              drawBorder: true,
              lineWidth: 0.5,
              drawTicks: true,
              tickColor: "#707070",
            },
            border: {
              display: false,
              dash: [4, 4],
            },
            ticks: {
              color: "#000000",
              display: true,
              padding: 8,
              font: { size: 16 },
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
            borderColor: "#42a5f5",
            fill: false,
          },
        ],
      },
      debounceTimeout: null,
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
            return {
              labels: ["A", "B", "C"],
              datasets: [
                {
                  label: "Bar Dataset",
                  data: [10, 20, 30],
                  backgroundColor: this.barColor,
                  borderColor: "#42a5f5",
                  fill: false,
                },
              ],
            };
          } else {
            return { ...data };
          }
        case "stackedBar":
          if (from === "computed") {
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
            return { ...data };
          }
        case "line":
          if (from === "computed") {
            return {
              labels: ["A", "B", "C"],
              datasets: [
                {
                  label: "Line Dataset",
                  data: [10, 50, 20],
                  borderColor: this.barColor,
                  fill: false,
                },
              ],
            };
          } else {
            return { ...data };
          }
        case "doughnut":
          if (from === "computed") {
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
            return { ...data };
          }
        case "pie":
          if (from === "computed") {
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
            return { ...data };
          }
        case "polarArea":
          if (from === "computed") {
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
            return { ...data };
          }
        case "radar":
          if (from === "computed") {
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
            return { ...data };
          }
        case "bubble":
          if (from === "computed") {
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
            return { ...data };
          }
        case "scatter":
          if (from === "computed") {
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
      this.chartUpdatedDataClone = {
        labels: [],
        datasets: [],
      };
      this.chartUpdatedDataClone = this.getChartData(
        this.selectedChartType,
        "computed",
        {}
      );
      this.$nextTick(() => {
        this.dynamicChartData.labels = this.chartUpdatedDataClone.labels;
        this.dynamicChartData.datasets = this.chartUpdatedDataClone.datasets;
        if (this.debounceTimeout) {
          clearTimeout(this.debounceTimeout);
        }
        this.debounceTimeout = setTimeout(() => {
          const chartInstance = this.$refs.chartRef?.chartInstance;
          if (chartInstance) {
            this.chartKey += 1;
            chartInstance.data = this.chartUpdatedDataClone;
            chartInstance.update();
          }
        }, 300); // Delay the update to prevent rapid triggering
      });
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
      this.chartUpdatedDataClone = { labels: [], datasets: [] };
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        this.chartKey += 1;
        this.chartUpdatedDataClone = this.getChartData(
          this.selectedChartType,
          "updated",
          value
        );
      }, 300);
    },
    updateOptionHandler(value) {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        this.chartKey += 1;
        if (JSON.stringify(this.chartOptions) !== JSON.stringify(value)) {
          const chartOption = JSON.parse(JSON.stringify(value));
          this.chartOptions = JSON.parse(JSON.stringify(chartOption));
          this.chartOptionsClone = this.chartOptions;
        }
      }, 300);
    },
  },
  watch: {},
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
.form-select {
  border-radius: 0px !important;
  padding: 0.1rem 2.25rem 0.1rem 0.75rem;
}
.form-control:focus,
.form-select:focus,
.form-select:active,
.form-select:focus-visible {
  outline: none;
  border-color: #dee2e6;
  box-shadow: none;
}
</style>
