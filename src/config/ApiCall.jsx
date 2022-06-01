import { supabase } from "./apiClient";

export const fetchValue = async (flag, search) => {
  let data, error;
  if (flag === "all")
    ({ data, error } = await supabase
      .from("ReactTodo")
      .select()
      .ilike("name", `%${search}%`)
      .order("id", { ascending: false }));
  else if (flag === "incomplete")
    ({ data, error } = await supabase
      .from("ReactTodo")
      .select()
      .ilike("name", `%${search}%`)
      .is("completed_on", null)
      .order("id", { ascending: false }));
  else
    ({ data, error } = await supabase
      .from("ReactTodo")
      .select()
      .ilike("name", `%${search}%`)
      .order("id", { ascending: false })
      .not("completed_on", "is", null));
  return { data, error };
};
export const deleteData = async (id) => {
  const { data, error } = await supabase
    .from("ReactTodo")
    .delete()
    .match({ id: id });
  return { data, error };
};
export const completeTask = async (dateValue, id) => {
  const { data, error } = await supabase
    .from("ReactTodo")
    .update({ completed_on: dateValue })
    .match({ id: id });
  return { data, error };
};

export const updateTask = async (updatedName, id) => {
  const { data, error } = await supabase
    .from("ReactTodo")
    .update({
      name: updatedName,
    })
    .match({ id: id });
  return { data, error };
};
export const addTask = async (updatedName) => {
  const { data, error } = await supabase.from("ReactTodo").insert([
    {
      name: updatedName,
      created_at: new Date(Date.now()),
    },
  ]);
  return { data, error };
};
