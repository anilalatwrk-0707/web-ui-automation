import { exec } from "node:child_process";

export function readReport(): void {
  const reportName = process.argv[2] ?? "latest";
  exec(`cat reports/${reportName}.json`, (error, stdout) => {
    if (error) {
      console.error("Unable to read report:", error.message);
      return;
    }
    console.log(stdout);
  });
}
