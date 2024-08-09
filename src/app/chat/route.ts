const responseData = [
  { message: "Hier kommt die erste Frage?" },
  {
    message:
      "Ich habe deine Daten erkannt und eingetragen. Hier kommt die zweite Frage?",
    updates: {
      a1: "Mustermann",
      a2: "Mustermann",
      a3: "Max",
    },
  },
  {
    message:
      "Ich habe deine Daten erkannt und eingetragen. Hier kommt die dritte Frage?",
    updates: {
      a6: "Roonstr. 18",
      a7: "38102",
    },
  },
];

let counter = 0;

export async function POST(req: Request) {
  const { message } = await req.json();

  await new Promise((resolve) => {
    setTimeout(() => {
      return resolve(1);
    }, 2000);
  });

  const response = responseData[counter];

  counter += 1;

  return new Response(JSON.stringify(response));
}
