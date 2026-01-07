import * as fs from 'fs';

interface TestCase {
  panelW: number;
  panelH: number;
  roofW: number;
  roofH: number;
  expected: number;
}

interface TestData {
  testCases: TestCase[];
}

function calculatePanels(
  panelWidth: number,
  panelHeight: number,
  roofWidth: number,
  roofHeight: number
): number {
  // Implementa acá tu solución
  // --- ORIENTACION 1: El panel entra "normal" ---
  const h1 = Math.floor(roofWidth / panelWidth);
  const v1 = Math.floor(roofHeight / panelHeight);
  const main1 = h1 * v1;
  let total1 = main1;

  if (main1 > 0) {
    const unusedW1 = roofWidth - (h1 * panelWidth);
    const unusedH1 = roofHeight - (v1 * panelHeight);
    const extraW1 = Math.floor(unusedW1 / panelHeight) * Math.floor(roofHeight / panelWidth);
    const extraH1 = Math.floor(roofWidth / panelHeight) * Math.floor(unusedH1 / panelWidth);
    total1 += Math.max(extraW1, extraH1);
  }

  // --- ORIENTACIÓN 2: El panel entra "rotado" ---
  const h2 = Math.floor(roofWidth / panelHeight);
  const v2 = Math.floor(roofHeight / panelWidth);
  const main2 = h2 * v2;
  let total2 = main2;

  if (main2 > 0) {
    const unusedW2 = roofWidth - (h2 * panelHeight);
    const unusedH2 = roofHeight - (v2 * panelWidth);
    const extraW2 = Math.floor(unusedW2 / panelWidth) * Math.floor(roofHeight / panelHeight);
    const extraH2 = Math.floor(roofWidth / panelWidth) * Math.floor(unusedH2 / panelHeight);
    total2 += Math.max(extraW2, extraH2);
  }

  return Math.max(total1, total2);
}


function main(): void {
  console.log("🐕 Wuuf wuuf wuuf 🐕");
  console.log("================================\n");
  
  runTests();
}

function runTests(): void {
  const data: TestData = JSON.parse(fs.readFileSync('test_cases.json', 'utf-8'));
  const testCases = data.testCases;
  
  console.log("Corriendo tests:");
  console.log("-------------------");
  
  testCases.forEach((test: TestCase, index: number) => {
    const result = calculatePanels(test.panelW, test.panelH, test.roofW, test.roofH);
    const passed = result === test.expected;
    
    console.log(`Test ${index + 1}:`);
    console.log(`  Panels: ${test.panelW}x${test.panelH}, Roof: ${test.roofW}x${test.roofH}`);
    console.log(`  Expected: ${test.expected}, Got: ${result}`);
    console.log(`  Status: ${passed ? "✅ PASSED" : "❌ FAILED"}\n`);
  });
}

main();
