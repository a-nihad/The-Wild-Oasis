import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = typeof newCabin.image === "string";
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1. Create / Edit the cabin
  let query = supabase.from("cabins");

  // A. Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B. Edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Cabins could not be Created");
  }

  //2. upload image
  const { error: StorageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3. Delete the cabin IF there was an error upload image.
  if (StorageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(StorageError);
    throw new Error(
      "Cabins image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}
