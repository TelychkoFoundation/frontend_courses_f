import Header from "./header";
import List from "./list";
import DrawerWrapper from "../drawerContent/wrapper";

export default async function Page({ searchParams }: { searchParams: any }) {
  const { filter } = await searchParams;

  return (
    <>
      <Header />
      <List filter={filter || ""} />
      <DrawerWrapper />
    </>
  );
}
