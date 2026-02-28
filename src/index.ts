import "dotenv/config";
import app from "./app";

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
    const databaseUrl = process.env.DATABASE_URL || "not set";

    const url = new URL(databaseUrl);
    console.log(`Connected to database at '${url.host}'`);
});
