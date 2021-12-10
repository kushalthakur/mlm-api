const execSync = require('child_process').execSync;
const env = Object.create(process.env);

if (process.env.DEV_DB) {
   env.MONGOURL = process.env.DEV_DB
   env.PORT = 1010
   execSync('npm run build && start-server-and-test start http://localhost:1010', { env: env, stdio: 'inherit' });
} else {
   console.log("Set your mongo url in DEV_DB varible to complete test case")
   process.exit(1);
}
