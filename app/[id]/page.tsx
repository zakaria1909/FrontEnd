import { getUserProfile } from "@/app/lib/api";
import Template1 from "@/app/templates/web_template1/page";
import Template2 from "@/app/templates/web_template2/page";

export default async function UserPage({ params }: { params: { id: string } }) {
  const data = await getUserProfile(params.id);

  const template = data.default_template_web;

  switch (template) {
    case "web_template1":
      return <Template1 user={data} />;
    case "web_template2":
      return <Template2 user={data} />;
    default:
      return <Template1 user={data} />;
  }
}