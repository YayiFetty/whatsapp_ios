// Simulates checking for backup (replace with native module on macOS later)
export const CheckBackup = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const simulatedBackup = true; // change to false to test "no backup"
      resolve(simulatedBackup);
    }, 2000); // simulate 2 second delay
  });
};
