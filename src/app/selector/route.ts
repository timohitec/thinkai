import FormData from "@/data/FormData.json";

const responseData = [
  {
    message:
      "Um eine geförderte Wohnung zu beziehen benötigen Sie einen Wohnberechtigungschein (WBS). Zusätzlich dazu können Sie auch noch einen Antrag auf Wohngeld stellen. Was möchten Sie machen?",
    options: [
      { name: "Antrag auf Wohnberechtigungsschein", id: "wbs" },
      { name: "Antrag auf Wohngeld", id: "wg" },
    ],
  },
  {
    message:
      "Alles klar! Sie möchten also einen Wohnberechtigungsschein (WBS) beantragen. Ich werde Sie Schritt für Schritt durch das Formular führen und Ihnen erklären. Möchten Sie diese Angaben jetzt mit mir durchgehen, oder haben Sie dazu noch Fragen?",
    form: FormData,
  },
];

let counter = 0;

export async function POST(req: Request) {
  const { message, selectedForm } = await req.json();

  await new Promise((resolve) => {
    setTimeout(() => {
      return resolve(1);
    }, 2000);
  });

  const response = responseData[counter];

  counter += 1;

  return new Response(JSON.stringify(response));
}
