import { supabase } from "../config/supabase";

export async function getCustomers() {
  return await supabase.from("customers").select("*");
}

export async function addCustomer(customer) {
  return await supabase.from("customers").insert(customer);
}

export async function updateCustomer(id, data) {
  return await supabase.from("customers").update(data).eq("id", id);
}

export async function deleteCustomer(id) {
  return await supabase.from("customers").delete().eq("id", id);
}
