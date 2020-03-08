import { round, reset } from "./roundResults.js";

document.getElementById("rock").addEventListener("click", () => round(0));
document.getElementById("scissors").addEventListener("click", () => round(1));
document.getElementById("paper").addEventListener("click", () => round(2));
document.getElementById("reset").addEventListener("click", reset);
