export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log(slug);

  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
}
