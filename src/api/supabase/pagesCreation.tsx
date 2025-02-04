import getStores from "./get/getStoresBasedOnUsername";

export async function getStoreByUsername(username: string) {
  const stores = await getStores();

  return (
    stores.find(
      (store) => store.username.toLowerCase() === username.toLowerCase(),
    ) || null
  );
}
