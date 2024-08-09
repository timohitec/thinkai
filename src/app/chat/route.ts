const responseData = [
  {
    message:
      "Super! Lassen Sie uns das gemeinsam durchgehen.\n\n1. Vorname und Nachname: Bitte geben Sie Ihren vollständigen Vor- und Nachnamen an. Falls Ihr Geburtsname anders ist als Ihr aktueller Nachname dann geben Sie auch bitte diesen an.",
  },
  {
    message:
      "Danke, Julian Müller!\n\nNächster Schritt:\n\nBitte geben Sie Ihr Geburtsdatum an (z.B. 10.10.1991) und ihre Nationalität an (z.B. deutsch).\n\nWie lautet Ihr Geburtsdatum und Ihre Nationalität?",
    updates: {
      a1: "Müller",
      a2: "Müller",
      a3: "Julian",
    },
  },
  {
    message:
      "Geben Sie mir nun die Adresse an der Sie aktuell wohnen. Geben Sie mir dazu die Straße, Hausnummer, Postleitzahl und Stadt zu Ihrer aktuellen Adresse.",
    updates: {
      a4: "deutsch",
      a5: "10.10.1991",
    },
  },
  {
    message:
      "Vielen Dank. Starten wir nun mit den Angaben zu der Wohnung für die Sie einen Wohnberechtigungsschein benötigen. Geben Sie mir dazu die Straße, Hausnummer, Postleitzahl und Stadt zu der Adresse an der diese Wohnung liegt.",
    updates: {
      a6: "Jasperallee 10",
      a7: "38102",
      a8: "Braunschweig",
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
