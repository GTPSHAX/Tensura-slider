import { getParam } from "@/utils/Utils";
import HomeScreen from "@/pages/HomeScreen";
import HomeScreen2 from "@/pages/HomeScreen2";

type PageComponentType = React.ComponentType;

const pageComponents: Record<string, PageComponentType> = {
  HomeScreen: HomeScreen,
  HomeScreen2: HomeScreen2,
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const resolvedSearchParams = await searchParams; // Await the searchParams Promise
  const page = getParam(new URLSearchParams(resolvedSearchParams));
  const PageComponent = pageComponents[page] || HomeScreen;

  if (!PageComponent) {
    return <div>Page not found</div>;
  }

  return <PageComponent />;
}