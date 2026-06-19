/** Renders one or more schema.org objects as a JSON-LD script tag. */
export default function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(Array.isArray(data) ? data : [data]);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
