import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {}

async function rawSql() {
  const usuarios = await fs.promises.readFile(
    path.join(__dirname, '../Usuario.sql'),
    {
      encoding: 'utf-8',
    },
  );
  const casas = await fs.promises.readFile(
    path.join(__dirname, '../Propiedad.sql'),
    {
      encoding: 'utf-8',
    },
  );
  const sqlReducedToStatements = usuarios
    .split('\n')
    .filter((line) => !line.startsWith('--')) // remove comments-only lines
    .join('\n')
    .replace(/\r\n|\n|\r/g, ' ') // remove newlines
    .replace(/\s+/g, ' '); // excess white space
  const sqlStatements = splitStringByNotQuotedSemicolon(sqlReducedToStatements);

  const sqlReducedToStatements2 = casas
    .split('\n')
    .filter((line) => !line.startsWith('--')) // remove comments-only lines
    .join('\n')
    .replace(/\r\n|\n|\r/g, ' ') // remove newlines
    .replace(/\s+/g, ' '); // excess white space
  const sqlStatements2 = splitStringByNotQuotedSemicolon(
    sqlReducedToStatements2,
  );

  let i = 0;
  for (const sql of sqlStatements) {
    i++;
    await prisma.$executeRawUnsafe(sql);
    console.log(`user: ${i}`);
  }
  i = 0;
  for (const sql of sqlStatements2) {
    i++;
    await prisma.$executeRawUnsafe(sql);
    console.log(`propiedad: ${i}`);
  }
}

function splitStringByNotQuotedSemicolon(input: string): string[] {
  const result = [];

  let currentSplitIndex = 0;
  let isInString = false;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "'") {
      // toggle isInString
      isInString = !isInString;
    }
    if (input[i] === ';' && !isInString) {
      result.push(input.substring(currentSplitIndex, i + 1));
      currentSplitIndex = i + 2;
    }
  }

  return result;
}

main()
  .then(rawSql)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
