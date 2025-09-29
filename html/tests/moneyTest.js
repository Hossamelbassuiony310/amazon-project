import { formatCurrency } from "../scripts/utils/money.js";

if (formatCurrency(2025)) {
  console.log("Test passed");
} else {
  console.log("Test failed");
}
