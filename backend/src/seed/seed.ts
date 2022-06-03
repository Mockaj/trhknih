import { dataLoader, dataParser } from "./yaml-parser/parser";
import seedDb from "./dto-to-db/seed-to-db";

const seed = async (path: string) => {
  const data = dataLoader(path);
  if (data.isErr) {
    console.log(
      `Could not load the file because of this error: ${data.error.message}`
    );
    return;
  }

  const dataParsed = dataParser(await data.value);
  if (dataParsed.isErr) {
    console.log(
      `Could not parse the data from the file because of this error: ${dataParsed.error.message}`
    );
    return;
  }

  const seedResult = await seedDb(dataParsed.value);
  if (seedResult.isErr) {
    console.log(
      `Could not seed the database because of this error: ${seedResult.error.message}`
    );
    return;
  }

  console.log(
    `Success! The database has been seeded successfully! Run 'npx prisma studio' to see the results`
  );
};

seed("./data/seed-data.yaml").catch((e) => {
  throw e;
});