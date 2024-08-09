import FormData from "@/data/FormData.json";

export async function POST(req: Request) {
  const { message } = await req.json();

  await new Promise((resolve) => {
    setTimeout(() => {
      return resolve(1);
    }, 2000);
  });
  return new Response(
    JSON.stringify({
      message: "Ok, dann helfe ich dir nun dabei das Formular auszufüllen.",
      form: FormData,
    })
  );
}
